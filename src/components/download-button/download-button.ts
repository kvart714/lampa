import html from './download-button.html'
import icon from './../../icon.svg'
import { MovieDataStorage } from '../../services/movies-data-storage'
import { TransmissionService } from '../../services/transmission'

function addDownloadButton(data: MovieData) {
    const button = $(
        Lampa.Template.get('download-button', {
            icon,
            text: Lampa.Lang.translate('download'),
        })
    )

    button.on('hover:enter', (e) => {
        // try {
        //     (Lampa as any).Player.play({
        //         title: 'LALKA',
        //         url: 'smb://192.168.1.1/download/Arcane.S01.2021.2160p.BDRemux-Rutracker/Arcane.S01E07.The.Boy.Savior.2160p.BDRemux-Rutracker.mkv'
        //     })
        //     // Android.openPlayer('https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', {})
        //     // Android.openPlayer('ftp://pc:111@192.168.1.120:1493/device/Download/Flud/Shrek.2001.BDRip_s.x264.RG.Tru.mkv', {})
        //     // Android.openPlayer('smb://admin:password@192.168.1.1/download/Arcane.S01.2021.2160p.BDRemux-Rutracker/Arcane.S01E07.The.Boy.Savior.2160p.BDRemux-Rutracker.mkv', {})
        // }
        // catch (e) {
        //     log(JSON.stringify(e))
        // }

        // return

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
