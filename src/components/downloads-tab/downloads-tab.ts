import { TorrentsDataStorage } from '../../services/torrents-data-storage'
import tabHtml from './downloads-tab.html'
import rowHtml from './downloads-row.html'
import btnHtml from './menu-button.html'
import scss from './downloads-tab.scss'
import icon from '../../icon.svg'
import { formatBytes, formatTorrent } from '../formatters'
import { openActions, openTorrent } from '../open-actions'
import { TorrentClientFactory } from '../../services/torrent-client/torrent-client-factory'
import { BackgroundWorker } from '../../services/background-worker'

class DownloadsTabComponent {
    private scroll!: Lampa.Scroll
    private html = $('<div></div>')

    public create(): void {
        this.scroll = new Lampa.Scroll({ mask: true, over: true, step: 200 })

        const data: TorrentsData = TorrentsDataStorage.getData()

        const server = TorrentClientFactory.isConnected
            ? Lampa.Lang.translate('downloads-tab.connected') + ' (' + TorrentClientFactory.getClient().url + ')'
            : Lampa.Lang.translate('downloads-tab.disconnected')

        const page = $(
            Lampa.Template.get('downloads-tab', {
                server,
                freeSpace: Lampa.Lang.translate('downloads-tab.freespace') + formatBytes(data.info.freeSpace),
            })
        )

        if (!TorrentClientFactory.isConnected) {
            const refreshBtn = $(`<div class="downloads-tab__item selector" style="width: auto">Обновить</div>`)
            refreshBtn
                .on('hover:focus', (e) => this.scroll.update(e.currentTarget as HTMLElement, true))
                .on('hover:enter', () => BackgroundWorker.start())
            page.append(refreshBtn)
        }

        data.torrents.forEach((torrent) => {
            const fmt = formatTorrent(torrent)
            const $row = $(
                Lampa.Template.get('downloads-row', {
                    ...fmt,
                    icon,
                })
            )
                .on('hover:focus', (e) => this.scroll.update(e.currentTarget as HTMLElement, true))
                .on('hover:enter', () => openTorrent('downloads-tab', torrent))
                .on('hover:long', () => openActions('downloads-tab', torrent))

            page.append($row)
        })

        this.scroll.minus()
        this.scroll.append(page.get(0)!)

        this.html.append(this.scroll.render())
    }

    public render(js: boolean = false): HTMLElement | JQuery {
        return this.html
    }

    private lastFocusedElement: HTMLElement | null = null
    public start(): void {
        Lampa.Controller.add('downloads-tab', {
            toggle: () => {
                Lampa.Controller.collectionSet(this.scroll.render())
                Lampa.Controller.collectionFocus(this.lastFocusedElement ?? false, this.scroll.render())
            },
            left: () => ((Navigator as any).canmove('left') ? (Navigator as any).move('left') : Lampa.Controller.toggle('menu')),
            right: () => (Navigator as any).move('right'),
            up: () => {
                ;(Navigator as any).canmove('up') ? (Navigator as any).move('up') : Lampa.Controller.toggle('head')
                this.lastFocusedElement = (Navigator as any).getFocusedElement()
            },
            down: () => {
                ;(Navigator as any).canmove('down') && (Navigator as any).move('down')
                this.lastFocusedElement = (Navigator as any).getFocusedElement()
            },
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

    const $row = $(document).find(`.downloads-tab__item[data-id="${fmt.id}"]`)
    if (!$row.length) return

    $row.removeClass('downloading completed paused').addClass(fmt.status)
    $row.find('.downloads-tab__title span').text(fmt.fileName)
    $row.find('.downloads-tab__speed span').text(fmt.speed)
    $row.find('.downloads-tab__meta-eta span').text(fmt.eta)
    $row.find('.downloads-tab__progress-fill').css('width', fmt.percent)
    $row.find('.downloads-tab__meta-percent').text(fmt.percent)
    $row.find('.downloads-tab__meta-downloaded').text(fmt.downloadedSize)
    $row.find('.downloads-tab__meta-total').text(fmt.totalSize)
    $row.find('.downloads-tab__meta-seeders').text(fmt.seeders)
}

export default function () {
    Lampa.Template.add('menu-button', btnHtml)
    Lampa.Template.add('downloads-row', rowHtml)
    Lampa.Template.add('downloads-tab', tabHtml)

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
