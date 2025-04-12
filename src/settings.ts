import manifest from './manifest.json'
import icon from './icon.svg'
import { TransmissionService } from './services/transmission'
import { BackgroundWorker } from './services/background-worker'

export const INTERVAL_KEY = `${manifest.component}.interval`
export const URL_KEY = `${manifest.component}.transmission.url`
export const LOGIN_KEY = `${manifest.component}.transmission.login`
export const PASSWORD_KEY = `${manifest.component}.transmission.password`

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
            BackgroundWorker.start(INTERVALS[item])
        },
    })

    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: 'transmission-title',
            type: 'title',
            default: '',
        },
        field: {
            name: 'Transmission settings:',
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
            TransmissionService.resetClient()
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
            TransmissionService.resetClient()
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
            TransmissionService.resetClient()
        },
    })
}
