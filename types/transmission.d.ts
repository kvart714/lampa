type RpcRequest<T = any> = {
    method: 
        | 'session-get'
        | 'torrent-add'
        | 'torrent-get'
        | 'torrent-start'
        | 'torrent-stop'
        | 'torrent-set'
        | 'torrent-remove';
    arguments?: T;
    tag?: number;
};

type RpcResponse<T = any> = {
    result: string;
    arguments?: T;
    tag?: number;
};

// Типизация для session-get
type SessionGetArgs = {};
type SessionGetResponse = {
    'alt-speed-down': number;
    'alt-speed-enabled': boolean;
    'alt-speed-time-begin': number;
    'alt-speed-time-day': number;
    'alt-speed-time-enabled': boolean;
    'alt-speed-time-end': number;
    'alt-speed-up': number;
    'blocklist-enabled': boolean;
    'blocklist-size': number;
    'blocklist-url': string;
    'cache-size-mb': number;
    'config-dir': string;
    'default-trackers': string;
    'dht-enabled': boolean;
    'download-dir': string;
    'download-dir-free-space': number;
    'download-queue-enabled': boolean;
    'download-queue-size': number;
    encryption: string;
    'idle-seeding-limit-enabled': boolean;
    'idle-seeding-limit': number;
    'incomplete-dir-enabled': boolean;
    'incomplete-dir': string;
    'lpd-enabled': boolean;
    'peer-limit-global': number;
    'peer-limit-per-torrent': number;
    'peer-port-random-on-start': boolean;
    'peer-port': number;
    'pex-enabled': boolean;
    'port-forwarding-enabled': boolean;
    'queue-stalled-enabled': boolean;
    'queue-stalled-minutes': number;
    'rename-partial-files': boolean;
    reqq: number;
    'rpc-version-minimum': number;
    'rpc-version-semver': string;
    'rpc-version': number;
    'script-torrent-added-enabled': boolean;
    'script-torrent-added-filename': string;
    'script-torrent-done-enabled': boolean;
    'script-torrent-done-filename': string;
    'script-torrent-done-seeding-enabled': boolean;
    'script-torrent-done-seeding-filename': string;
    'seed-queue-enabled': boolean;
    'seed-queue-size': number;
    seedRatioLimit: number;
    seedRatioLimited: boolean;
    sequential_download: boolean;
    'session-id': string;
    'speed-limit-down-enabled': boolean;
    'speed-limit-down': number;
    'speed-limit-up-enabled': boolean;
    'speed-limit-up': number;
    'start-added-torrents': boolean;
    'trash-original-torrent-files': boolean;
    units: {
        'speed-units': string[];
        'speed-bytes': number;
        'size-units': string[];
        'size-bytes': number;
        'memory-units': string[];
        'memory-bytes': number;
    };
    'utp-enabled': boolean;
    version: string;
};

// Типизация для torrent-add
type TorrentAddArgs = {
    cookies?: string;
    'download-dir'?: string;
    filename?: string;
    labels?: string[];
    metainfo?: string;
    paused?: boolean;
    'peer-limit'?: number;
    bandwidthPriority?: number;
    'files-wanted'?: number[];
    'files-unwanted'?: number[];
    'priority-high'?: number[];
    'priority-low'?: number[];
    'priority-normal'?: number[];
    sequential_download?: boolean;
};
type TorrentAddResponse = {
    'torrent-added'?: {
        id: number;
        name: string;
        hashString: string;
    };
    'torrent-duplicate'?: {
        id: number;
        name: string;
        hashString: string;
    };
};

// Типизация для torrent-get
type Field =
  | 'activityDate'
  | 'addedDate'
  | 'availability'
  | 'bandwidthPriority'
  | 'comment'
  | 'corruptEver'
  | 'creator'
  | 'dateCreated'
  | 'desiredAvailable'
  | 'doneDate'
  | 'downloadDir'
  | 'downloadedEver'
  | 'downloadLimit'
  | 'downloadLimited'
  | 'editDate'
  | 'error'
  | 'errorString'
  | 'eta'
  | 'etaIdle'
  | 'file-count'
  | 'files'
  | 'fileStats'
  | 'group'
  | 'hashString'
  | 'haveUnchecked'
  | 'haveValid'
  | 'honorsSessionLimits'
  | 'id'
  | 'isFinished'
  | 'isPrivate'
  | 'isStalled'
  | 'labels'
  | 'leftUntilDone'
  | 'magnetLink'
  | 'manualAnnounceTime'
  | 'maxConnectedPeers'
  | 'metadataPercentComplete'
  | 'name'
  | 'peer-limit'
  | 'peers'
  | 'peersConnected'
  | 'peersFrom'
  | 'peersGettingFromUs'
  | 'peersSendingToUs'
  | 'percentComplete'
  | 'percentDone'
  | 'pieces'
  | 'pieceCount'
  | 'pieceSize'
  | 'priorities'
  | 'primary-mime-type'
  | 'queuePosition'
  | 'rateDownload'
  | 'rateUpload'
  | 'recheckProgress'
  | 'secondsDownloading'
  | 'secondsSeeding'
  | 'seedIdleLimit'
  | 'seedIdleMode'
  | 'seedRatioLimit'
  | 'seedRatioMode'
  | 'sequential_download'
  | 'sizeWhenDone'
  | 'startDate'
  | 'status'
  | 'trackers'
  | 'trackerList'
  | 'trackerStats'
  | 'totalSize'
  | 'torrentFile'
  | 'uploadedEver'
  | 'uploadLimit'
  | 'uploadLimited'
  | 'uploadRatio'
  | 'wanted'
  | 'webseeds'
  | 'webseedsSendingToUs';

