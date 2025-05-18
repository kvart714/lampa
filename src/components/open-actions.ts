import { STATUS_CODES } from '../services/torrent-client/statuses'
import { TorrentClientFactory } from '../services/torrent-client/torrent-client-factory'
import { TorrentsDataStorage } from '../services/torrents-data-storage'
import { URL_KEY } from '../settings'

export function openActions(
    source: string,
    torrent: TorrentInfo,
    name?: string
) {
    Lampa.Select.show({
        title: Lampa.Lang.translate('actions.title'),
        items: [
            {
                title: Lampa.Lang.translate('actions.open'),
                async onSelect() {
                    const file =
                        await TorrentClientFactory.getClient().getFiles(torrent)
                    Lampa.Player.play({
                        title: name || torrent.name,
                        url:
                            Lampa.Storage.field(URL_KEY) +
                            '/downloads/' +
                            file[0].name,
                    })
                },
            },
            ...(source === 'downloads-tab'
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
            torrent.status === STATUS_CODES.DOWNLOADING
                ? {
                      title: Lampa.Lang.translate('actions.pause'),
                      onSelect() {
                          TorrentClientFactory.getClient().stopTorrent(torrent)
                      },
                  }
                : {
                      title: Lampa.Lang.translate('actions.resume'),
                      onSelect() {
                          TorrentClientFactory.getClient().startTorrent(torrent)
                      },
                  },
            {
                title: Lampa.Lang.translate('actions.delete'),
                subtitle: Lampa.Lang.translate('actions.delete-with-file'),
                onSelect() {
                    TorrentClientFactory.getClient().removeTorrent(
                        torrent,
                        true
                    )
                },
            },
            {
                title: Lampa.Lang.translate('actions.delete-torrent'),
                subtitle: Lampa.Lang.translate(
                    'actions.delete-torrent-keep-file'
                ),
                onSelect() {
                    TorrentClientFactory.getClient().removeTorrent(
                        torrent,
                        false
                    )
                },
            },
        ],
        onBack: function onBack() {
            Lampa.Controller.toggle(source)
        },
    })
}
