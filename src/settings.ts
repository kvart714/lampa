import icon from './icon.svg'
import manifest from './manifest.json'
import { BackgroundWorker } from './services/background-worker'
import { TorrentClientFactory } from './services/torrent-client/torrent-client-factory'

export const INTERVAL_KEY = `${manifest.component}.interval`
export const DEFAULT_ACTION_KEY = `${manifest.component}.default-action`
export const ALLOW_MULTIPLE_DOWNLOADS_KEY = `${manifest.component}.allow-multiple-marks`
export const POSTER_QUALITY_KEY = `${manifest.component}.poster-quality`

export const URL_KEY = `${manifest.component}.server.url`
export const LOGIN_KEY = `${manifest.component}.server.login`
export const PASSWORD_KEY = `${manifest.component}.server.password`
export const CLIENT_TYPE_KEY = `${manifest.component}.server.type`

export const JELLYFIN_SEPARATE_MOVIES_TV_KEY = `${manifest.component}.jellyfin.separate-movies-tv`
export const JELLYFIN_SUBFOLDER_KEY = `${manifest.component}.jellyfin.subfolder`
export const JELLYFIN_INCLUDE_YEAR_KEY = `${manifest.component}.jellyfin.include-year`
export const JELLYFIN_INCLUDE_TMDB_ID_KEY = `${manifest.component}.jellyfin.include-tmdbid`

export const INTERVALS = [2, 5, 10, 30, 60, 5 * 60, 15 * 60]
export const POSTER_QUALITIES = ['w200', 'w342', 'w500', 'w780', 'w1280']

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
            name: POSTER_QUALITY_KEY,
            type: 'select',
            placeholder: '',
            values: [
                'Low',
                'Medium',
                'High',
                'Very High',
                'Ultra'
            ],
            default: 1,
        },
        field: {
            name: 'Poster quality'
        },
        onChange(item) {
            Lampa.Settings.update();
        },
    });

    // SERVER SETTINGS
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

    // JELLYFIN/PLEX INTEGRATION
    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: 'jellyfin-title',
            type: 'title',
            default: '',
        },
        field: {
            name: 'Jellyfin / Plex integration:',
        },
    })
    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: JELLYFIN_SEPARATE_MOVIES_TV_KEY,
            type: 'trigger',
            default: false,
        },
        field: {
            name: 'Download movies and TV shows into separate directories',
        },
        onChange() {
            Lampa.Settings.update()
        },
    })
    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: JELLYFIN_SUBFOLDER_KEY,
            type: 'trigger',
            default: false,
        },
        field: {
            name: 'Download into a subfolder with title',
        },
        onChange() {
            if (Lampa.Storage.field(JELLYFIN_SUBFOLDER_KEY) !== true) {
                Lampa.Storage.set(JELLYFIN_INCLUDE_YEAR_KEY, false)
                Lampa.Storage.set(JELLYFIN_INCLUDE_TMDB_ID_KEY, false)
            }
            Lampa.Settings.update()
        },
    })
    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: JELLYFIN_INCLUDE_YEAR_KEY,
            type: 'trigger',
            default: false,
        },
        field: {
            name: 'Add (year) to folder name',
        },
        onRender(item) {
            Lampa.Storage.field(JELLYFIN_SUBFOLDER_KEY) === true
                ? item.show()
                : item.hide()
        },
        onChange() {
            Lampa.Settings.update()
        },
    })
    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: JELLYFIN_INCLUDE_TMDB_ID_KEY,
            type: 'trigger',
            default: false,
        },
        field: {
            name: 'Add [tmdbid-***] to folder name',
        },
        onRender(item) {
            Lampa.Storage.field(JELLYFIN_SUBFOLDER_KEY) === true
                ? item.show()
                : item.hide()
        },
        onChange() {
            Lampa.Settings.update()
        },
    })
}
