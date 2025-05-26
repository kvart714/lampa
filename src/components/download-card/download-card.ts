import { TorrentsDataStorage } from '../../services/torrents-data-storage'
import html from './download-card.html'
import scss from './download-card.scss'
import { formatTorrent } from '../formatters'
import { openActions, openTorrent } from '../open-actions'

export function addDownloadCard(torrent: TorrentInfo, movie?: MovieInfo) {
    const card = $(Lampa.Template.get('download-card', formatTorrent(torrent)))
    $('.full-start-new__right').append(card)

    card.on('hover:enter', () => {
        openTorrent('full_start', torrent, movie?.title || movie?.original_title)
    })
    card.on('hover:long', () => {
        openActions('full_start', torrent, movie?.title || movie?.original_title)
    })
}

export function updateDownloadCard(torrent: TorrentInfo) {
    const updatedData = formatTorrent(torrent)

    const card = document.getElementById(`download-card-${updatedData.id}`)
    if (!card) return

    for (const key in updatedData) {
        const el = card.querySelector(`[data-key="${key}"]`)
        if (el)
            el.textContent = updatedData[
                key as keyof typeof updatedData
            ] as string
    }

    card.querySelector('.download-card__progress-bar-progress')!.setAttribute(
        'style',
        `width: ${updatedData.percent};`
    )
}

export default function () {
    Lampa.Template.add('download-card', html)
    $('body').append(`<style>${scss}</style>`)

    Lampa.Listener.follow('full', (e) => {
        if (e.type === 'complite') {
            const torrent = TorrentsDataStorage.getMovie(e.data.movie.id)!
            if (torrent) {
                addDownloadCard(torrent, e.data.movie)
            }
        }
    })
}
