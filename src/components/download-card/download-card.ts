import { TorrentsDataStorage } from '../../services/torrents-data-storage'
import { TransmissionService } from '../../services/transmission'
import html from './download-card.html'
import scss from './download-card.scss'

const DOWNLOADING_STATUS = 4

function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0'

    const k = 1000
    const dm = decimals < 0 ? 0 : decimals

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

    return size + ' ' + Lampa.Lang.translate(`download-card.size.${i}`)
}

function formatSpeed(bytesPerSecond: number): string {
    const sec = Lampa.Lang.translate('download-card.time.3')
    return `${formatBytes(bytesPerSecond)}/${sec}`
}

function formatTime(seconds: number): string {
    const d = Math.floor(seconds / 86400)
    const h = Math.floor((seconds % 86400) / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)

    const parts = [d, h, m, s]
        .map((p, i) =>
            p ? p + Lampa.Lang.translate(`download-card.time.${i}`) : null
        )
        .filter(Boolean)

    return parts.slice(0, 2).join(' ')
}

function formatTorrent(torrent: TorrentInfo) {
    return {
        id: torrent.id,
        fileName: torrent.name,
        percent: (100 * torrent.percentDone).toFixed(0) + '%',
        speed: torrent.speed > 0 ? formatSpeed(torrent.speed) : '',
        downloadedSize: formatBytes(torrent.percentDone * torrent.totalSize),
        totalSize: formatBytes(torrent.totalSize),
        eta:
            torrent.eta > 0
                ? formatTime(torrent.eta)
                : Lampa.Lang.translate(
                      `download-card.status.${torrent.status}`
                  ),
    }
}

// TODO: move texts to translations
function openActions(movie: MovieInfo, torrent: TorrentInfo) {
    Lampa.Select.show({
        title: 'Действия',
        items: [
            {
                title: 'Открыть',
                onSelect() {
                    // TODO: add open action
                    // Lampa.Player.play({
                    //     title: movie.title || movie.original_title || torrent.name,
                    //     url: baseDir + '/' + torrent.files[0].name,
                    // })
                },
            },
            torrent.status === DOWNLOADING_STATUS
                ? {
                      title: 'Пауза',
                      onSelect() {
                          TransmissionService.stopTorrent(torrent)
                      },
                  }
                : {
                      title: 'Продолжить',
                      onSelect() {
                          TransmissionService.startTorrent(torrent)
                      },
                  },
            {
                title: 'Удалить',
                subtitle: 'Удалить торрент и файл',
                onSelect() {
                    TransmissionService.fullRemoveTorrent(torrent)
                },
            },
            {
                title: 'Удалить торрент',
                subtitle: 'Удалить торрент, но оставить файл',
                onSelect() {
                    TransmissionService.removeTorrent(torrent)
                },
            },
        ],
        onBack: function onBack() {
            Lampa.Controller.toggle('full_start')
        },
    })
}

export function updateDownloadCard(torrent: TorrentInfo) {
    const card = document.getElementById(`download-card-${torrent.id}`)
    if (!card) return

    const updatedData = formatTorrent(torrent)

    for (const key in updatedData) {
        const el = card.querySelector(`[data-key="${key}"]`)
        if (el)
            el.textContent = updatedData[
                key as keyof typeof updatedData
            ] as string
    }

    card.querySelector(
        '.download-card__progress-bar-progress'
    )!.setAttribute('style', `width: ${updatedData.percent};`)
}

export default function () {
    Lampa.Template.add('download-card', html)
    $('body').append(`<style>${scss}</style>`)

    Lampa.Listener.follow('full', (e) => {
        if (e.type === 'complite') {
            const id = e.data.movie.id
            const torrent = TorrentsDataStorage.getMovie(id)!
            if (torrent) {
                $('.full-start-new__right').append(
                    Lampa.Template.get('download-card', formatTorrent(torrent))
                )

                $('#download-card-' + torrent.id).on('hover:enter', () => {
                    openActions(e.data.movie, torrent)
                })
            }
        }
    })
}
