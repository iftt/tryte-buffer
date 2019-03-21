// @flow
import { createProtocol } from './createProtocol';

type Protocol = {
  [string]: {
    [string]: any
  }
};

type ProtocolInput = {
  [string]: any
}

class TryteBuffer {
  tryteLimit: number;
  protocol: Protocol;
  [string]: function; // the encoding and decoding prepared from the protocol
  constructor(protocol: Protocol, tryteLimit: number = 2187) {
    if (!protocol)
      return null;
    // given a protocol JSON file, create a function for each.
    this.tryteLimit = tryteLimit;
    this.protocol = protocol;
    createProtocol(this, protocol);
  }

  encode(input: ProtocolInput) {
    let trytes = '';
    for (let key in this.protocol) {
      trytes += this[key].encode(input[key]);
    }
    return trytes;
  }

  decode(trytes: string) {
    let obj = {};
    for (let key in this.protocol) {
      let [inc, val] = this[key].decode(trytes);
      trytes = trytes.slice(inc);
      obj[key] = val;
    }
    return obj;
  }
}

export default TryteBuffer;
