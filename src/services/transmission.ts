import { LOGIN_KEY, PASSWORD_KEY, URL_KEY } from '../settings'
import { TransmissionRpcClient } from './transmission-rpc-client'

const ID_KEY = 'lampa:'

function extractId(labels: string[]): number {
    const id =
        labels.find((label) => label.startsWith(ID_KEY))?.split(':')[1] || ''
    return parseInt(id)
}

export class TransmissionService {
    private static client?: TransmissionRpcClient

    public static resetClient(): void {
        TransmissionService.client = undefined
    }

    private static getClient(): TransmissionRpcClient {
        return (
            TransmissionService.client ||
            (TransmissionService.client = new TransmissionRpcClient(
                Lampa.Storage.field(URL_KEY) + '/transmission/rpc',
                Lampa.Storage.field(LOGIN_KEY),
                Lampa.Storage.field(PASSWORD_KEY)
            ))
        )
    }

    public static async getTorrents(): Promise<TorrentInfo[]> {
        const response = await TransmissionService.getClient().getTorrents({
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
                .map((torrent) => ({
                    id: extractId(torrent.labels),
                    externalId: torrent.id,
                    name: torrent.name,
                    status: torrent.status,
                    percentDone: torrent.percentDone,
                    totalSize: torrent.sizeWhenDone,
                    eta: torrent.eta,
                    speed: torrent.rateDownload,
                    files: torrent.files,
                }))
                .filter((torrent) => torrent.id) || []
        )
    }

    public static async AddTorrent(
        selectedTorrent: LampaTorrent
    ): Promise<void> {
        const tmdbId = new URLSearchParams(window.location.search).get('card')

        const response = await TransmissionService.getClient().addTorrent({
            paused: false,
            sequential_download: true,
            filename: selectedTorrent.MagnetUri || selectedTorrent.Link,
            labels: [ID_KEY + tmdbId],
        })

        if (response.arguments?.['torrent-added']) {
            // the labels field in the torrent-add command is only available starting with version 4.0.0.
            // for version 3.0.0 and below we have to set the labels manually with an additional request
            await TransmissionService.getClient().setTorrent({
                ids: [response.arguments['torrent-added'].id],
                labels: [ID_KEY + tmdbId],
            })

            Lampa.Noty.show(Lampa.Lang.translate('actionSentSuccessfully'))

            return
        }
    }

    public static async stopTorrent(torrent: TorrentInfo): Promise<void> {
        await TransmissionService.getClient().stopTorrent({
            ids: [torrent.externalId],
        })
    }

    public static async startTorrent(torrent: TorrentInfo): Promise<void> {
        await TransmissionService.getClient().startTorrent({
            ids: [torrent.externalId],
        })
    }

    public static async removeTorrent(torrent: TorrentInfo): Promise<void> {
        await TransmissionService.getClient().removeTorrent({
            ids: [torrent.externalId],
            "delete-local-data": false
        })
    }

    public static async fullRemoveTorrent(torrent: TorrentInfo): Promise<void> {
        await TransmissionService.getClient().removeTorrent({
            ids: [torrent.externalId],
            "delete-local-data": true
        })
    }
}
