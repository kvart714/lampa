
const ID_KEY = 'lampa:';

export function extractId(labels: string[]): number {
    const id =
        labels.find((label) => label.startsWith(ID_KEY))?.split(':')[1] || '';
    return parseInt(id);
}

export function buildId(id: number): string {
    return ID_KEY + id;
}