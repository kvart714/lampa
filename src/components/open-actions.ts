import { STATUS_CODES } from '../services/torrent-client/statuses'
import { TorrentClientFactory } from '../services/torrent-client/torrent-client-factory'
import { TorrentsDataStorage } from '../services/torrents-data-storage'
import { TorrentViewsStorage } from '../services/TorrentViewsStorage'
import { DEFAULT_ACTION_KEY } from '../settings'

async function play(source: string, torrent: TorrentInfo, name?: string) {
    const client = TorrentClientFactory.getClient()
    const files = await client.getFiles(torrent)
    const baseUrl = client.url + '/downloads/'

    if (files.length < 1) {
        throw new Error('No files found in torrent')
    }

    if (files.length === 1) {
        Lampa.Player.play({
            title: name || torrent.name,
            url: baseUrl + files[0].name,
        })
    }

    if (files.length > 1) {
        const views = TorrentViewsStorage.getViews(torrent)

        const sortedFiles = files.sort((a, b) => a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: 'base'
        }))
        
        const playlist = sortedFiles.map((f, i) => ({
            title: f.name.split(/[\\/]/).pop() || f.name,
            name: f.name,
            url: baseUrl + f.name,
            picked: views[f.name],
            selected: views.last === f.name,
        }))
        Lampa.Select.show({
            title: Lampa.Lang.translate('actions.select-file'),
            items: playlist,
            async onSelect(item) {
                TorrentViewsStorage.rememberView(torrent, item.name)
                Lampa.Player.play({
                    playlist,
                    title: name || torrent.name,
                    url: item.url,
                })
                Lampa.Player.playlist(playlist)
                Lampa.Controller.toggle(source)
            },
            onBack: function onBack() {
                Lampa.Controller.toggle(source)
            },
        })
    }
}

function resumeOrPause(torrent: TorrentInfo) {
    if (torrent.status === STATUS_CODES.STOPPED) {
        TorrentClientFactory.getClient().startTorrent(torrent)
    } else {
        TorrentClientFactory.getClient().stopTorrent(torrent)
    }
}

export function openActions(source: string, torrent: TorrentInfo, name?: string) {
    torrent = TorrentsDataStorage.ensureMovie(torrent)!
    Lampa.Select.show({
        title: Lampa.Lang.translate('actions.title'),
        items: [
            {
                title: Lampa.Lang.translate('actions.open'),
                async onSelect() {
                    play(source, torrent, name)
                },
            },
            ...(source === 'downloads-tab' && torrent.id
                ? [
                      {
                          title: Lampa.Lang.translate('actions.open-card'),
                          async onSelect() {
                              Lampa.Activity.push({
                                  component: 'full',
                                  id: torrent.id,
                                  method: 'movie',
                                  card: torrent,
                              })
                          },
                      },
                  ]
                : []),
            {
                title: torrent.status === STATUS_CODES.STOPPED ? Lampa.Lang.translate('actions.resume') : Lampa.Lang.translate('actions.pause'),
                onSelect() {
                    resumeOrPause(torrent)
                    Lampa.Controller.toggle(source)
                },
            },
            {
                title: Lampa.Lang.translate('actions.hide'),
                onSelect() {
                    TorrentClientFactory.getClient().hideTorrent(torrent)
                    $(`.downloads-tab__item[data-id="${torrent.id}_${torrent.externalId}"]`).remove()
                    Lampa.Controller.toggle(source)
                },
            },
            {
                title: Lampa.Lang.translate('actions.delete'),
                subtitle: Lampa.Lang.translate('actions.delete-with-file'),
                onSelect() {
                    TorrentClientFactory.getClient().removeTorrent(torrent, true)
                    $(`.downloads-tab__item[data-id="${torrent.id}_${torrent.externalId}"]`).remove()
                    Lampa.Controller.toggle(source)
                },
            },
            {
                title: Lampa.Lang.translate('actions.delete-torrent'),
                subtitle: Lampa.Lang.translate('actions.delete-torrent-keep-file'),
                onSelect() {
                    TorrentClientFactory.getClient().removeTorrent(torrent, false)
                    $(`.downloads-tab__item[data-id="${torrent.id}_${torrent.externalId}"]`).remove()
                    Lampa.Controller.toggle(source)
                },
            },
        ],
        onBack: function onBack() {
            Lampa.Controller.toggle(source)
        },
    })
}

export function openTorrent(source: string, torrent: TorrentInfo, name?: string) {
    const action = Lampa.Storage.field(DEFAULT_ACTION_KEY)
    if (action == 1) {
        play(source, torrent, name)
    } else if (action == 2) {
        resumeOrPause(torrent)
    } else {
        openActions(source, torrent, name)
    }
}
