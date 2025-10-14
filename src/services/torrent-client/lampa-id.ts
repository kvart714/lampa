
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

    if (movie.seasons) {
        tags.push('tv')
    }

    return tags;
}
