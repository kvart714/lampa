import { STATUS_CODES } from '../../services/torrent-client/statuses'
import { TorrentsDataStorage } from '../../services/torrents-data-storage'
import { TorrentClientFactory } from '../../services/torrent-client/torrent-client-factory'
import { URL_KEY } from '../../settings'
import html from './download-card.html'
import scss from './download-card.scss'
import { formatTorrent } from '../formatters'

function openActions(torrent: TorrentInfo, movie?: MovieInfo) {
    torrent = TorrentsDataStorage.getMovie(torrent.id)!
    Lampa.Select.show({
        title: Lampa.Lang.translate('actions.title'),
        items: [
            {
                title: Lampa.Lang.translate('actions.open'),
                async onSelect() {
                    const file =
                        await TorrentClientFactory.getClient().getFiles(torrent)
                    Lampa.Player.play({
                        title:
                            movie?.title ||
                            movie?.original_title ||
                            torrent.name,
                        url:
                            Lampa.Storage.field(URL_KEY) +
                            '/downloads/' +
                            file[0].name,
                    })
                },
            },
            torrent.status === STATUS_CODES.DOWNLOADING
                ? {
                      title: Lampa.Lang.translate('actions.pause'),
                      onSelect() {
                          TorrentClientFactory.getClient().stopTorrent(torrent)
                      },
                  }
                : {
                      title: Lampa.Lang.translate('actions.resume'),
                      onSelect() {
                          TorrentClientFactory.getClient().startTorrent(torrent)
                      },
                  },
            {
                title: Lampa.Lang.translate('actions.delete'),
                subtitle: Lampa.Lang.translate('actions.delete-with-file'),
                onSelect() {
                    TorrentClientFactory.getClient().removeTorrent(
                        torrent,
                        true
                    )
                },
            },
            {
                title: Lampa.Lang.translate('actions.delete-torrent'),
                subtitle: Lampa.Lang.translate(
                    'actions.delete-torrent-keep-file'
                ),
                onSelect() {
                    TorrentClientFactory.getClient().removeTorrent(
                        torrent,
                        false
                    )
                },
            },
        ],
        onBack: function onBack() {
            Lampa.Controller.toggle('full_start')
        },
    })
}

export function addDownloadCard(torrent: TorrentInfo, movie?: MovieInfo) {
    const card = $(Lampa.Template.get('download-card', formatTorrent(torrent)))
    $('.full-start-new__right').append(card)

    card.on('hover:enter', () => {
        openActions(torrent, movie)
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
