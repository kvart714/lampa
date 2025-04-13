import manifest from '../manifest.json';

export const STORAGE_KEY = manifest.component + '.downloads.data'

export class DownloadsDataStorage {
    private static movies = Lampa.Storage.get<MovieInfo[]>(STORAGE_KEY, [])

    public static getMovies() {
        return this.movies
    }

    public static addMovie(movie: MovieInfo): void {
        this.movies = this.movies.filter((m) => m.id !== movie.id)
        this.movies.unshift(movie)

        Lampa.Storage.set(STORAGE_KEY, DownloadsDataStorage.movies)
    }
}
