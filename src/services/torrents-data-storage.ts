import manifest from '../manifest.json';

export const STORAGE_KEY = manifest.component + '.torrents.data.v2'

export class TorrentsDataStorage {
    private static data = Lampa.Storage.get<TorrentsData>(STORAGE_KEY, { torrents: [], info: { freeSpace: 0 } });

    public static getData(): TorrentsData {
        return this.data;
    }

    public static getMovie(id: number) {
        const filtered = this.data.torrents.filter((item) => item.id === id);
        return filtered.length > 0
            ? filtered.reduce((prev, current) => prev.percentDone < current.percentDone ? prev : current
            )
            : null;
    }

    public static ensureMovie(movie: TorrentInfo) {
        const filtered = this.data.torrents.filter((item) => item.externalId === movie.externalId);
        return filtered.length > 0
            ? filtered.reduce((prev, current) => prev.percentDone < current.percentDone ? prev : current
            )
            : movie;
    }

    public static async setData(torrents: TorrentsData): Promise<void> {
        this.data = torrents;

        Lampa.Storage.set(STORAGE_KEY, this.data);
    }
}
