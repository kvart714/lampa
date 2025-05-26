import { TransmissionRpcClient } from './transmission-rpc-client'
import type { ITorrentClient } from '../../../../types/torrent-client'
import { mapTransmissionStatus } from '../statuses'
import { buildId, extractId } from '../lampa-id'

export class TransmissionService implements ITorrentClient {
    private client: TransmissionRpcClient

    constructor(url: string, login: string, password: string) {
        this.client = new TransmissionRpcClient(url + '/transmission/rpc', login, password)
    }

    public async getTorrents(): Promise<TorrentInfo[]> {
        const response = await this.client.getTorrents({
            fields: [
                'id',
                'name',
                'status',
                'percentDone',
                // 'totalSize',
                'sizeWhenDone',
                'rateDownload',
                'eta',
                'labels',
                'files',
            ],
        })
        return (
            response.arguments?.torrents
                .filter((torrent) => !Array.isArray(torrent.labels) || torrent.labels.indexOf('hide') === -1)
                .map((torrent) => ({
                    id: extractId(torrent.labels),
                    externalId: torrent.id,
                    name: torrent.name,
                    status: mapTransmissionStatus(torrent.status),
                    percentDone: torrent.percentDone,
                    totalSize: torrent.sizeWhenDone,
                    eta: torrent.eta,
                    speed: torrent.rateDownload,
                    files: torrent.files,
                }))
                .filter((torrent) => torrent.id) || []
        )
    }

    public async addTorrent(movie: MovieInfo, selectedTorrent: LampaTorrent): Promise<void> {
        const response = await this.client.addTorrent({
            paused: false,
            sequential_download: true,
            filename: selectedTorrent.MagnetUri || selectedTorrent.Link,
            labels: [buildId(movie.id)],
        })
        if (response.arguments?.['torrent-added']) {
            // the labels field in the torrent-add command is only available starting with version 4.0.0.
            // for version 3.0.0 and below we have to set the labels manually with an additional request
            await this.client.setTorrent({
                ids: [response.arguments['torrent-added'].id],
                labels: [buildId(movie.id)],
            })
        }
    }

    public async startTorrent(torrent: TorrentInfo): Promise<void> {
        await this.client.startTorrent({ ids: [torrent.externalId] })
    }

    public async stopTorrent(torrent: TorrentInfo): Promise<void> {
        await this.client.stopTorrent({ ids: [torrent.externalId] })
    }

    public async hideTorrent(torrent: TorrentInfo): Promise<void> {
        await this.client.setTorrent({
            ids: [torrent.externalId],
            labels: [buildId(torrent.id), 'hide'],
        })
    }

    public async removeTorrent(torrent: TorrentInfo, deleteFiles = false): Promise<void> {
        await this.client.removeTorrent({
            ids: [torrent.externalId],
            'delete-local-data': deleteFiles,
        })
    }

    public async getFiles(torrent: TorrentInfo): Promise<FileInfo[]> {
        return torrent.files
    }
}
