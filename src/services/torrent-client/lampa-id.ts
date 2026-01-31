import { JELLYFIN_INCLUDE_TMDB_ID_KEY, JELLYFIN_INCLUDE_YEAR_KEY, JELLYFIN_SEPARATE_MOVIES_TV_KEY } from '../../settings';

const ID_KEY = 'lampa:';

export function extractId(tags: string[] | string): number {
    const tagsArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
    const id =
        tagsArray.find((tag) => tag.startsWith(ID_KEY))?.split(':')[1] || '';
    return parseInt(id);
}

export function extractType(tags: string[] | string): MovieType {
    const tagsArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()) : tags;
    return tagsArray.indexOf('tv') !== -1 ? 'tv' : 'movie';
}

export function buildTags(movie: MovieInfo): string[] {
    const tags = [ID_KEY + movie.id]

    if (isTV(movie)) {
        tags.push('tv')
    }

    return tags;
}

export function buildPath(
    movie: MovieInfo,
): string {
    const name = (movie.title || movie.name).trim()

    const year =
        movie.release_year ||
        (movie.release_date ? movie.release_date.slice(0, 4) : '') ||
        (movie.first_air_date ? movie.first_air_date.slice(0, 4) : '')

    let path = ''

    if (Lampa.Storage.field(JELLYFIN_SEPARATE_MOVIES_TV_KEY)) {
        path += `/${isTV(movie) ? 'tv' : 'movie'}`
    }

    path += `/${name}`

    if (Lampa.Storage.field(JELLYFIN_INCLUDE_YEAR_KEY) && year) {
        path += ` (${year})`
    }

    if (Lampa.Storage.field(JELLYFIN_INCLUDE_TMDB_ID_KEY)) {
        path += ` [tmdbid-${movie.id}]`
    }

    return path
}

export function isTV(movie: MovieInfo): boolean {
    return Array.isArray(movie.seasons) || movie.season !== undefined || movie.episode_number !== undefined;
}