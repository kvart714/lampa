import { log } from '../log'
import { TransmissionService } from './transmission'
import { TorrentsDataStorage } from './torrents-data-storage'
import { updateDownloadCard } from '../components/download-card/download-card'
import { updateDownloadCircle } from '../components/download-circle/download-circle'

// TODO: add error handling
export class BackgroundWorker {
    private static subscription: number
    
    static start(intervalInSeconds: number) {
        if (BackgroundWorker.subscription) {
            clearInterval(BackgroundWorker.subscription)
        }

        BackgroundWorker.subscription = setInterval(BackgroundWorker.tick, intervalInSeconds * 1000)
    }

    private static async tick(): Promise<void> {
        const torrents = await TransmissionService.getTorrents()

        TorrentsDataStorage.setMovies(torrents)

        if ($('.d-updatable').length) {
            for (const torrent of torrents) {
                updateDownloadCard(torrent)
                updateDownloadCircle(torrent)
            }
        }
    }
}
