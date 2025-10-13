import { updateDownloadCard } from '../components/download-card/download-card'
import { updateDownloadCircle } from '../components/download-circle/download-circle'
import { updateDownloadsTab } from '../components/downloads-tab/downloads-tab'
import { log } from '../log'
import { INTERVAL_KEY, INTERVALS } from '../settings'
import { TorrentClientFactory } from './torrent-client/torrent-client-factory'
import { TorrentsDataStorage } from './torrents-data-storage'

export class BackgroundWorker {
    private static subscription: number
    private static errorCount = 0
    private static notified = false

    static start() {
        const intervalInSeconds = INTERVALS[Lampa.Storage.field(INTERVAL_KEY)]
        if (BackgroundWorker.subscription) {
            clearInterval(BackgroundWorker.subscription)
        }

        BackgroundWorker.errorCount = 0
        BackgroundWorker.notified = false
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

            if (!TorrentClientFactory.isConnected) {
                log('Connected to ' + url)
            }

            TorrentClientFactory.isConnected = true

            BackgroundWorker.notifyFirstTime(Lampa.Lang.translate('background-worker.connection-success') + ': ' + url)
        } catch (error: any) {
            log('Error:', error)

            TorrentClientFactory.isConnected = false

            BackgroundWorker.errorCount++
            if (BackgroundWorker.errorCount > 10) {
                clearInterval(BackgroundWorker.subscription)
                log('Stopping background worker due to too many errors')
                
                BackgroundWorker.notifyFirstTime(Lampa.Lang.translate('background-worker.error-detected'))
            }
        }
    }

    private static notifyFirstTime(msg: string) {
        if (!BackgroundWorker.notified) {
            Lampa.Noty.show(msg)
            BackgroundWorker.notified = true
        }
    }
}
