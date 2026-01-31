import type { ITorrentClient } from '../../../../types/torrent-client'
import { buildPath, buildTags, extractId, extractType } from '../lampa-id'
import { mapQBState } from '../statuses'

export class QBittorrentWebApiClient implements ITorrentClient {
    constructor(public url: string, public login: string, public password: string, private cookie?: string | null) {}

    private async fetchWithAuth(path: string, options: RequestInit = {}): Promise<Response> {
        let response = await fetch(this.url + path, {
            ...options,
            credentials: 'include',
        })

        if (!response.ok && response.status === 403) {
            await this.authorize()
            response = await fetch(this.url + path, {
                ...options,
                credentials: 'include',
            })
        }

        return response
    }

    public async authorize(): Promise<void> {
        const params = new URLSearchParams()
        params.append('username', this.login)
        params.append('password', this.password)
        const response = await fetch(this.url + '/api/v2/auth/login', {
            method: 'POST',
            body: params,
            credentials: 'include',
        })

        if (!response.ok) throw new Error('qBittorrent login failed')

        this.cookie = response.headers.get('set-cookie') || undefined
    }

    public async getTorrents(): Promise<TorrentInfo[]> {
        let response = await this.fetchWithAuth('/api/v2/torrents/info')

        if (!response.ok) throw new Error('Failed to get torrents')

        const data: [] = await response.json()
        return this.formatTorrents(data)
    }

    public async getData(): Promise<TorrentsData> {
        const response = await this.fetchWithAuth('/api/v2/sync/maindata')
        
        if (!response.ok) throw new Error('Failed to get qBittorrent info')
        
        const data = await response.json()
        const torrents = data.torrents ?? []
		
        return {
            torrents: this.formatTorrents(Array.isArray(torrents) ? torrents : Object.keys(torrents).map(k => ({ ...torrents[k], hash: k}))),
            info: {
                freeSpace: data.server_state.free_space_on_disk,
            },
        }
    }

    public async addTorrent(movie: MovieInfo, selectedTorrent: LampaTorrent): Promise<void> {
        const form = new FormData()
        const url = new URL(selectedTorrent.MagnetUri || selectedTorrent.Link)
        url.searchParams.delete('dn')
        form.append('urls', url.toString())
        form.append('tags', buildTags(movie).join(','))
        form.append('sequentialDownload', 'true')

        const subPath = buildPath(movie)
        if (subPath) {
            const prefsRes = await this.fetchWithAuth('/api/v2/app/preferences')
            const prefs = await prefsRes?.json()
            const basePath = prefs?.save_path

            if (basePath) {
                const savePath =
                    basePath.replace(/[\\/]+$/g, '') +
                    subPath

                form.append('savepath', savePath)
            }
        }

        const response = await this.fetchWithAuth('/api/v2/torrents/add', {
            method: 'POST',
            body: form,
        })
        if (!response.ok) throw new Error('Failed to add torrent')
    }

    public async startTorrent(torrent: TorrentInfo): Promise<void> {
        const params = new URLSearchParams()
        params.append('hashes', String(torrent.externalId))
        const response = await this.fetchWithAuth('/api/v2/torrents/start', {
            method: 'POST',
            body: params,
        })
        if (!response.ok) throw new Error('Failed to start torrents')
    }

    public async stopTorrent(torrent: TorrentInfo): Promise<void> {
        const params = new URLSearchParams()
        params.append('hashes', String(torrent.externalId))
        const response = await this.fetchWithAuth('/api/v2/torrents/stop', {
            method: 'POST',
            body: params,
        })
        if (!response.ok) throw new Error('Failed to stop torrents')
    }

    public async hideTorrent(torrent: TorrentInfo): Promise<void> {
        const params = new URLSearchParams()
        params.append('hashes', String(torrent.externalId))
        params.append('tags', 'hide')
        const response = await this.fetchWithAuth('/api/v2/torrents/addTags', {
            method: 'POST',
            body: params,
        })
        if (!response.ok) throw new Error('Failed to hide torrent')
    }

    public async removeTorrent(torrent: TorrentInfo, deleteFiles = false): Promise<void> {
        const params = new URLSearchParams()
        params.append('hashes', String(torrent.externalId))
        params.append('deleteFiles', deleteFiles ? 'true' : 'false')
        const response = await this.fetchWithAuth('/api/v2/torrents/delete', {
            method: 'POST',
            body: params,
        })
        if (!response.ok) throw new Error('Failed to remove torrents')
    }

    public async getFiles(torrent: TorrentInfo): Promise<FileInfo[]> {
        const params = new URLSearchParams()
        params.append('hash', String(torrent.externalId))

        const response = await this.fetchWithAuth(`/api/v2/torrents/files?${params.toString()}`)
        if (!response.ok) {
            throw new Error(`Failed to get files for torrent ${torrent.externalId}`)
        }

        const filesData: Array<{
            name: string
            size: number
            progress: number
            piece_range?: [number, number]
        }> = await response.json()

        return filesData.map((f) => ({
            bytesCompleted: Math.floor(f.progress * f.size),
            length: f.size,
            name: f.name,
            begin_piece: f.piece_range?.[0],
            end_piece: f.piece_range?.[1],
        }))
    }

    private formatTorrents(data: any[]): TorrentInfo[] {
        return data
            .sort((a: any, b: any) => b.added_on - a.added_on)
            .filter((t: any) => !t.tags.includes('hide'))
            .map((t: any) => ({
                id: extractId(t.tags),
                type: extractType(t.tags),
                externalId: t.hash,
                name: t.name,
                status: mapQBState(t.state),
                percentDone: t.progress,
                totalSize: t.size,
                eta: t.eta,
                speed: t.dlspeed,
                files: [],
                seeders: t.num_seeds, // всего сидов
                activeSeeders: t.num_complete, // активных сидов (если есть)
                hash: t.hash, //хеш торрента
            }))
    }
}
