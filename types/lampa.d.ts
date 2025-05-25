declare namespace Lampa {
    type Lang = {
        add(translations: Record<string, Record<string, string>>): void
        translate(key: string): string
    }

    type Storage = {
        field(key: string): any
        get<T>(key: string, defaultValue?: T): T
        set(key: string, value: any): void
    }

    type Template = {
        get(
            templateName: string,
            data?: Record<string, any>,
            raw?: boolean
        ): JQuery
        add(templateName: string, template: string): void
        js(templateName: string, data?: Record<string, any>): JQuery
        render(templateName: string, data?: Record<string, any>): HTMLElement
    }

    type SettingsApi = {
        addComponent(component: {
            name: string
            icon: string
            component: string
        }): void
        addParam(param: Param): void
        update(): void
    }

    type Component = {
        name: string
        icon: string
        component: string
        add(name: string, component: any): void
        get(name: string): any
    }

    type Param = {
        component: string
        param: {
            name: string
            type: 'select' | 'input' | 'trigger' | 'title' | 'static'
            default: any
            values?: Record<string, any> | string
            placeholder?: string
        }
        field: {
            name: string
            description?: string
        }
        onRender?(item: any): void
        onChange?(value: any): void
    }

    type Reguest = {
        silent(
            url: string,
            onSuccess: (data: any) => void,
            onError?: (error: any) => void,
            postData?: any,
            options?: any
        ): void
        clear(): void
    }

    type Scroll = {
        minus(): void
        append(element: HTMLElement): void
        render(): HTMLElement
        update(element: HTMLElement, force?: boolean): void
        destroy(): void
    }

    type Utils = {
        bytesToSize(bytes: number, decimals?: number): string
    }

    type Noty = {
        show(message: string): void
    }

    type InteractionCategoryBuildData = {
        secuses: boolean;
        page: number;
        results: Array<MovieInfo>;
        wide?: boolean;
        small?: boolean;
        broad?: boolean;
        collection?: boolean;
        card_events?: boolean;
    };

    type InteractionCategory = {
        create(): void
        nextPageReuest(
            object: any,
            resolve: (data: any) => void,
            reject: (error: any) => void
        ): void
        build(data: InteractionCategoryBuildData): void
        bind(data: any): void
        empty(): void
        next(): void
        append(data: any, append: boolean): void
        limit(): void
        start(): void
        refresh(): void
        pause(): void
        stop(): void
        render(js: boolean): HTMLElement | JQuery
        destroy(): void
    }

    type Activity = {
        backward(): unknown
        push(activity: {
            url: string
            title: string
            component: string
            page: number
            
        } | any): void
        back(): void
        active(): {
            url: string
            title: string
            component: string
            search_one: string
            search_two: string
            movie: MovieInfo
            page: number
            activity: {
                stoped: boolean
                started: boolean
            }
        }
    }

    type Favorite = {
        add(type: string, item: any, priority: number): void
    }

    type Modal = {
        close(): void
        open(options: {
            title: string
            html: HTMLElement | JQuery
            align: string
            onBack: () => void
            onSelect?: () => void
        }): void
    }

    type Select = {
        show(options: {
            title: string
            items: { title: string; subtitle?: string; [key: string]: any }[]
            onSelect?: (item: any) => void
            onBack?: () => void
        }): void
    }

    type Controller = {
        collectionFocus(): unknown
        collectionFocus(arg0: HTMLElement | boolean, arg1: any): unknown
        collectionSet(arg0: any): unknown
        add(arg0: string, arg1: { toggle: () => void; up: () => any; down: () => any; left: () => any; right: () => any; enter?: () => void; back: () => unknown }): unknown
        toggle(name: string): void
        toContent(): void
    }

    type Manifest = {
        plugins: {
            type: string
            version: string
            name: string
            description: string
            component: string
        }
    }

    type Follow = {
        (app: 'app', callback: (e: AppEvent) => void): void;
        (app: 'line', callback: (e: LineEvent) => void): void;
        (app: 'torrent', callback: (e: TorrentEvent) => void): void;
        (event: 'full', callback: (e: FullEvent) => void): void;
        (
            event: 'torrent' | 'torrent_file' | any,
            callback: (e: FullEvent) => void
        ): void
      };

    type Player = {
        play(options: {
            title: string
            url: string
            subtitles?: Array<{
                label: string
                url: string
                language?: string
                default?: boolean
            }>
            poster?: string
            headers?: Record<string, string>
            autoplay?: boolean
        }): void
        stop(): void
        pause(): void
        resume(): void
        callback(f: any): void
        stat(e: any): void
        playlist(playlist: { title: string; url: string }[]): void
    }

    const Lang: Lang
    const Storage: Storage
    const Template: Template
    const Settings: {
        addComponent(component: {
            name: string
            icon: string
            component: string
        }): void
        addParam(param: Param): void
        update(): void
    }
    const SettingsApi: SettingsApi
    const Reguest: new () => Reguest
    const Scroll: new (options: {
        mask: boolean
        over: boolean
        step: number
    }) => Scroll
    const Utils: Utils
    const Noty: Noty
    const InteractionCategory: new (object: any) => InteractionCategory
    const Activity: Activity
    const Favorite: Favorite
    const Modal: Modal
    const Select: Select
    const Controller: Controller
    const Manifest: Manifest
    const Component: Component
    const Listener: {
        follow: Follow
        send(s: string, e: any) 
    }
    const Player: Player;
}

