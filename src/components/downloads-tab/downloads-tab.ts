import { TorrentsDataStorage } from '../../services/torrents-data-storage'
import tabHtml from './downloads-tab.html'
import btnHtml from './menu-button.html'
import scss from './downloads-tab.scss'
import icon from '../../icon.svg'
import { formatTorrent } from '../formatters'
import { STATUS_CODES } from '../../services/torrent-client/statuses'

class DownloadsTabComponent {
    private scroll!: Lampa.Scroll
    private html = $('<div></div>')

    public create(): void {
        this.scroll = new Lampa.Scroll({ mask: true, over: true, step: 200 })

        const $list = $('<div class="downloads-tab__list"></div>')

        const torrents: TorrentInfo[] = TorrentsDataStorage.getMovies()
        torrents.forEach((torrent) => {
            const fmt = formatTorrent(torrent)
            const statusClass =
                torrent.status === STATUS_CODES.DOWNLOADING
                    ? 'downloading'
                    : torrent.percentDone === 1
                    ? 'completed'
                    : 'paused'

            const $row = $(
                Lampa.Template.get('downloads-row', {
                    ...fmt,
                    icon,
                    statusClass,
                })
            )
                .attr('tabindex', '0')
                .on('hover:focus', (e) =>
                    this.scroll.update(e.currentTarget as HTMLElement, true)
                )
                .on('hover:enter', () => this.openTorrent(torrent))

            $list.append($row)
        })

        this.scroll.minus()
        this.scroll.append($list.get(0)!)

        this.html.append(this.scroll.render())
    }
    public render(js: boolean = false): HTMLElement | JQuery {
        return this.html
    }

    public start(): void {
        const container = this.scroll.render()

        Lampa.Controller.add('content', {
            toggle: () => {
                Lampa.Controller.collectionSet(this.scroll.render())
                Lampa.Controller.collectionFocus(false, this.scroll.render())
            },
            left: () =>
                (Navigator as any).canmove('left')
                    ? (Navigator as any).move('left')
                    : Lampa.Controller.toggle('menu'),
            right: () => (Navigator as any).move('right'),
            up: () =>
                (Navigator as any).canmove('up')
                    ? (Navigator as any).move('up')
                    : Lampa.Controller.toggle('head'),
            down: () =>
                (Navigator as any).canmove('down') &&
                (Navigator as any).move('down'),
            back: () => Lampa.Activity.backward(),
        })

        Lampa.Controller.toggle('content')
    }

    public build(data?: any): void {}
    public bind(data?: any): void {}
    public empty(): void {}
    public next(): void {}
    public append(data?: any, append?: boolean): void {}
    public limit(): void {}
    public refresh(): void {}
    public pause(): void {}
    public stop(): void {}
    public destroy(): void {}

    private openTorrent(torrent: TorrentInfo): void {
        console.log('openTorrentDetails', torrent)
    }
}

export default function () {
    Lampa.Template.add('menu-button', btnHtml)
    Lampa.Template.add('downloads-row', tabHtml)

    $('body').append(`<style>${scss}</style>`)

    Lampa.Component.add('downloads-tab', DownloadsTabComponent)

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
