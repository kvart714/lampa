import { TorrentsDataStorage } from '../../services/torrents-data-storage'
import tabHtml from './downloads-tab.html'
import btnHtml from './menu-button.html'
import scss from './downloads-tab.scss'
import icon from '../../icon.svg'
import { formatTorrent } from '../formatters'
import { openActions, openTorrent } from '../open-actions'

class DownloadsTabComponent {
    private scroll!: Lampa.Scroll
    private html = $('<div></div>')

    public create(): void {
        this.scroll = new Lampa.Scroll({ mask: true, over: true, step: 200 })

        const $list = $('<div class="downloads-tab__list d-updatable"></div>')

        const torrents: TorrentInfo[] = TorrentsDataStorage.getMovies()
        torrents.forEach((torrent) => {
            const fmt = formatTorrent(torrent)
            const $row = $(
                Lampa.Template.get('downloads-row', {
                    ...fmt,
                    icon,
                })
            )
                .on('hover:focus', (e) =>
                    this.scroll.update(e.currentTarget as HTMLElement, true)
                )
                .on('hover:enter', () => openTorrent('downloads-tab', torrent))
                .on('hover:long', () => openActions('downloads-tab', torrent))

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
        Lampa.Controller.add('downloads-tab', {
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

        Lampa.Controller.toggle('downloads-tab')
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
    public destroy(): void {
        this.scroll.destroy()
        this.html.remove()
    }
}

export function updateDownloadsTab(torrent: TorrentInfo): void {
    const fmt = formatTorrent(torrent)

    const $row = $(document).find(
        `.downloads-tab__item[data-id="${fmt.id}"]`
    )
    if (!$row.length) return

    $row.removeClass('downloading completed paused').addClass(fmt.status)

    $row.find('.downloads-tab__title').text(fmt.fileName)
    $row.find('.downloads-tab__speed').text(fmt.speed)

    $row.find('.downloads-tab__meta-size').text(
        `${fmt.downloadedSize} / ${fmt.totalSize}`
    )
    $row.find('.downloads-tab__meta-eta').text(fmt.eta)

    $row.find('.downloads-tab__progress-fill').css('width', fmt.percent)
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
