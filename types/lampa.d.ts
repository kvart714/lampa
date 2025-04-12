declare namespace Lampa {
    interface Lang {
        add(translations: Record<string, Record<string, string>>): void;
        translate(key: string): string;
    }

    interface Storage {
        field(key: string): any;
        get<T>(key: string, defaultValue?: T): T;
        set(key: string, value: any): void;
    }

    interface Template {
        get(templateName: string, data?: Record<string, any>, raw?: boolean): string;
        add(templateName: string, template: string): void;
    }

    interface SettingsApi {
        addComponent(component: Component): void;
        addParam(param: Param): void;
    }

    interface Component {
        name: string;
        icon: string;
        component: string;
    }

    interface Param {
        component: string;
        param: {
            name: string;
            type: string;
            default: any;
            values?: Record<string, any>;
            placeholder?: string;
        };
        field: {
            name: string;
            description?: string;
        };
        onRender?(item: any): void;
        onChange?(value: any): void;
    }

    interface Reguest {
        silent(url: string, onSuccess: (data: any) => void, onError?: (error: any) => void, postData?: any, options?: any): void;
        clear(): void;
    }

    interface Scroll {
        minus(): void;
        append(element: HTMLElement): void;
        render(): HTMLElement;
        update(element: HTMLElement, force?: boolean): void;
        destroy(): void;
    }

    interface Utils {
        bytesToSize(bytes: number, decimals?: number): string;
    }

    interface Noty {
        show(message: string): void;
    }

    interface InteractionCategory {
        create(): void;
        nextPageReuest(object: any, resolve: (data: any) => void, reject: (error: any) => void): void;
        build(data: any): void;
        bind(data: any): void;
        empty(): void;
    }

    interface Activity {
        push(activity: { url: string; title: string; component: string; page: number }): void;
    }

    interface Favorite {
        add(type: string, item: any, priority: number): void;
    }

    interface Modal {
        close(): void;
        open(options: { title: string; html: HTMLElement | JQuery; align: string; onBack: () => void; onSelect?: () => void }): void;
    }

    interface Select {
        show(options: { title: string; items: { title: string; confirm?: boolean }[]; onSelect: (item: any) => void; onBack: () => void }): void;
    }

    interface Controller {
        toggle(name: string): void;
        toContent(): void;
    }

    interface Manifest {
        plugins: { type: string; version: string; name: string; description: string; component: string };
    }

    const Lang: Lang;
    const Storage: Storage;
    const Template: Template;
    const SettingsApi: SettingsApi;
    const Reguest: new () => Reguest;
    const Scroll: new (options: { mask: boolean; over: boolean; step: number }) => Scroll;
    const Utils: Utils;
    const Noty: Noty;
    const InteractionCategory: new (object: any) => InteractionCategory;
    const Activity: Activity;
    const Favorite: Favorite;
    const Modal: Modal;
    const Select: Select;
    const Controller: Controller;
    const Manifest: Manifest;
    const Listener: {
        follow: (event: string, callback: (e: any) => void) => void;
    };
}

interface LampaTorrentFFProbe {
    index: number;
    codec_name: string;
    codec_long_name: string;
    codec_type: string;
    width?: number;
    height?: number;
    coded_width?: number;
    coded_height?: number;
    bit_rate: string;
    sample_fmt?: string;
    sample_rate?: string;
    channels?: number;
    channel_layout?: string;
}

interface LampaTorrentInfo {
    quality: number;
    videotype: string;
    voices: string[];
    types: string[];
    sizeName: string;
    name: string;
    originalname: string;
    relased: number;
}

interface LampaTorrent {
    Tracker: string;
    Details: string;
    Title: string;
    Size: number;
    PublishDate: string;
    Category: number[];
    CategoryDesc: string;
    Seeders: number;
    Peers: number;
    MagnetUri: string;
    Link: string;
    ffprobe: LampaTorrentFFProbe[];
    languages: string[];
    info: LampaTorrentInfo;
    PublisTime: number;
    hash: string;
    viewed: boolean;
    size: string;
    title: string;
    date: string;
    tracker: string;
    bitrate: string;
    seeds: number;
    grabs: number;
    poster: string;
}
