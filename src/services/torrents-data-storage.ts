import manifest from '../manifest.json';

export const STORAGE_KEY = manifest.component + '.torrents.data'

export class TorrentsDataStorage {
    private static torrents = Lampa.Storage.get<TorrentInfo[]>(STORAGE_KEY, []);

    public static getMovies() {
        return this.torrents;
    }

    public static getMovie(id: number) {
        const filtered = this.torrents.filter((item) => item.id === id);
        return filtered.length > 0
            ? filtered.reduce((prev, current) => prev.percentDone < current.percentDone ? prev : current
            )
            : null;
    }

    public static async setMovies(torrents: TorrentInfo[]): Promise<void> {
        this.torrents = torrents;

        Lampa.Storage.set(STORAGE_KEY, this.torrents);
    }
}
