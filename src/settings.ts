import manifest from './manifest.json'
import icon from './icon.svg'
import { TransmissionService } from './services/transmission'
import { BackgroundWorker } from './services/background-worker'

export const INTERVAL_KEY = `${manifest.component}.interval`
export const URL_KEY = `${manifest.component}.url`
export const LOGIN_KEY = `${manifest.component}.login`
export const PASSWORD_KEY = `${manifest.component}.password`

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
            placeholder: '',
            values: ['2s', '5s', '10s', '30s', '1m', '5m', '15m'],
            default: 0,
        },
        field: {
            name: 'Update interval',
        },
        onChange(item) {
            Lampa.Settings.update()
            const seconds = [2, 5, 10, 30, 60, 5 * 60, 15 * 60][item]
            BackgroundWorker.start(seconds)
        },
    })
    Lampa.SettingsApi.addParam({
        component: manifest.component,
        param: {
            name: URL_KEY,
            type: 'input',
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
