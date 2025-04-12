import { MovieDataStorage } from '../../services/movies-data-storage'
import { TorrentsDataStorage } from '../../services/torrents-data-storage'
import { addDownloadCircle } from '../download-circle/download-circle'
import html from './menu-button.html'
import icon from '../../icon.svg'

class DownloadsTabComponent extends Lampa.InteractionCategory {
    constructor(object: any) {
        super(object)

        // override methods
        this.create = this._create
    }

    public _create() {
        this.build({
            secuses: true,
            page: 1,
            results: MovieDataStorage.getMovies(),
        })
    }

    public cardRender(object: any, movie: MovieInfo, cardItem: { card: any }) {
        addDownloadCircle(movie.id, cardItem.card)
    }
}

export default function () {
    Lampa.Component.add('downloads-tab', DownloadsTabComponent)

    Lampa.Template.add('menu-button', html)
    
    const text = Lampa.Lang.translate('downloads')
    
    const button = $(Lampa.Template.get('menu-button', { icon, text }))
    
    button.on('hover:enter', function () {
        Lampa.Activity.push({
            url: '',
            title: text,
            component: 'downloads-tab',
            page: 1,
        })
    })
    $('.menu .menu__list').eq(0).append(button)
}