import manifest from '../manifest.json';

export const STORAGE_KEY = manifest.component + '.downloads.data'

export class MovieDataStorage {
    private static movies = Lampa.Storage.get<MovieInfo[]>(STORAGE_KEY, [])
    private static current?: MovieInfo

    public static getMovies() {
        return this.movies
    }

    public static selectMovie(movie: MovieInfo): void {
        this.current = movie
    }

    public static async addSelectedMovie(): Promise<void> {
        if (this.current) {
            this.movies
                .filter((movie) => movie.id !== this.current!.id)
                .unshift(this.current)
        }
        this.current = undefined

        Lampa.Storage.set(STORAGE_KEY, MovieDataStorage.movies)
    }
}
