import { MovieInfoDataStorage } from '../services/movieinfo-data-storage'
import { STATUS_CODES } from '../services/torrent-client/statuses'
import { POSTER_QUALITIES, POSTER_QUALITY_KEY } from '../settings'

export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

    return size + ' ' + Lampa.Lang.translate(`download-card.size.${i}`)
}

export function formatSpeed(bytesPerSecond: number): string {
    const sec = Lampa.Lang.translate('download-card.time.3')
    return `${formatBytes(bytesPerSecond)}/${sec}`
}

export function formatTime(seconds: number): string {
    const d = Math.floor(seconds / 86400)
    const h = Math.floor((seconds % 86400) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)

    const parts = [d, h, m, s].map((p, i) => (p ? p + Lampa.Lang.translate(`download-card.time.${i}`) : null)).filter(Boolean)

    return parts.slice(0, 2).join(' ')
}

function formatYear(dateStr?: string): number | '' {
  const d = new Date(dateStr || '');
  return isNaN(d.getTime()) ? '' : d.getFullYear();
}

export function formatTorrent(torrent: TorrentInfo) {
    const info = MovieInfoDataStorage.getMovieInfo(torrent)
    const posterQuality = POSTER_QUALITIES[Lampa.Storage.get<number>(POSTER_QUALITY_KEY)] || POSTER_QUALITIES[1]
    return {
        id: torrent.id + '_' + torrent.externalId,
        title: info?.title || info?.name || (torrent.status === STATUS_CODES.INITIALIZATION ? 'Initialization' : torrent.name),
        poster: info?.poster_path ? Lampa.TMDB.image(`t/p/${posterQuality}${info.poster_path}`) : '',
        year: formatYear((info?.release_date || info?.first_air_date)),
        fileName: (info?.title || info?.name) ? torrent.name : '',
        percent: (100 * torrent.percentDone).toFixed(2) + '%',
        speed: torrent.speed > 0 ? formatSpeed(torrent.speed) : '',
        downloadedSize: formatBytes(torrent.percentDone * torrent.totalSize),
        totalSize: formatBytes(torrent.totalSize),
        eta:
            torrent.status === STATUS_CODES.DOWNLOADING
                ? formatTime(torrent.eta)
                : torrent.status === STATUS_CODES.STALLED && torrent.percentDone === 1
                ? Lampa.Lang.translate(`download-card.status.14`)
                : Lampa.Lang.translate(`download-card.status.${torrent.status}`),
        status: torrent.status === STATUS_CODES.DOWNLOADING ? 'downloading' : torrent.percentDone === 1 ? 'completed' : 'paused',
        seeders: `${torrent.seeders || 0} (${torrent.activeSeeders || 0})`,
    }
}
