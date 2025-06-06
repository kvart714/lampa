import { log } from '../log'
import { TorrentClientFactory } from './torrent-client/torrent-client-factory'
import { updateDownloadCard } from '../components/download-card/download-card'
import { updateDownloadCircle } from '../components/download-circle/download-circle'
import { updateDownloadsTab } from '../components/downloads-tab/downloads-tab'
import { TorrentsDataStorage } from './torrents-data-storage'

export class BackgroundWorker {
    private static subscription: number
    private static errorCount = 0
    private static notified = false

    static start(intervalInSeconds: number) {
        if (BackgroundWorker.subscription) {
            clearInterval(BackgroundWorker.subscription)
        }

        BackgroundWorker.errorCount = 0
        BackgroundWorker.notified = false
        BackgroundWorker.subscription = setInterval(BackgroundWorker.tick, intervalInSeconds * 1000)
    }

    private static async tick(): Promise<void> {
        try {
            const torrents = await TorrentClientFactory.getClient().getTorrents()

            TorrentsDataStorage.setMovies(torrents)

            if ($('.d-updatable').length) {
                for (const torrent of torrents) {
                    updateDownloadCard(torrent)
                    updateDownloadCircle(torrent)
                    updateDownloadsTab(torrent)
                }
            }

            BackgroundWorker.notifyFirstTime(Lampa.Lang.translate('background-worker.connection-success'))
        } catch (error: any) {
            log('Error:', error)

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
