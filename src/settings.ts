import icon from './icon.svg'
import manifest from './manifest.json'
import { BackgroundWorker } from './services/background-worker'
import { TorrentClientFactory } from './services/torrent-client/torrent-client-factory'

export const INTERVAL_KEY = `${manifest.component}.interval`
export const DEFAULT_ACTION_KEY = `${manifest.component}.default-action`
export const ALLOW_MULTIPLE_DOWNLOADS_KEY = `${manifest.component}.allow-multiple-marks`
export const URL_KEY = `${manifest.component}.server.url`
export const LOGIN_KEY = `${manifest.component}.server.login`
export const PASSWORD_KEY = `${manifest.component}.server.password`
export const CLIENT_TYPE_KEY = `${manifest.component}.server.type`

export const INTERVALS = [2, 5, 10, 30, 60, 5 * 60, 15 * 60]

export function settings() {
    Lampa.SettingsApi.addComponent({
        component: manifest.component,
        name: manifest.name,
        icon: icon,
    })

    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: INTERVAL_KEY,
            type: 'select',
            placeholder: '2s',
            values: ['2s', '5s', '10s', '30s', '1m', '5m', '15m'],
            default: 0,
        },
        field: {
            name: 'Update interval',
        },
        onChange(item) {
            Lampa.Settings.update()
            BackgroundWorker.start()
        },
    })

    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: DEFAULT_ACTION_KEY,
            type: 'select',
            placeholder: '',
            values: [
                'Open actions menu',
                'Play',
                'Resume / Pause download'
            ],
            default: 0,
        },
        field: {
            name: 'Default press action',
            description: 'Long press always opens the actions menu.'
        },
        onChange(item) {
            Lampa.Settings.update();
        },
    });

    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: ALLOW_MULTIPLE_DOWNLOADS_KEY,
            type: 'trigger',
            default: false,
        },
        field: {
            name: 'Keep torrents screen open after download',
            description: 'After selecting a torrent, the app does not return back and keeps the add screen open, allowing you to add multiple torrents in a row.'
        },
        onChange(item) {
            Lampa.Settings.update();
        },
    });

    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: 'transmission-title',
            type: 'title',
            default: '',
        },
        field: {
            name: 'Server settings:',
        },
    })
    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: CLIENT_TYPE_KEY,
            type: 'select',
            placeholder: '',
            values: ['Transmission', 'qBitTorrent'],
            default: '0',
        },
        field: {
            name: 'Torrent Client',
        },
        onChange(item) {
            Lampa.Settings.update()
            TorrentClientFactory.reset()
        },
    })
    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: URL_KEY,
            type: 'input',
            placeholder: '',
            values: '',
            default: '',
        },
        field: {
            name: 'Url',
        },
        onChange(item) {
            Lampa.Settings.update()
            TorrentClientFactory.reset()
        },
    })
    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: LOGIN_KEY,
            type: 'input',
            placeholder: '',
            values: '',
            default: '',
        },
        field: {
            name: 'Login',
        },
        onChange(item) {
            Lampa.Settings.update()
            TorrentClientFactory.reset()
        },
    })
    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: PASSWORD_KEY,
            type: 'input',
            placeholder: '',
            values: '',
            default: '',
        },
        field: {
            name: 'Password',
        },
        onChange(item) {
            Lampa.Settings.update()
            TorrentClientFactory.reset()
        },
    })
}
