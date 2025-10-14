type MovieInfo = {
    original_name?: string;
    first_air_date?: string;
    release_date?: string;
    release_year?: string;
    birthday?: string;
    poster?: string;
    cover?: string;
    promo_title?: string;
    promo?: string;
    cub_hundred_rating?: number;
    vote_average?: number;
    quality?: string;
    release_quality?: string;
    imdb_id?: string;
    poster_path?: string;
    profile_path?: string;
    backdrop_path?: string;
    size?: string;
    title?: string;
    original_title?: string;
    seeder?: number;
    peers?: number;
    season?: number;
    seasons?: [];
    episode_number?: number;
    episode_name?: string;
    air_date?: string;

    id: number;
    name: string;
    status: string;
    percentDone: number;
    totalSize: number;
}

type FileInfo = {
    bytesCompleted: number;
    length: number;
    name: string;
    begin_piece?: number;
    end_piece?: number;
}

type MovieType = 'movie' | 'tv';

type TorrentInfo = {
    id: number;
    type: MovieType;
    externalId: number;
    name: string;
    status: number;
    percentDone: number;
    totalSize: number;
    eta: number;
    speed: number;
    seeders?: number;
    activeSeeders?: number;
    files: FileInfo[];
}

type TorrentsData = {
    torrents: TorrentInfo[];
    info: {
        freeSpace: number;
    }
}