type AppEvent = {
    type: 'ready'
}

type TorrentEvent = {
    type: 'render',
    element: LampaTorrent,
    item: HTMLElement
}

type MovieData = {
    movie: MovieInfo
    persons: {
        id: number
        cast: Array<{
            adult: boolean
            gender: number
            id: number
            known_for_department: string
            name: string
            original_name: string
            popularity: number
            profile_path: string
            cast_id: number
            character: string
            credit_id: string
            order: number
        }>
        crew: Array<{
            adult: boolean
            gender: number
            id: number
            known_for_department: string
            name: string
            original_name: string
            popularity: number
            profile_path: string
            credit_id: string
            department: string
            job: string
        }>
        url: string
    }
    recomend: {
        page: number
        results: Array<{
            backdrop_path: string
            id: number
            title: string
            original_title: string
            overview: string
            poster_path: string
            media_type: string
            adult: boolean
            original_language: string
            genre_ids: number[]
            popularity: number
            release_date: string
            video: boolean
            vote_average: number
            vote_count: number
        }>
        total_pages: number
        total_results: number
        url: string
        title: string
        noimage: boolean
    }
    simular: {
        page: number
        results: Array<{
            adult: boolean
            backdrop_path: string
            genre_ids: number[]
            id: number
            original_language: string
            original_title: string
            overview: string
            poster_path: string
            release_date: string
            title: string
            video: boolean
            vote_average: number
            vote_count: number
        }>
        total_pages: number
        total_results: number
        url: string
        title: string
        noimage: boolean
    }
    videos: {
        results: Array<{
            iso_639_1: string
            iso_3166_1: string
            name: string
            key: string
            site: string
            size: number
            type: string
            official: boolean
            published_at: string
            id: string
        }>
    }
    reactions: {
        secuses: boolean
        result: Array<{
            card_id: string
            type: string
            counter: number
        }>
    }
    discuss: {
        secuses: boolean
        total: number
        total_pages: number
        page: number
        result: Array<{
            id: number
            cid: number
            card_id: string
            published: number
            comment: string
            liked: number
            lang: string
            email: string
            profile: number
            icon: string
        }>
    }
}

