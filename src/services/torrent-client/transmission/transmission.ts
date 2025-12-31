import type { ITorrentClient } from '../../../../types/torrent-client'
import { buildTags, extractId, extractType } from '../lampa-id'
import { mapTransmissionStatus } from '../statuses'
import { TransmissionRpcClient } from './transmission-rpc-client'
import { log } from '../../../log'

export class TransmissionService implements ITorrentClient {
    private client: TransmissionRpcClient

    constructor(public url: string, public login: string, public password: string) {
        this.client = new TransmissionRpcClient(url + '/transmission/rpc', login, password)
    }

    public async getTorrents(): Promise<TorrentInfo[]> {
        const response = await this.client.getTorrents({
            fields: [
                'id',
                'name',
                'status',
                'percentDone',
                'sizeWhenDone',
                'rateDownload',
                'eta',
                'labels',
                'files',
                'peersConnected', // всего сидов/пиров
                'peersSendingToUs', // активные сиды (отдают нам)
                'trackerStats', // для получения точного количества сидов с трекеров
                'hashString', // хеш торрента
            ],
        })
        return (
            response.arguments?.torrents
                .filter((torrent) => !Array.isArray(torrent.labels) || torrent.labels.indexOf('hide') === -1)
                .map((torrent) => {
                    // Получаем максимальное количество сидов с трекеров
                    let seederCount = 0
                    let activeSeederCount = 0
                    if (Array.isArray(torrent.trackerStats)) {
                        seederCount = Math.max(...torrent.trackerStats.map((tr: any) => tr.seederCount || 0), 0)
                    }
                    // peersConnected — это все подключённые пиры (не только сиды), peersSendingToUs — активные сиды
                    activeSeederCount = torrent.peersSendingToUs || 0
                    return {
                        id: extractId(torrent.labels),
                        type: extractType(torrent.labels),
                        externalId: torrent.id,
                        name: torrent.name,
                        status: mapTransmissionStatus(torrent.status),
                        percentDone: torrent.percentDone,
                        totalSize: torrent.sizeWhenDone,
                        eta: torrent.eta,
                        speed: torrent.rateDownload,
                        files: torrent.files,
                        seeders: seederCount,
                        activeSeeders: activeSeederCount,
                        hash: torrent.hashString, //хеш торрента
                    }
                })
                .filter((torrent) => torrent.id) || []
        )
    }

    public async addTorrent(movie: MovieInfo, selectedTorrent: LampaTorrent): Promise<void> {
        const response = await this.client.addTorrent({
            paused: false,
            sequential_download: true,
            filename: selectedTorrent.MagnetUri || selectedTorrent.Link,
            labels: buildTags(movie),
        })
        if (response.arguments?.['torrent-added']) {
            // the labels field in the torrent-add command is only available starting with version 4.0.0.
            // for version 3.0.0 and below we have to set the labels manually with an additional request
            await this.client.setTorrent({
                ids: [response.arguments['torrent-added'].id],
                labels: buildTags(movie),
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
        const response = await this.client.getTorrents({
            ids: [torrent.externalId],
            fields: ['labels'],
        })
        
        const currentLabels = response.arguments?.torrents[0]?.labels || []
        
        await this.client.setTorrent({
            ids: [torrent.externalId],
            labels: [...currentLabels, 'hide'],
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

    public async getData(): Promise<TorrentsData> {
        return {
            torrents: await this.getTorrents(),
            info: {
                freeSpace: 0, // TODO: Implement free space retrieval
            }
        }
    }
}
