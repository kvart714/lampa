import manifest from '../manifest.json';

export const STORAGE_KEY = manifest.component + '.torrents.data'

export class TorrentsDataStorage {
    private static movies = Lampa.Storage.get<TorrentInfo[]>(STORAGE_KEY, []);

    public static getMovies() {
        return this.movies;
    }

    public static getMovie(id: number) {
        const filtered = this.movies.filter((item) => item.id === id);
        return filtered.length > 0
            ? filtered.reduce((prev, current) => prev.percentDone < current.percentDone ? prev : current
            )
            : null;
    }

    public static async setMovies(movies: TorrentInfo[]): Promise<void> {
        this.movies = movies;

        Lampa.Storage.set(STORAGE_KEY, this.movies);
    }
}
