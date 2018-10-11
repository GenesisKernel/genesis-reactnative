// MIT License
//
// Copyright (c) 2016-2018 GenesisKernel
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as msgpack from 'msgpack-lite';
import * as convert from '../convert';
import { Int64BE } from 'int64-buffer';
import { privateToPublic, address, sign, Sha256 } from '../crypto';
import { encodeLengthPlusData, concatBuffer } from '../convert';
import { ISchema } from '../schema';
import IField from '../contract/field';

export interface IContractContext {
    id: number;
    schema: ISchema;
    ecosystemID: number;
    fields: {
        [name: string]: IContractParam;
    };
}

export interface IContractParam {
    type: string;
    value: object;
}

export default class Contract {
    private _context: IContractContext;
    private _keyID: Int64BE;
    private _time: number;
    private _publicKey: ArrayBuffer;
    private _fields: {
        [name: string]: IField;
    } = {};

    constructor(context: IContractContext) {
        this._context = context;
        this._time = Math.floor((new Date()).getTime() / 1000);
        Object.keys(context.fields).forEach(name => {
            const param = context.fields[name];
            const Field = this._context.schema.fields[param.type];
            const field = new Field();
            field.set(param.value);
            this._fields[name] = field;
        });
    }

    async sign(privateKey: string) {
        const publicKey = privateToPublic(privateKey);
        this._publicKey = convert.toArrayBuffer(publicKey);
        this._keyID = new Int64BE(address(publicKey));

        const data = this.serialize();
        const txHash = await Sha256(data);
        const resultHash = await Sha256(txHash);
        const hexHash = await convert.toHex(resultHash);
        const signature = convert.toArrayBuffer(sign(hexHash, privateKey));

        return {
            hash: hexHash,
            data: concatBuffer(
                this._context.schema.header,
                concatBuffer(
                    encodeLengthPlusData(data),
                    encodeLengthPlusData(signature)
                )
            )
        };
    }

    serialize() {
        const params: { [name: string]: object } = {};
        const codec = msgpack.createCodec({
            binarraybuffer: true,
            preset: true
        });

        Object.keys(this._fields).forEach(name => {
            params[name] = this._fields[name].get();
        });

        const txBuffer = msgpack.encode(
            {
                Header: {
                    ID: this._context.id,
                    Time: this._time,
                    EcosystemID: this._context.ecosystemID,
                    KeyID: this._keyID,
                    NetworkID: this._context.schema.network,
                    PublicKey: this._publicKey
                },
                Params: params
            },
            {
                codec
            }
        );

        return txBuffer;
    }
}
