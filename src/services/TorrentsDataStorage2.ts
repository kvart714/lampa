import manifest from '../manifest.json'

const STORAGE_KEY = manifest.component + '.torrents.data.views.'

export class TorrentViewsStorage {
    public static getViews(torrent: TorrentInfo) {
        return Lampa.Storage.get(STORAGE_KEY + torrent.externalId) as any
    }

    public static rememberView(torrent: TorrentInfo, name: string) {
        let data = TorrentViewsStorage.getViews(torrent) || {} as any
        data.last = name
        data[name] = true

        Lampa.Storage.set(STORAGE_KEY + torrent.externalId, data)
    }
}
