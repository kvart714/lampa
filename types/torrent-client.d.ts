import type { TorrentInfo } from './models';

export interface ITorrentClient {
    getTorrents(): Promise<TorrentInfo[]>;
    addTorrent(movie: MovieInfo, selectedTorrent: LampaTorrent): Promise<void>;
    startTorrent(torrent: TorrentInfo): Promise<void>;
    stopTorrent(torrent: TorrentInfo): Promise<void>;
    removeTorrent(torrent: TorrentInfo, deleteFiles?: boolean): Promise<void>;
    hideTorrent(torrent: TorrentInfo, deleteFiles?: boolean): Promise<void>;
    getFiles(torrent: TorrentInfo): Promise<FileInfo[]>;
}