type TorrentGetArgs = {
  fields: Field[];
  ids?: (number | string)[];
};
type TorrentGetResponse = {
    torrents: {
        activityDate?: number;
        addedDate?: number;
        availability?: any[];
        bandwidthPriority?: number;
        comment?: string;
        corruptEver?: number;
        creator?: string;
        dateCreated?: number;
        desiredAvailable?: number;
        doneDate?: number;
        downloadDir?: string;
        downloadedEver?: number;
        downloadLimit?: number;
        downloadLimited?: boolean;
        editDate?: number;
        error?: number;
        errorString?: string;
        eta: number;
        etaIdle?: number;
        'file-count'?: number;
        files: {
            bytesCompleted: number;
            length: number;
            name: string;
            begin_piece?: number;
            end_piece?: number;
        }[];
        fileStats?: {
            bytesCompleted: number;
            wanted: boolean;
            priority: number;
        }[];
        group?: string;
        hashString?: string;
        haveUnchecked?: number;
        haveValid?: number;
        honorsSessionLimits?: boolean;
        id: number;
        isFinished?: boolean;
        isPrivate?: boolean;
        isStalled?: boolean;
        labels: string[];
        leftUntilDone?: number;
        magnetLink?: string;
        manualAnnounceTime?: number;
        maxConnectedPeers?: number;
        metadataPercentComplete?: number;
        name: string;
        'peer-limit'?: number;
        peers?: {
            address: string;
            clientName: string;
            clientIsChoked: boolean;
            clientIsInterested: boolean;
            flagStr: string;
            isDownloadingFrom: boolean;
            isEncrypted: boolean;
            isIncoming: boolean;
            isUploadingTo: boolean;
            isUTP: boolean;
            peerIsChoked: boolean;
            peerIsInterested: boolean;
            port: number;
            progress: number;
            rateToClient: number;
            rateToPeer: number;
        }[];
        peersConnected?: number;
        peersFrom?: {
            fromCache: number;
            fromDht: number;
            fromIncoming: number;
            fromLpd: number;
            fromLtep: number;
            fromPex: number;
            fromTracker: number;
        };
        peersGettingFromUs?: number;
        peersSendingToUs?: number;
        percentComplete?: number;
        percentDone: number;
        pieces?: string;
        pieceCount?: number;
        pieceSize?: number;
        priorities?: number[];
        'primary-mime-type'?: string;
        queuePosition?: number;
        rateDownload: number;
        rateUpload?: number;
        recheckProgress?: number;
        secondsDownloading?: number;
        secondsSeeding?: number;
        seedIdleLimit?: number;
        seedIdleMode?: number;
        seedRatioLimit?: number;
        seedRatioMode?: number;
        sequential_download?: boolean;
        sizeWhenDone: number;
        startDate?: number;
        status: number;
        trackers?: {
            announce: string;
            id: number;
            scrape: string;
            sitename: string;
            tier: number;
        }[];
        trackerList?: string;
        trackerStats?: {
            announce: string;
            announceState: number;
            downloadCount: number;
            hasAnnounced: boolean;
            hasScraped: boolean;
            host: string;
            id: number;
            isBackup: boolean;
            lastAnnouncePeerCount: number;
            lastAnnounceResult: string;
            lastAnnounceStartTime: number;
            lastAnnounceSucceeded: boolean;
            lastAnnounceTime: number;
            lastAnnounceTimedOut: boolean;
            lastScrapeResult: string;
            lastScrapeStartTime: number;
            lastScrapeSucceeded: boolean;
            lastScrapeTime: number;
            lastScrapeTimedOut: boolean;
            leecherCount: number;
            nextAnnounceTime: number;
            nextScrapeTime: number;
            scrape: string;
            scrapeState: number;
            seederCount: number;
            sitename: string;
            tier: number;
        }[];
        totalSize?: number;
        torrentFile?: string;
        uploadedEver?: number;
        uploadLimit?: number;
        uploadLimited?: boolean;
        uploadRatio?: number;
        wanted?: number[];
        webseeds?: string[];
        webseedsSendingToUs?: number;
    }[];
};

// Типизация для torrent-start и torrent-stop
type TorrentActionArgs = {
    ids: (number | string)[];
};
type EmptyResponse = {};

// Типизация для torrent-set
type TorrentSetArgs = {
    bandwidthPriority?: number;
    downloadLimit?: number;
    downloadLimited?: boolean;
    'files-unwanted'?: number[];
    'files-wanted'?: number[];
    group?: string;
    honorsSessionLimits?: boolean;
    ids: (number | string)[];
    labels?: string[];
    location?: string;
    'peer-limit'?: number;
    'priority-high'?: number[];
    'priority-low'?: number[];
    'priority-normal'?: number[];
    queuePosition?: number;
    seedIdleLimit?: number;
    seedIdleMode?: number;
    seedRatioLimit?: number;
    seedRatioMode?: number;
    sequential_download?: boolean;
    trackerList?: string;
    uploadLimit?: number;
    uploadLimited?: boolean;
};
type EmptyResponse = {};

// Типизация для torrent-remove
type TorrentRemoveArgs = {
    ids: (number | string)[];
    'delete-local-data'?: boolean;
};
type EmptyResponse = {};
