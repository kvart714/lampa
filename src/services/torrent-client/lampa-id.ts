import { JELLYFIN_INCLUDE_TMDB_ID_KEY, JELLYFIN_INCLUDE_YEAR_KEY, JELLYFIN_SEPARATE_MOVIES_TV_KEY } from '../../settings';

const ID_KEY = 'lampa:';

function toTagsArray(tags: string[] | string | null | undefined): string[] {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') return tags.split(',').map(t => t.trim()).filter(Boolean);
    return [];
}

export function extractId(tags: string[] | string | null | undefined): number {
    const tagsArray = toTagsArray(tags);
    const raw = tagsArray.find((tag) => tag.startsWith(ID_KEY))?.split(':')[1];
    if (!raw) return 0;
    const id = parseInt(raw, 10);
    return Number.isFinite(id) && id > 0 ? id : 0;
}

export function extractType(tags: string[] | string | null | undefined): MovieType {
    const tagsArray = toTagsArray(tags);
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