import { TorrentsDataStorage } from '../../services/torrents-data-storage'
import html from './download-circle.html'
import scss from './download-circle.scss'

function addDownloadCircleInternal(movie: TorrentInfo, card: HTMLElement) {
    const cardJQ = $(card)
    if (!cardJQ.find('.download-circle').length) {
        const progressBar = Lampa.Template.get('download-circle', {
            id: movie.id!,
            status: movie.percentDone === 1 ? 'complete' : 'in-progress',
            progress: 100 * (1 - movie.percentDone),
        })
        cardJQ.find('.card__vote').after(progressBar)
    }
}

export function addDownloadCircle(movieId: number, card: HTMLElement) {
    const torrent = TorrentsDataStorage.getMovie(movieId)
    if (torrent) {
        addDownloadCircleInternal(torrent, card)
    }
}

export function updateDownloadCircle(torrent: TorrentInfo) {
    const elements = document.querySelectorAll(`.download-circle-in-progress-${torrent.id}`);

    if (!elements.length) return;

    elements.forEach((element) => {
        if (torrent.percentDone === 1) {
            const parent = element.parentElement;
            element.remove();
            addDownloadCircleInternal(torrent, parent as HTMLElement);
        } else {
            const progressCircle = element.querySelector('.download-circle__partial_in-progress');
            progressCircle?.setAttribute('stroke-dashoffset', `${100 * (1 - torrent.percentDone)}`);
        }
    });
}

export default function () {
    Lampa.Template.add('download-circle', html)
    $('body').append(`<style>${scss}</style>`)

    Lampa.Listener.follow('line', (e) => {
        if (e.type === 'append') {
            for (const item of e.items) {
                if (item?.data?.id) {
                    addDownloadCircle(item?.data?.id, item.card)
                }
            }
        }
    })
}
