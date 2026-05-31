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
    private $rows!: JQuery

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

        this.$rows = page.find('.downloads-tab__rows')
        const isPortrait = window.innerWidth <= window.innerHeight

        const groups = groupTorrents(data.torrents)

        if (isPortrait) {
            groups.forEach((group) => this.$rows.append(this.buildElement(group)))
        } else {
            const $cols = [$('<div class="downloads-tab__col"></div>'), $('<div class="downloads-tab__col"></div>')
            ]
            this.$rows.append($cols[0]).append($cols[1])
            const weights = [0, 0]
            groups.forEach((group) => {
                const col = weights[0] <= weights[1] ? 0 : 1
                weights[col] += group.length
                $cols[col].append(this.buildElement(group))
            })
        }

        this.scroll.minus()
        this.scroll.append(page.get(0)!)

        this.html.append(this.scroll.render())
    }

    private buildElement(group: TorrentInfo[]): JQuery {
        const $items = group.map((torrent, i) => {
            const fmt = formatTorrent(torrent)
            return $(Lampa.Template.get(i === 0 ? 'downloads-row' : 'downloads-mini-row', fmt))
                .on('hover:focus', (e) => {
                    this.lastFocusedElement = e.currentTarget as HTMLElement
                    this.scroll.update(e.currentTarget as HTMLElement, true)
                })
                .on('hover:enter', () => openTorrent('downloads-tab', torrent, undefined, (t) => this.removeTorrentFromUI(t)))
                .on('hover:long', () => openActions('downloads-tab', torrent, undefined, (t) => this.removeTorrentFromUI(t)))
        })
        if (group.length > 1) {
            const $group = $('<div class="downloads-tab__group"></div>')
            $items.forEach(($item) => $group.append($item))
            return $group
        }
        return $items[0]
    }

    public removeTorrentFromUI(torrent: TorrentInfo): void {
        const itemId = `${torrent.id}_${torrent.externalId}`
        const $row = this.html.find(`.downloads-tab__item[data-id="${itemId}"]`)
        if (!$row.length) return

        const $group = $row.closest('.downloads-tab__group')
        const isGrouped = $group.length > 0
        const wasMainRow = isGrouped && $group.find('.downloads-tab__item').first().is($row)

        // Pick a focus target before mutating the DOM so we can restore focus
        // afterwards (otherwise Lampa.Controller falls back to the first item
        // in the collection and the scroll jumps to the top).
        let $focusTarget: JQuery = $row.nextAll('.downloads-tab__item').first()
        if (!$focusTarget.length) $focusTarget = $row.prevAll('.downloads-tab__item').first()
        if (!$focusTarget.length) {
            const $anchor = isGrouped ? $group : $row
            $focusTarget = $anchor.nextAll('.downloads-tab__item, .downloads-tab__group').first()
            if (!$focusTarget.length) $focusTarget = $anchor.prevAll('.downloads-tab__item, .downloads-tab__group').first()
        }

        $row.remove()

        if (isGrouped) {
            const $remaining = $group.find('.downloads-tab__item')
            if ($remaining.length === 0) {
                $group.remove()
            } else if (wasMainRow) {
                // Promote the first surviving mini-row to a full row by
                // morphing it in-place. We keep the original DOM node so the
                // jQuery handlers attached in buildElement stay alive.
                const $promote = $remaining.first()
                const promoteId = $promote.attr('data-id') || ''
                const externalId = promoteId.substring(promoteId.indexOf('_') + 1)
                const data = TorrentsDataStorage.getData()
                const promoteTorrent = data.torrents.find((t) => String(t.externalId) === externalId)
                if (promoteTorrent) {
                    const fmt = formatTorrent(promoteTorrent)
                    const $template = $(Lampa.Template.get('downloads-row', fmt))
                    $promote.attr('class', $template.attr('class') || '')
                    $promote.empty().append($template.contents())
                }
            }
        }

        Lampa.Controller.collectionSet(this.scroll.render())
        if ($focusTarget?.length) {
            const focusEl = $focusTarget.is('.downloads-tab__item')
                ? $focusTarget.get(0)
                : $focusTarget.find('.downloads-tab__item').first().get(0)
            if (focusEl) {
                Lampa.Controller.collectionFocus(focusEl, this.scroll.render())
                this.lastFocusedElement = focusEl
            }
        }
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
            up: () => ((Navigator as any).canmove('up') ? (Navigator as any).move('up') : Lampa.Controller.toggle('head')),
            down: () => ((Navigator as any).canmove('down') && (Navigator as any).move('down')),
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
