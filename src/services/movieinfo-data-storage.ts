import manifest from '../manifest.json';

export const MOVIE_INFO_STORAGE_KEY = manifest.component + '.movieinfo.data.v1';

export class MovieInfoDataStorage {
    private static requestedIds: Set<number> = new Set();
    private static data: Record<number, MovieInfo> = Lampa.Storage.get<Record<number, MovieInfo>>(MOVIE_INFO_STORAGE_KEY, {});

    public static getMovieInfo(id: number): MovieInfo | null {
        if (!id) return null;
        // Check cache first
        if (this.data[id]) {
            return this.data[id];
        }

        // Prevent multiple requests for the same ID
        if (this.requestedIds.has(id)) {
            return null;
        }
        this.requestedIds.add(id);

        // If not in cache, start async loading but return null now
        this.loadMovieInfo(id).then((info) => {
            if (info) {
                this.data[id] = info;
                Lampa.Storage.set(MOVIE_INFO_STORAGE_KEY, this.data);
            }
        });
        this.loadTvInfo(id).then((info) => {
            if (info) {
                this.data[id] = info;
                Lampa.Storage.set(MOVIE_INFO_STORAGE_KEY, this.data);
            }
        });
        return null;
    }

    private static async loadMovieInfo(id: number): Promise<MovieInfo | null> {
        const url = Lampa.TMDB.api('movie/' + id) + `?api_key=${Lampa.TMDB.key()}&language=ru&certification_country=RU&certification.lte=18`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data?.title || data?.name) {
                return data;
            }
        }
        return null;
    }

    private static async loadTvInfo(id: number): Promise<MovieInfo | null> {
        const url = Lampa.TMDB.api('tv/' + id) + `?api_key=${Lampa.TMDB.key()}&language=ru&certification_country=RU&certification.lte=18`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();       
            if (data?.title || data?.name) {
                return data;
            }
        }
        return null;
    }

    public static setMovieInfo(id: number, info: MovieInfo): void {
        this.data[id] = info;
        Lampa.Storage.set(MOVIE_INFO_STORAGE_KEY, this.data);
    }
}
