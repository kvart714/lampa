import { log, warn } from '../log'
import manifest from '../manifest.json'

export const MOVIE_INFO_STORAGE_KEY = manifest.component + '.movieinfo.data.v4'

export class MovieInfoDataStorage {
    private static requestedIds: Set<string> = new Set()
    private static diskCache: Record<string, MovieInfo> = Lampa.Storage.get<Record<string, MovieInfo>>(MOVIE_INFO_STORAGE_KEY, {})
    private static memoryCache: Record<string, MovieInfo> = {}

    public static getMovieInfo(torrent: TorrentInfo): MovieInfo | null {
        if (!torrent.id) return null
        
        const key = `${torrent.type}_${torrent.id}`

        // Check cache first
        if (this.memoryCache[key]) {
            return this.memoryCache[key]
        }

        // Prevent multiple requests for the same ID
        if (!this.requestedIds.has(key)) {
            this.requestedIds.add(key)
            
            this.loadContentInfo(torrent.id, torrent.type).then((info) => {
                if (info) {
                    this.memoryCache[key] = info
                    this.diskCache[key] = info
                    Lampa.Storage.set(MOVIE_INFO_STORAGE_KEY, this.diskCache)
                    return
                }
            })
        }

        return this.diskCache[key] || null
    }

    private static async loadContentInfo(id: number, contentType: MovieType, fallback = true): Promise<MovieInfo | null> {
        const lang = Lampa.Storage.field('tmdb_lang') || Lampa.Storage.field('language') || 'ru'
        const url = Lampa.Utils.addUrlComponent(
            Lampa.TMDB.api(`${contentType}/${id}?email=`), //Fix by lexandr0s. Add an empty email to the URL to prevent TMDB API rejection.
            `api_key=${Lampa.TMDB.key()}&language=${lang}&certification_country=ru&certification.lte=18`
        )

        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                if (data?.title || data?.name) {
                    return data
                }
            }
            else {
                if (fallback) {
                    // fallback if type is wrong
                    log(`Failed to load '${contentType}_${id}', status: ${response.status}. Trying fallback type.`)
                    const fallbackType = contentType === 'movie' ? 'tv' : 'movie'
                    return await this.loadContentInfo(id, fallbackType, false)
                }
            }
        } catch (error) {
            warn(`Failed to load ${contentType} info for id ${id}:`, error)
        }

        return null
    }
}
