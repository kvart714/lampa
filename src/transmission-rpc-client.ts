class TransmissionRpcClient {
    constructor(
        private url: string,
        private login: string,
        private password: string,
        private sessionId?: string | null) { }

    private async fetchRpc<T, U>(
        request: RpcRequest<T>
    ): Promise<RpcResponse<U>> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(this.login + ':' + this.password)}`,
                'Content-Type': 'application/json',
                'X-Transmission-Session-Id': this.sessionId || '',
            },
            body: JSON.stringify(request),
        });

        if (response.status === 409) {
            this.sessionId = response.headers.get('X-Transmission-Session-Id');
            return this.fetchRpc(request);
        }

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return response.json();
    }

    public getSession(): Promise<RpcResponse<SessionGetResponse>> {
        const request: RpcRequest<SessionGetArgs> = {
            method: 'session-get',
        };
        return this.fetchRpc(request);
    }

    public addTorrent(
        args: TorrentAddArgs
    ): Promise<RpcResponse<TorrentAddResponse>> {
        const request: RpcRequest<TorrentAddArgs> = {
            method: 'torrent-add',
            arguments: args,
        };
        return this.fetchRpc(request);
    }

    public getTorrents(
        args: TorrentGetArgs
    ): Promise<RpcResponse<TorrentGetResponse>> {
        const request: RpcRequest<TorrentGetArgs> = {
            method: 'torrent-get',
            arguments: args,
        };
        return this.fetchRpc(request);
    }

    public startTorrent(
        args: TorrentActionArgs
    ): Promise<RpcResponse<EmptyResponse>> {
        const request: RpcRequest<TorrentActionArgs> = {
            method: 'torrent-start',
            arguments: args,
        };
        return this.fetchRpc(request);
    }

    public stopTorrent(
        args: TorrentActionArgs
    ): Promise<RpcResponse<EmptyResponse>> {
        const request: RpcRequest<TorrentActionArgs> = {
            method: 'torrent-stop',
            arguments: args,
        };
        return this.fetchRpc(request);
    }

    public setTorrent(args: TorrentSetArgs): Promise<RpcResponse<EmptyResponse>> {
        const request: RpcRequest<TorrentSetArgs> = {
          method: 'torrent-set',
          arguments: args,
        };
        return this.fetchRpc(request);
      }
}
