import { updateDownloadCard } from '../components/download-card/download-card'
import { updateDownloadCircle } from '../components/download-circle/download-circle'
import { updateDownloadsTab } from '../components/downloads-tab/downloads-tab'
import { log } from '../log'
import { INTERVAL_KEY, INTERVALS } from '../settings'
import { TorrentClientFactory } from './torrent-client/torrent-client-factory'
import { TorrentsDataStorage } from './torrents-data-storage'

const MAX_CONSECUTIVE_ERRORS = 10

export class BackgroundWorker {
    private static subscription: number
    private static consecutiveErrors = 0
    private static wasConnected: boolean | null = null

    static start() {
        const idx = Lampa.Storage.field(INTERVAL_KEY)
        const intervalInSeconds = INTERVALS[idx as number] ?? INTERVALS[0]

        if (BackgroundWorker.subscription) {
            clearInterval(BackgroundWorker.subscription)
        }

        BackgroundWorker.consecutiveErrors = 0
        BackgroundWorker.wasConnected = null
        BackgroundWorker.subscription = setInterval(BackgroundWorker.tick, intervalInSeconds * 1000)
    }

    private static async tick(): Promise<void> {
        try {
            const data = await TorrentClientFactory.getClient().getData()

            TorrentsDataStorage.setData(data)

            if ($('.d-updatable').length) {
                for (const torrent of data.torrents) {
                    updateDownloadCard(torrent)
                    updateDownloadCircle(torrent)
                    updateDownloadsTab(torrent)
                }
            }

            const url = TorrentClientFactory.getClient().url

            BackgroundWorker.consecutiveErrors = 0
            TorrentClientFactory.isConnected = true

            if (BackgroundWorker.wasConnected !== true) {
                log('Connected to ' + url)
                Lampa.Noty.show(Lampa.Lang.translate('background-worker.connection-success') + ': ' + url)
                BackgroundWorker.wasConnected = true
            }
        } catch (error: any) {
            log('Error:', error)

            TorrentClientFactory.isConnected = false
            BackgroundWorker.consecutiveErrors++

            if (BackgroundWorker.wasConnected !== false) {
                Lampa.Noty.show(Lampa.Lang.translate('background-worker.error-detected'))
                BackgroundWorker.wasConnected = false
            }

            if (BackgroundWorker.consecutiveErrors > MAX_CONSECUTIVE_ERRORS) {
                clearInterval(BackgroundWorker.subscription)
                log('Stopping background worker due to too many consecutive errors')
            }
        }
    }
}
