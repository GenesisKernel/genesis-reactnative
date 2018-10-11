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

import * as Long from 'long';

export enum CRC64Type {
    ECMA182 = '0xC96C5795D7870F42',
    ISO3309 = '0xD800000000000000'
}

const LONG_255 = Long.fromInt(0xff);

const makeTable = (poly: Long) => {
    let crcTable = [];
    let crc;
    for (let i = 0; i < 256; i++) {
        crc = Long.fromInt(i, true);
        for (let j = 0; j < 8; j++) {
            if (crc.and(Long.ONE).eq(Long.ONE)) {
                crc = crc.shiftRightUnsigned(1);
                crc = crc.xor(poly);
            }
            else {
                crc = crc.shiftRightUnsigned(1);
            }
        }
        crcTable[i] = crc;
    }
    return crcTable;
};

const makeCRC = function (table: Long[], value: number[]) {
    var crc = Long.MAX_UNSIGNED_VALUE;
    for (let i = 0; i < value.length; i++) {
        const lookup = table[crc.xor(value[i]).and(LONG_255).toString()];
        crc = crc.shiftRightUnsigned(8).xor(lookup);
    }
    return crc.xor(Long.MAX_UNSIGNED_VALUE);
};

const _CRC64_TABLE = makeTable(Long.fromString(CRC64Type.ECMA182, false, 16));

export default (input: number[]) =>
    makeCRC(_CRC64_TABLE, input).toString(10);
