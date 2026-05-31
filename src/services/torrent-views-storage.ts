import manifest from '../manifest.json'

const STORAGE_KEY = manifest.component + '.torrents.data.views.'

type ViewsRecord = { last?: string } & { [fileName: string]: boolean | string | undefined }

export class TorrentViewsStorage {
    public static getViews(torrent: TorrentInfo): ViewsRecord {
        const raw = Lampa.Storage.get(STORAGE_KEY + torrent.externalId) as ViewsRecord | null | undefined
        return raw && typeof raw === 'object' ? raw : {}
    }

    public static rememberView(torrent: TorrentInfo, name: string) {
        const data = TorrentViewsStorage.getViews(torrent)
        data.last = name
        data[name] = true

        Lampa.Storage.set(STORAGE_KEY + torrent.externalId, data)
    }
}
