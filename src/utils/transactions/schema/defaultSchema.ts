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

import { ISchema } from './';
import Boolean from '../contract/field/boolean';
import Integer from '../contract/field/integer';
import Float from '../contract/field/float';
import Money from '../contract/field/money';
import String from '../contract/field/string';
import File from '../contract/field/file';
import StringCollection from '../contract/field/stringCollection';

const defaultSchema: ISchema = {
    header: new Uint8Array([0x80]),
    network: 1,
    fields: {
        'bool': Boolean,
        'int': Integer,
        'float': Float,
        'money': Money,
        'string': String,
        'file': File,
        'array': StringCollection,
    }
};

export default defaultSchema;