type FullEvent = {
    type: 'start' | 'build' | 'complite'
    object: {
        component: string
        id: number
        method: string
        card: {
            adult: boolean
            backdrop_path: string
            belongs_to_collection: null | string
            budget: number
            genres: Array<{ id: number; name: string }>
            homepage: string
            id: number
            imdb_id: string
            origin_country: string[]
            original_language: string
            original_title: string
            overview: string
            popularity: number
            poster_path: string
            production_companies: Array<{
                id: number
                logo_path: string
                name: string
                origin_country: string
            }>
            production_countries: Array<{ iso_3166_1: string; name: string }>
            release_date: string
            revenue: number
            runtime: number
            spoken_languages: Array<{
                english_name: string
                iso_639_1: string
                name: string
            }>
            status: string
            tagline: string
            title: string
            video: boolean
            vote_average: number
            vote_count: number
            release_dates: {
                results: Array<{
                    iso_3166_1: string
                    release_dates: Array<{
                        certification: string
                        descriptors: string[]
                        iso_639_1: string
                        note: string
                        release_date: string
                        type: number
                    }>
                }>
            }
            external_ids: {
                imdb_id: string
                wikidata_id: string
                facebook_id: null | string
                instagram_id: string
                twitter_id: null | string
            }
            keywords: {
                keywords: Array<{ id: number; name: string }>
            }
            alternative_titles: {
                titles: Array<{
                    iso_3166_1: string
                    title: string
                    type: string
                }>
            }
            url: string
            source: string
            img: string
        }
        source: string
        activity: {
            stoped: boolean
            started: boolean
        }
    }
    data: MovieData
}

type LampaTorrentFFProbe = {
    index: number
    codec_name: string
    codec_long_name: string
    codec_type: string
    width?: number
    height?: number
    coded_width?: number
    coded_height?: number
    bit_rate: string
    sample_fmt?: string
    sample_rate?: string
    channels?: number
    channel_layout?: string
}

type LampaTorrentInfo = {
    quality: number
    videotype: string
    voices: string[]
    types: string[]
    sizeName: string
    name: string
    originalname: string
    relased: number
}

type LampaTorrent = {
    Tracker: string
    Details: string
    Title: string
    Size: number
    PublishDate: string
    Category: number[]
    CategoryDesc: string
    Seeders: number
    Peers: number
    MagnetUri: string
    Link: string
    ffprobe: LampaTorrentFFProbe[]
    languages: string[]
    info: LampaTorrentInfo
    PublisTime: number
    hash: string
    viewed: boolean
    size: string
    title: string
    date: string
    tracker: string
    bitrate: string
    seeds: number
    grabs: number
    poster: string
}

type LineEvent = {
    line: Record<string, unknown>
    type: 'create' | 'append' | 'visible' // Removed 'start'
    params: {
        url: string
        object: {
            url: string
            title: string
            component: string
            source: string
            activity: {
                stoped: boolean
                started: boolean
            }
        }
        type: string
    }
    data: {
        dates?: {
            maximum: string
            minimum: string
        }
        page: number
        results: Array<{
            adult: boolean
            backdrop_path: string
            genre_ids: number[]
            id: number
            original_language: string
            original_title: string
            overview: string
            popularity: number
            poster_path: string
            release_date: string
            title: string
            video: boolean
            vote_average: number
            vote_count: number
            ready: boolean
            release_year: string
            media_type?: string // Added optional media_type for 'visible' event
        }>
        total_pages: number
        total_results: number
        url: string
        title: string
        ready: boolean
    }
    scroll: Record<string, unknown>
    body: Record<string, unknown>
    items: Array<{
        data: {
            adult: boolean
            backdrop_path: string
            genre_ids: number[]
            id: number
            original_language: string
            original_title: string
            overview: string
            popularity: number
            poster_path: string
            release_date: string
            title: string
            video: boolean
            vote_average: number
            vote_count: number
            ready: boolean
            release_year: string
            media_type?: string // Added optional media_type for 'visible' event
        }
        params: {
            url: string
            object: {
                url: string
                title: string
                component: string
                source: string
                activity: {
                    stoped: boolean
                    started: boolean
                }
            }
            type: string
        }
        card: HTMLElement,
        img: Record<string, unknown>
        watched_checked: boolean
    }>
    active: number
}
