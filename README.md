# Tryte Buffer [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![Greenkeeper badge](https://badges.greenkeeper.io/IFTT/tryte-buffer.svg)](https://greenkeeper.io/)

[travis-image]: https://travis-ci.org/IFTT/tryte-buffer.svg?branch=master
[travis-url]: https://travis-ci.org/IFTT/tryte-buffer
[npm-image]: https://img.shields.io/npm/v/@iftt/tryte-buffer.svg
[npm-url]: https://npmjs.org/package/@iftt/tryte-buffer
[downloads-image]: https://img.shields.io/npm/dm/@iftt/tryte-buffer.svg
[downloads-url]: https://npmjs.org/package/@iftt/tryte-buffer

## About
Tryte buffers are designed to be language-neutral, platform-neutral, extensible mechanism for serializing structured data to the `tryte` schema used by the IOTA tangle. You define your structure once in JSON and this module will take care of encoding all future object data to `trytes` and back again.

Find the encoding/decoding module [here](https://github.com/iftt/tryte-encode-decode)

## Install
```sh
# npm
npm install --save tryte-buffer

# yarn
yarn add tryte-buffer
```

## Example
```js
// import package
// ES5
const tryteConverter = require('@iftt/tryte-buffer').default;
// ES6
import tryteConverter from '@iftt/tryte-buffer';

const tryteBuffer = new TryteBuffer(addressProtocol);

const testInput   = {
  name: 'Craig O\'Connor',
  aliases: ['CTO', 'Craiggles', 'Goober'],
  id: 76543456,
  phone: '+8005555555',
  phoneType: 'work'
};

let tryteEncoding = tryteBuffer.encode(testInput);
let decodedTrytes = tryteBuffer.decode(tryteEncoding);

// tryteEncoding === '99AAMBFDPCXCVCEAYBLAMBCDBDBDCDFD9C999FMBCCYB999RMBFDPCXCVCVC9DTCGD999LQBCDCDQCTCFD9EI9UWV999XPAVAXAXA9BWAZAZAYAVAYABB9A'
// decodedTrytes === { name: 'Craig O\'Connor', aliases: ['CTO', 'Craiggles', 'Goober'], id: 76543456, phone: '+8005555555', phoneType: 'work' }
```

## Encoding guidelines
You define the protocol using JSON, as this is web friendly and supported by almost every common language in use today. The keys define the name of future input data:
```js
{
  name: ...,
  age: ...,
  height: ...
}
```
The encoding/decoding options are as follows:
```js
{
  type: 'string' | 'int8' | 'uint8' | 'int16' | 'uint16' | 'int32' | 'uint32' | 'bool' | 'date',
  repeat: boolean, // is the data an array?
  enum: array<string | number>, // an array of all possible values
  precision: 2 // this is only for number types and defines how many decimal places you want to keep
}
```

## Example protocol
Although this is not an exhaustive list of possible use cases, it is relatable data.
```js
let addressProtocol = {
  "name": {
    "type": "string"
  },
  "aliases": {
    "type": "string",
    "repeat": true
  },
  "id": {
    "type": "uint32"
  },
  "phone": {
    "type": "string"
  },
  "phoneType": {
    "type": "string",
    "enum": ["mobile", "work", "home"]
  }
}
```

## API

### type Protocol
```js
type Protocol = {
  [string]: { // key
    [string]: any // key is type, enum, repeat, precision, or any user defined variables
  }
}
```

### new TryteBuffer(protocol: Protocol, [tryteLimit: number = 2187])
* tryteLimit: number; `defaults to 2187. If you specify 0 then there is no limit`
* overTryteLimit: boolean;
* lastEncodingSize: number;
* protocol: Protocol;
* [string]: { ['encode' | 'decode']: function }; `the keys with encoding and decoding prepared from the protocol`

### encode(input: ProtocolInput): string
* input: an object containing the same keys and values as described by the protocol submitted on instantiation
* output: encoded trytes

### decode(trytes: string): { [string]: any }
* trytes: a string of encoded trytes
* output: a decoded object with the same keys and values as submitted by the protocol buffer

---

## ISC License (ISC)

Copyright 2019 <IFTT>
Copyright (c) 2004-2010 by Internet Systems Consortium, Inc. ("ISC")
Copyright (c) 1995-2003 by Internet Software Consortium


Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
