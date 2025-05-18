// Типы для qBittorrent Web API
export interface QBittorrentFile {
    index: number;
    name: string;
    size: number;
    progress: number;
    priority: number;
    is_seed: boolean;
    piece_range?: [number, number];
}

export interface QBittorrentTorrent {
    hash: string;
    name: string;
    size: number;
    progress: number;
    dlspeed: number;
    upspeed: number;
    eta: number;
    state: string;
    files?: QBittorrentFile[];
    // ...добавьте другие поля по необходимости
}
