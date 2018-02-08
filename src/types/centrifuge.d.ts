// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
//
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

type TCentrifugeTransport =
    'websocket' | 'xdr-streaming' | 'xhr-streaming' | 'eventsource' | 'iframe-eventsource' | 'iframe-htmlfile' |
    'xdr-polling' | 'xhr-polling' | 'iframe-xhr-polling' | 'jsonp-polling';

type TConnectionTransport =
    'ajax' | 'jsonp';

interface ICentrifugeOptions {
    url: string;
    user: string;
    timestamp: string;
    token: string;

    info?: string;
    transports?: TCentrifugeTransport[];
    debug?: boolean;
    insecure?: boolean;
    retry?: number;
    maxRetry?: number;
    resubscribe?: boolean;
    server?: any

    authEndpoint?: string;
    authHeaders?: { [header: string]: string };
    authParams?: { [param: string]: string };
    authTransport?: TConnectionTransport;

    refreshEndpoint?: string;
    refreshHeaders?: { [header: string]: string };
    refreshParams?: { [param: string]: string };
    refreshTransport?: TConnectionTransport;
    refreshAttempts?: number;
    refreshFailed?: (e: any) => void;
}

interface ISubscriptionMessage<T> {
    uid: string;
    channel: string;
    data: T;
    client?: string;
    info?: {
        user: string;
        client: string;
        default_info: { [key: string]: string };
        channel_info: { [key: string]: string };
    }
}

interface ISubscriptionMessageHandler<T> {
    (message: ISubscriptionMessage<T>): void;
}

interface ISubscriptionPresenceHandler {
    (message: {
        channel: string;
        data: {
            user: string;
            client: string;
            default_info: { [key: string]: string };
            channel_info: { [key: string]: string };
        }
    }): void;
}

interface ISubscriptionSubscribeHandler {
    (message: {
        channel: string;
        isResubscribe: boolean;
    }): void;
}

interface ISubscriptionErrorHandler {
    (message: {
        error: string;
        advice: string;
        channel: string;
        isResubscribe: boolean;
    }): void;
}

interface ISubscriptionUnsubscribeHandler {
    (message: {
        channel: string;
    }): void;
}

interface ICentrifugeCallbacks<T> {
    message?: ISubscriptionMessageHandler<T>;
    join?: ISubscriptionPresenceHandler;
    leave?: ISubscriptionPresenceHandler;
    subscribe?: ISubscriptionSubscribeHandler;
    error?: ISubscriptionErrorHandler;
    unsubscribe?: ISubscriptionUnsubscribeHandler;
}

interface IThenable<T, E> {
    then<T, E>(resultHandler: (result: T) => void, errorHandler: (error: E) => void): void;
}

interface IPresenceData {
    channel: string;
    data: {
        [channel: string]: {
            user: string;
            client: string;
            default_info: { [key: string]: string }
        };
    };
}

interface IPresenceError {
    error: 'timeout',
    advice: 'retry'
}

interface IHistoryData<T> {
    channel: string;
    data: ISubscriptionMessage<T>[];
}

interface ISubscription {
    presence(): IThenable<IPresenceData, IPresenceError>;
    history<T>(): IThenable<IHistoryData<T>, IPresenceError>;
    publish(data: { [key: string]: any }): IThenable<null, IPresenceError>;
    unsubscribe(): void;
    ready(successHandler: ISubscriptionSubscribeHandler, errorHandler?: ISubscriptionErrorHandler): void;

    on<T>(event: 'message', callback?: ISubscriptionMessageHandler<T>): void;
    on(event: 'join', callback?: ISubscriptionPresenceHandler): void;
    on(event: 'leave', callback?: ISubscriptionPresenceHandler): void;
    on(event: 'subscribe', callback?: ISubscriptionSubscribeHandler): void;
    on(event: 'error', callback?: ISubscriptionErrorHandler): void;
    on(event: 'unsubscribe', callback?: ISubscriptionUnsubscribeHandler): void;
}

interface ICentrifuge {
    connect(): void;
    disconnect(): void;
    subscribe<T>(channel: string, callback: ISubscriptionMessageHandler<T>, callbacks?: ICentrifugeCallbacks<T>): ISubscription;
    startBatching(): void;
    flush(): void;
    stopBatching(flush?: boolean): void;

    on(event: 'connect', callback: (context?: { client: string, transport: TCentrifugeTransport, latency: number }) => void): void;
    on(event: 'disconnect', callback: (context?: { reason: string, reconnect: boolean }) => void): void;
    on(event: 'error', callback: (error?: { message: { method: string, error: string, advice: string } }) => void): void;
}

declare module 'centrifuge' {

    export = Centrifuge;

    const Centrifuge: {
        new(options: ICentrifugeOptions): ICentrifuge;
    }
}