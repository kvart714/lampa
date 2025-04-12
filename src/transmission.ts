const url = Lampa.Storage.field('lmetorrenttransmissionUrl');
const user = Lampa.Storage.field('lmetorrenttransmissionUser');
const pass = Lampa.Storage.field('lmetorrenttransmissionPass');
const path = `${Lampa.Storage.get('transmissionPath') || '/transmission/rpc'}`;
let proxy = '';

if (Lampa.Storage.field('lmetorrenttransmissionProxy') === true) {
    proxy = 'https://p01--corsproxy--h7ynqrkjrc6c.code.run/';
}

const transmissionStatus = {
    0: 'Torrent is stopped',
    1: 'Torrent is queued to verify local data',
    2: 'Torrent is verifying local data',
    3: 'Torrent is queued to download',
    4: 'Torrent is downloading',
    5: 'Torrent is queued to seed',
    6: 'Torrent is seeding',
};

function getSessionId() {
    return Lampa.Storage.get('lmetorrenttransmissionKey') as string
}

function getHeaders() {
    const headers: any = {
        Authorization: `Basic ${btoa(user + ':' + pass)}`,
        'Content-Type': 'application/json',
    };
    if (Lampa.Storage.get('lmetorrenttransmissionKey')) {
        headers['X-Transmission-Session-Id'] = Lampa.Storage.get(
            'lmetorrenttransmissionKey'
        );
    }
    if (Lampa.Storage.field('lmetorrenttransmissionProxy') === true) {
        headers['x-requested-with'] = 'lampame';
    }
    return headers;
}


class Transmission {
    static auth() {
        const req = {
            url: `${proxy}${url}${path}`,
            method: 'POST',
            headers: getHeaders(),
            contentType: 'application/json',
            success: function (response: any, textStatus: any, jqXHR: any) {
                //resolve(Lampa.Noty.show(Lampa.Lang.translate('actionSentSuccessfully')));
            },
            error: function (jqXHR: {
                status: number;
                getResponseHeader: (arg0: string) => any;
            }) {
                if (jqXHR.status === 409) {
                    Lampa.Storage.set(
                        'lmetorrenttransmissionKey',
                        jqXHR.getResponseHeader('X-Transmission-Session-Id')
                    );
                    Lampa.Noty.show(Lampa.Lang.translate('AuthSuccess'));
                }
                if (jqXHR.status !== 200 && jqXHR.status !== 409) {
                    log('Transmission auth', jqXHR.status, jqXHR);
                    Lampa.Noty.show('AuthDenied ver1');
                }
            },
        };
        $.ajax(req);
    }

