import icon from '../../icon.svg'
import { BackgroundWorker } from '../../services/background-worker'
import { TorrentClientFactory } from '../../services/torrent-client/torrent-client-factory'
import { TorrentsDataStorage } from '../../services/torrents-data-storage'
import { formatBytes, formatTorrent } from '../formatters'
import { openActions, openTorrent } from '../open-actions'
import miniRowHtml from './downloads-mini-row.html'
import rowHtml from './downloads-row.html'
import tabHtml from './downloads-tab.html'
import scss from './downloads-tab.scss'
import btnHtml from './menu-button.html'

function groupTorrents(torrents: TorrentInfo[]): TorrentInfo[][] {
    const groupMap = new Map<string, { torrents: TorrentInfo[]; lastIndex: number }>()

    torrents.forEach((torrent, index) => {
        const key = torrent.id > 0 ? String(torrent.id) : `solo_${torrent.externalId}`
        if (!groupMap.has(key)) {
            groupMap.set(key, { torrents: [], lastIndex: index })
        }
        const group = groupMap.get(key)!
        group.torrents.push(torrent)
        group.lastIndex = Math.max(group.lastIndex, index)
    })

    return [...groupMap.values()]
        .sort((a, b) => a.lastIndex - b.lastIndex)
        .map((g) => [...g.torrents].sort((a, b) => b.totalSize - a.totalSize))
}

class DownloadsTabComponent {
    private scroll!: Lampa.Scroll
    private html = $('<div></div>')

    public create(): void {
        if (!TorrentClientFactory.isConnected) {
            BackgroundWorker.start()
        }

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

        const $cols = [$('<div class="downloads-tab__col"></div>'), $('<div class="downloads-tab__col"></div>')]
        page.find('.downloads-tab__rows').append($cols[0]).append($cols[1])

        const weights = [0, 0]
        groupTorrents(data.torrents).forEach((group) => {
            const $items = group.map((torrent, i) => {
                const fmt = formatTorrent(torrent)
                return $(Lampa.Template.get(i === 0 ? 'downloads-row' : 'downloads-mini-row', fmt))
                    .on('hover:focus', (e) => this.scroll.update(e.currentTarget as HTMLElement, true))
                    .on('hover:enter', () => openTorrent('downloads-tab', torrent))
                    .on('hover:long', () => openActions('downloads-tab', torrent))
            })

            const $element = group.length > 1
                ? (() => {
                    const $group = $('<div class="downloads-tab__group"></div>')
                    $items.forEach(($item) => $group.append($item))
                    return $group
                })()
                : $items[0]

            const col = weights[0] <= weights[1] ? 0 : 1
            weights[col] += group.length
            $cols[col].append($element)
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
    $row.find('.downloads-tab__progress-fill').css('width', fmt.percent)
    $row.find('.downloads-tab__poster').css('background-image', `url(${fmt.poster})`)

    Object.keys(fmt).forEach((key) => {
        $row.find(`[data-field="${key}"]`).each(function () {
            $(this).text((fmt as any)[key])
        })
    })
}

export default function () {
    Lampa.Template.add('menu-button', btnHtml)
    Lampa.Template.add('downloads-row', rowHtml)
    Lampa.Template.add('downloads-mini-row', miniRowHtml)
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
