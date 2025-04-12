import html from './download-button.html'
import icon from './../../icon.svg'
import { MovieDataStorage } from '../../services/movies-data-storage'
import { TransmissionService } from '../../services/transmission'
import { log } from '../../log'

function addDownloadButton(data: MovieData) {
    const button = $(
        Lampa.Template.get('download-button', {
            icon,
            text: Lampa.Lang.translate('download'),
        })
    )

    button.on('hover:enter', (e) => {
        MovieDataStorage.selectMovie(data.movie)
        Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('download'),
            component: 'torrents-download',
            // search: combinations[Storage.field('parse_lang')],
            search_one: data.movie.title,
            search_two: data.movie.original_title,
            movie: data.movie,
            page: 1,
        })
    })

    $('.full-start-new__buttons').children().first().after(button)
}

export default function () {
    Lampa.Template.add('download-button', html)
    Lampa.Component.add('torrents-download', Lampa.Component.get('torrents'))

    Lampa.Listener.follow('full', (e) => {
        if (e.type === 'complite') {
            const data = e.data
            addDownloadButton(data)
        }
    })

    Lampa.Listener.follow('torrent', (e) => {
        if (
            e.type === 'render' &&
            Lampa.Activity.active().component === 'torrents-download'
        ) {
            $(e.item).off('hover:enter')
            $(e.item).on('hover:enter', () => {
                MovieDataStorage.addSelectedMovie()

                TransmissionService.AddTorrent(e.element)

                Lampa.Activity.back()
            })
        }
    })
}
