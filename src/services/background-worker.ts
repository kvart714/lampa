import { log } from '../log'
import { TransmissionService } from './transmission'
import { TorrentsDataStorage } from './torrents-data-storage'
import { updateDownloadCard } from '../components/download-card/download-card'
import { updateDownloadCircle } from '../components/download-circle/download-circle'

export class BackgroundWorker {
    private static subscription: number
    private static errorCount = 0

    static start(intervalInSeconds: number) {
        if (BackgroundWorker.subscription) {
            clearInterval(BackgroundWorker.subscription)
        }

        BackgroundWorker.subscription = setInterval(
            BackgroundWorker.tick,
            intervalInSeconds * 1000
        )
    }

    private static async tick(): Promise<void> {
        try {
            const torrents = await TransmissionService.getTorrents()

            TorrentsDataStorage.setMovies(torrents)

            if ($('.d-updatable').length) {
                for (const torrent of torrents) {
                    updateDownloadCard(torrent)
                    updateDownloadCircle(torrent)
                }
            }
        } catch (error: any) {
            log('Error:', error)
            BackgroundWorker.errorCount++
            if (BackgroundWorker.errorCount > 10) {
                clearInterval(BackgroundWorker.subscription)
                log('Stopping background worker due to too many errors')
                BackgroundWorker.errorCount = 0
            }
        }
    }
}
