import { log } from '../log'
import { STATUS_CODES } from '../services/torrent-client/statuses'
import { TorrentClientFactory } from '../services/torrent-client/torrent-client-factory'
import { TorrentsDataStorage } from '../services/torrents-data-storage'
import { DEFAULT_ACTION_KEY, URL_KEY } from '../settings'

async function play(torrent: TorrentInfo, name?: string) {
    const files = await TorrentClientFactory.getClient().getFiles(torrent)
    const baseUrl = Lampa.Storage.field(URL_KEY) + '/downloads/'

    let playlist = files.map((f, i) => ({
        title: f.name,
        url: baseUrl + f.name,
    }))
    Lampa.Player.play({
        playlist: playlist,
        title: name || torrent.name,
        url: baseUrl + files[0].name,
    } as any)
    Lampa.Player.playlist(playlist)
}

function resumeOrPause(torrent: TorrentInfo) {
    if (torrent.status === STATUS_CODES.DOWNLOADING) {
        TorrentClientFactory.getClient().stopTorrent(torrent)
    } else {
        TorrentClientFactory.getClient().startTorrent(torrent)
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
                    const files = await TorrentClientFactory.getClient().getFiles(torrent)
                    const baseUrl = Lampa.Storage.field(URL_KEY) + '/downloads/'

                    let playlist = files.map((f, i) => ({
                        title: f.name,
                        url: baseUrl + f.name,
                    }))
                    Lampa.Player.play({
                        playlist: playlist,
                        title: name || torrent.name,
                        url: baseUrl + files[0].name,
                    } as any)
                    Lampa.Player.playlist(playlist)
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
                title: torrent.status === STATUS_CODES.DOWNLOADING ? Lampa.Lang.translate('actions.pause') : Lampa.Lang.translate('actions.resume'),
                onSelect() {
                    resumeOrPause(torrent)
                    Lampa.Controller.toggle(source)
                },
            },
            {
                title: Lampa.Lang.translate('actions.delete'),
                subtitle: Lampa.Lang.translate('actions.delete-with-file'),
                onSelect() {
                    TorrentClientFactory.getClient().removeTorrent(torrent, true)
                    Lampa.Controller.toggle(source)
                },
            },
            {
                title: Lampa.Lang.translate('actions.delete-torrent'),
                subtitle: Lampa.Lang.translate('actions.delete-torrent-keep-file'),
                onSelect() {
                    TorrentClientFactory.getClient().removeTorrent(torrent, false)
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
        play(torrent, name)
    } else if (action == 2) {
        resumeOrPause(torrent)
    } else {
        openActions(source, torrent, name)
    }
}