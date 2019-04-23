// @flow
import { createProtocol } from './createProtocol'

const debug = require('debug')('tryte-buffer')

type Protocol = {
  [string]: {
    [string]: any
  }
}

type ProtocolInput = {
  [string]: any
}

class TryteBuffer {
  tryteLimit: number
  overTryteLimit: boolean
  lastEncodingSize: number
  protocol: Protocol
  // [key: string]: { ['encode' | 'decode']: Function }
  constructor (protocol: Protocol, tryteLimit: number = 2187, multi: boolean = false) {
    debug('TryteBuffer created')
    if (!protocol) { return null }
    // given a protocol JSON file, create a function for each.
    this.tryteLimit = tryteLimit
    this.overTryteLimit = false
    this.lastEncodingSize = 0
    this.protocol = protocol
    createProtocol(this, protocol)
  }

  encode (input: ProtocolInput): string {
    debug('encode')
    let trytes = ''
    for (let key in this.protocol) { trytes += this[key].encode(input[key]) }
    this.lastEncodingSize = trytes.length
    if (this.tryteLimit && trytes.length > this.tryteLimit) { this.overTryteLimit = true } else { this.overTryteLimit = false }
    return trytes
  }

  decode (trytes: string): { [string]: any } {
    debug('decode')
    let obj = {}
    for (let key in this.protocol) {
      let [inc, val] = this[key].decode(trytes)
      trytes = trytes.slice(inc)
      obj[key] = val
    }
    return obj
  }
}

export default TryteBuffer
