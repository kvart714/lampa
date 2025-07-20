import useDownloadsTab from './components/downloads-tab/downloads-tab'
import { settings, URL_KEY } from './settings'
import translations from '../l10n/translations.json'
import manifest from './manifest.json'
import useDownloadCircles from './components/download-circle/download-circle'
import { BackgroundWorker } from './services/background-worker'
import useDownloadButton from './components/download-button/download-button'
import useDownloadCard from './components/download-card/download-card'
import { log } from './log'

function startPlugin() {
    ;(window as any).plugin_transmission_ready = true

    Lampa.Manifest.plugins = manifest
    Lampa.Lang.add(translations)

    // Lampa.Listener.follow("full", e => log('full', e))
    // Lampa.Listener.follow('line', (e) => log('line', e))
    // Lampa.Listener.follow("torrent", e => log('torrent', e))
    // Lampa.Listener.follow("torrent_file", e => log('torrent_file', e))

    settings()

    useDownloadButton()
    useDownloadCard()
    useDownloadsTab()
    useDownloadCircles()

    const isConfigured = Lampa.Storage.field(URL_KEY)
    if (isConfigured) {
        BackgroundWorker.start()
    }
}

if (!(window as any).plugin_transmission_ready) {
    if ((window as any).appready) startPlugin()
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') startPlugin()
        })
    }
}
