import { warn } from '../log'
import manifest from '../manifest.json'

export const MOVIE_INFO_STORAGE_KEY = manifest.component + '.movieinfo.data.v2'

export class MovieInfoDataStorage {
    private static requestedIds: Set<number> = new Set()
    private static data: Record<number, MovieInfo> = Lampa.Storage.get<Record<number, MovieInfo>>(MOVIE_INFO_STORAGE_KEY, {})

    public static getMovieInfo(torrent?: TorrentInfo): MovieInfo | null {
        const id = torrent?.id
        const type = torrent?.type
        if (!id) return null

        // Check cache first
        if (this.data[id]) {
            return this.data[id]
        }

        // Prevent multiple requests for the same ID
        if (this.requestedIds.has(id)) {
            return null
        }
        this.requestedIds.add(id)

        // Universal async loader: try by type, then fallback
        this.loadByTypeWithFallback(id, type)
        return null
    }

    private static async loadByTypeWithFallback(id: number, type?: MovieType): Promise<void> {
        let typesToTry: MovieType[] = ['movie', 'tv']

        for (const contentType of typesToTry.sort((a) => a === type ? -1 : 0)) {
            const info = await this.loadContentInfo(id, contentType)
            if (info) {
                this.data[id] = info
                Lampa.Storage.set(MOVIE_INFO_STORAGE_KEY, this.data)
                return
            }
        }
    }

    private static async loadContentInfo(id: number, contentType: MovieType): Promise<MovieInfo | null> {
        const url = Lampa.TMDB.api(`${contentType}/${id}`) + `?api_key=${Lampa.TMDB.key()}&language=ru&certification_country=RU&certification.lte=18`

        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                if (data?.title || data?.name) {
                    return data
                }
            }
        } catch (error) {
            warn(`Failed to load ${contentType} info for id ${id}:`, error)
        }

        return null
    }

    public static setMovieInfo(id: number, info: MovieInfo): void {
        this.data[id] = info
        Lampa.Storage.set(MOVIE_INFO_STORAGE_KEY, this.data)
    }
}
