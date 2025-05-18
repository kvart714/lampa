import type { ITorrentClient } from '../../../types/torrent-client';
import { CLIENT_TYPE_KEY, URL_KEY, LOGIN_KEY, PASSWORD_KEY } from '../../settings';
import { QBittorrentWebApiClient } from './qbit/qbittorrent-webapi-client';
import { TransmissionService } from './transmission/transmission';

export class TorrentClientFactory {
    private static client?: ITorrentClient;

    public static getClient(): ITorrentClient {
        if (!this.client) {
            const useQbittorrent = Lampa.Storage.field(CLIENT_TYPE_KEY) === 1;
            const url = Lampa.Storage.field(URL_KEY);
            const login = Lampa.Storage.field(LOGIN_KEY);
            const password = Lampa.Storage.field(PASSWORD_KEY);
            this.client = useQbittorrent
                ? new QBittorrentWebApiClient(url, login, password)
                : new TransmissionService(url, login, password);
        }
        return this.client;
    }

    public static reset(): void {
        this.client = undefined;
    }
}