    static GetData() {
        const settings = {
            url: `${proxy}${url}${path}`,
            method: 'POST',
            timeout: 0,
            headers: getHeaders(),
            data: JSON.stringify({
                method: 'torrent-get',
                arguments: {
                    fields: [
                        'status',
                        'totalSize',
                        'percentComplete',
                        'percentDone',
                        'name',
                        'id',
                        'labels',
                    ],
                },
            }),
        };

        return new Promise(function (
            resolve: (arg0: any) => void,
            reject: (arg0: Error) => void
        ) {
            $.ajax(settings)
                .done(function (response: { arguments: { torrents: any[] } }) {
                    try {
                        const standardizedResponse =
                            response.arguments.torrents.map(
                                (torrent: {
                                    name: any;
                                    id: any;
                                    totalSize: any;
                                    status: keyof typeof transmissionStatus;
                                    percentComplete: any;
                                }) => ({
                                    name: torrent.name,
                                    id: torrent.id,
                                    size: torrent.totalSize,
                                    state: transmissionStatus[torrent.status],
                                    completed: torrent.percentComplete,
                                })
                            );
                        resolve(standardizedResponse);
                    } catch (error) {
                        reject(new Error('Ошибка при обработке данных'));
                    }
                })
                .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
                    reject(
                        new Error(
                            `Ошибка AJAX запроса: ${textStatus} - ${errorThrown}`
                        )
                    );
                });
        });
    }

    static GetInfo() {
        const settings = {
            url: `${proxy}${url}${path}`,
            method: 'POST',
            timeout: 0,
            headers: getHeaders(),
            data: JSON.stringify({
                method: 'session-get',
            }),
        };
        return new Promise(function (
            resolve: (arg0: { space: any }) => void,
            reject: (arg0: Error) => void
        ) {
            $.ajax(settings)
                .done(function (response: { arguments: { [x: string]: any } }) {
                    try {
                        const standardizedResponse = {
                            space: response.arguments[
                                'download-dir-free-space'
                            ],
                        };
                        resolve(standardizedResponse);
                    } catch (error) {
                        reject(new Error('Ошибка при обработке данных'));
                    }
                })
                .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
                    reject(
                        new Error(
                            `Ошибка AJAX запроса: ${textStatus} - ${errorThrown}`
                        )
                    );
                });
        });
    }

    static getId(labels: string[]): number {
        const id = labels.find((label) => label.startsWith('tmdbId:'))?.split(':')[1] || ''
        return parseInt(id)
    }

    static async GetTorrents(): Promise<Movie[]> {
        const client = new TransmissionRpcClient(`${proxy}${url}${path}`, user, pass, getSessionId());
        const response = client.getTorrents({ fields: ['id', 'name', 'status', 'percentDone', 'totalSize', 'labels'] })

        return (await response).arguments?.torrents.map((torrent: any) => ({
            id: Transmission.getId(torrent.labels),
            name: torrent.name,
            status: torrent.status,
            percentDone: torrent.percentDone,
            totalSize: torrent.totalSize,
        })).filter((torrent: Movie) => torrent.id) || []
    }

    static SendCommand(
        btn: { action: string; deleteFiles: any },
        torrent_data: { id: any }
    ) {
        let method;
        if (btn.action === 'resume') method = 'torrent-start';
        if (btn.action === 'pause') method = 'torrent-stop';
        if (btn.action === 'delete') method = 'torrent-remove';
        const settings = {
            url: `${proxy}${url}${path}`,
            method: 'POST',
            timeout: 0,
            headers: getHeaders(),
            data: JSON.stringify({
                method: method,
                arguments: {
                    ids: torrent_data.id,
                    'delete-local-data': btn.deleteFiles ? 'true' : '',
                },
            }),
        };
        return new Promise(function (
            resolve: (arg0: any) => void,
            reject: (arg0: any) => void
        ) {
            $.ajax(settings)
                .done(function (response: any) {
                    try {
                        resolve(
                            Lampa.Noty.show(
                                Lampa.Lang.translate('actionSentSuccessfully')
                            )
                        );
                    } catch (error) {
                        log('Send action:', error);
                        reject(
                            Lampa.Noty.show(
                                Lampa.Lang.translate('actionReturnedError')
                            )
                        );
                    }
                })
                .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
                    log('Send file:', textStatus, errorThrown, jqXHR);
                    reject(
                        Lampa.Noty.show(
                            Lampa.Lang.translate('actionReturnedError')
                        )
                    );
                });
        });
    }

    static async SendTask(selectedTorrent: LampaTorrent): Promise<void> {
        if (!selectedTorrent) {
            return;
        }

        const tmdbId = new URLSearchParams(window.location.search).get("card");

        const client = new TransmissionRpcClient(`${proxy}${url}${path}`, user, pass, getSessionId());

        const response = await client.addTorrent({
            paused: true,
            sequential_download: true,
            filename: selectedTorrent.MagnetUri ? selectedTorrent.MagnetUri : selectedTorrent.Link,
            labels: ['tmdbId:' + tmdbId],
        })

        if (response.arguments?.['torrent-added']) {
            await client.setTorrent({
                ids: [response.arguments['torrent-added'].id],
                labels: ['tmdbId:' + tmdbId],
            })

            Lampa.Noty.show(Lampa.Lang.translate('actionSentSuccessfully'));

            return
        }
    }
    
    private static async POST(method: 'torrent-get' | 'torrent-set' | 'torrent-start' | 'torrent-stop' | 'torrent-remove' | 'torrent-add', args: any): Promise<any> {
        const response = await fetch(`${proxy}${url}${path}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                method,
                arguments: args,
            }),
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
    }
}
