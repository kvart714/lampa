interface Android {
    openPlayer(url: string, data: any): void;
    httpReq(params: any, options: any): void;
    openYoutube(id: string): void;
    openTorrent(server: string): void;
    playHash(server: string): void;
    exit(): void;
    voiceStart(): void;
    init(): void;
}

declare var Android: Android;