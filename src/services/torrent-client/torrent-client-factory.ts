import type { ITorrentClient } from '../../../types/torrent-client'
import { CLIENT_TYPE_KEY, LOGIN_KEY, PASSWORD_KEY, URL_KEY } from '../../settings'
import { QBittorrentWebApiClient } from './qbit/qbittorrent-webapi-client'
import { TransmissionService } from './transmission/transmission'

export class TorrentClientFactory {
    private static client?: ITorrentClient
    private static selectionInFlight = false

    public static isConnected: boolean = false

    public static getClient(): ITorrentClient {
        if (!this.client) {
            const raw: string = Lampa.Storage.field(URL_KEY) || ''
            const urls = raw.split(';').map((u) => u.trim()).filter(Boolean)

            // Always build a client synchronously from the first URL so callers
            // never get `undefined`. If multiple URLs are configured, kick off a
            // one-shot async probe and swap the client to the first responsive
            // URL once it answers.
            this.buildClient(urls[0] || '')

            if (urls.length > 1) {
                this.selectUrl(urls)
            }
        }
        return this.client!
    }

    public static reset(): void {
        this.client = undefined
        this.selectionInFlight = false
    }

    private static buildClient(url: string) {
        const useQbittorrent = Lampa.Storage.field(CLIENT_TYPE_KEY) === 1
        const login = Lampa.Storage.field(LOGIN_KEY)
        const password = Lampa.Storage.field(PASSWORD_KEY)
        this.client = useQbittorrent
            ? new QBittorrentWebApiClient(url, login, password)
            : new TransmissionService(url, login, password)
    }

    private static selectUrl(urls: string[]): void {
        if (this.selectionInFlight) return
        this.selectionInFlight = true

        const attempts = urls.map((url) =>
            fetch(url + '/ping', { cache: 'no-cache' }).then((res) => (res.ok ? url : Promise.reject()))
        )

        let failed = 0
        let done = false

        attempts.forEach((p) =>
            p
                .then((url) => {
                    if (done) return
                    done = true
                    this.selectionInFlight = false
                    // Only rebuild if the chosen URL differs from the current one
                    if (!this.client || this.client.url !== url) {
                        this.buildClient(url)
                    }
                })
                .catch(() => {
                    if (++failed === attempts.length && !done) {
                        done = true
                        this.selectionInFlight = false
                        // Fallback already set in getClient(); nothing to do.
                    }
                })
        )
    }
}
