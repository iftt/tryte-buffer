// @flow
import TryteBuffer from './'
import tryteConverter, { typesizes } from '@iftt/tryte-encode-decode'

export type Protocol = {
  [string]: {
    [string]: any
  }
};

// export type TypeSizes = {
//   int8: number,
//   uint8: number,
//   int16: number,
//   uint16: number,
//   int32: number,
//   uint32: number,
//   bool: number,
//   date: number,
//   geo: number
// };

export function createProtocol (tryteBuffer: TryteBuffer, protocol: Protocol) {
  for (let key in protocol) {
    if (protocol[key].repeat) {
      // convert an array
      tryteBuffer[key] = {
        encode: (arr: Array<any>): string => { return tryteConverter.arrayToTrytes(arr, protocol[key].type) },
        decode: (trytes: string): Array<any> => {
          let array = tryteConverter.trytesToArray(trytes, protocol[key].type)
          let arraySize = 2;
          (protocol[key].type === 'string')
            ? array.forEach(str => { arraySize += (str.length * 2) + 4 })
            : arraySize += typesizes[protocol[key].type] * array.length
          return [arraySize, array]
        }
      }
    } else if (protocol[key].enum) {
      tryteBuffer[key] = {
        encode: (val: string | number): string => {
          let index = protocol[key].enum.indexOf(val)
          if (index < 0) { index = 0 }
          return tryteConverter.uInt8ToTrytes(index)
        },
        decode: (trytes: string): string | number => {
          let index = tryteConverter.trytesToUInt(trytes.slice(0, 2))
          return [typesizes.uint8, protocol[key].enum[index]]
        }
      }
    } else {
      // standard value
      switch (protocol[key].type) {
        case 'string':
          tryteBuffer[key] = {
            encode: (str: string): string => {
              let trytes = tryteConverter.stringToTrytes(str) // first convert incase it is not a string
              return tryteConverter.uInt16ToTrytes(trytes.length) + trytes
            },
            decode: (trytes: string): string => {
              let stringSize = tryteConverter.trytesToUInt(trytes.slice(0, 4))
              return [stringSize + typesizes.uint16, tryteConverter.trytesToString(trytes.slice(4, stringSize + 4))]
            }
          }
          break
        case 'int8':
          tryteBuffer[key] = {
            encode: (int: number): string => {
              if (protocol[key].precision) { int *= Math.pow(10, protocol[key].precision) }
              return tryteConverter.int8ToTrytes(Math.round(int))
            },
            decode: (trytes: string): number => {
              let decoder = (protocol[key].precision)
                ? tryteConverter.trytesToInt8(trytes.slice(0, 2)) / Math.pow(10, protocol[key].precision)
                : tryteConverter.trytesToInt8(trytes.slice(0, 2))
              return [typesizes.int8, decoder]
            }
          }
          break
        case 'uint8':
          tryteBuffer[key] = {
            encode: (uint: number): string => {
              if (protocol[key].precision) { uint *= Math.pow(10, protocol[key].precision) }
              return tryteConverter.uInt8ToTrytes(Math.round(uint))
            },
            decode: (trytes: string): number => {
              let decoder = (protocol[key].precision)
                ? tryteConverter.trytesToUInt(trytes.slice(0, 2)) / Math.pow(10, protocol[key].precision)
                : tryteConverter.trytesToUInt(trytes.slice(0, 2))
              return [typesizes.uint8, decoder]
            }
          }
          break
        case 'int16':
          tryteBuffer[key] = {
            encode: (int: number): string => {
              if (protocol[key].precision) { int *= Math.pow(10, protocol[key].precision) }
              return tryteConverter.int16ToTrytes(Math.round(int))
            },
            decode: (trytes: string): number => {
              let decoder = (protocol[key].precision)
                ? tryteConverter.trytesToInt16(trytes.slice(0, 4)) / Math.pow(10, protocol[key].precision)
                : tryteConverter.trytesToInt16(trytes.slice(0, 4))
              return [typesizes.int16, decoder]
            }
          }
          break
        case 'uint16':
          tryteBuffer[key] = {
            encode: (uint: number): string => {
              if (protocol[key].precision) { uint *= Math.pow(10, protocol[key].precision) }
              return tryteConverter.uInt16ToTrytes(Math.round(uint))
            },
            decode: (trytes: string): number => {
              let decoder = (protocol[key].precision)
                ? tryteConverter.trytesToUInt(trytes.slice(0, 4)) / Math.pow(10, protocol[key].precision)
                : tryteConverter.trytesToUInt(trytes.slice(0, 4))
              return [typesizes.uint16, decoder]
            }
          }
          break
        case 'int32':
          tryteBuffer[key] = {
            encode: (int: number): string => {
              if (protocol[key].precision) { int *= Math.pow(10, protocol[key].precision) }
              return tryteConverter.int32ToTrytes(Math.round(int))
            },
            decode: (trytes: string): number => {
              let decoder = (protocol[key].precision)
                ? tryteConverter.trytesToInt32(trytes.slice(0, 7)) / Math.pow(10, protocol[key].precision)
                : tryteConverter.trytesToInt32(trytes.slice(0, 7))
              return [typesizes.int32, decoder]
            }
          }
          break
        case 'uint32':
          tryteBuffer[key] = {
            encode: (uint: number): string => {
              if (protocol[key].precision) { uint *= Math.pow(10, protocol[key].precision) }
              return tryteConverter.uInt32ToTrytes(Math.round(uint))
            },
            decode: (trytes: string): number => {
              let decoder = (protocol[key].precision)
                ? tryteConverter.trytesToUInt(trytes.slice(0, 7)) / Math.pow(10, protocol[key].precision)
                : tryteConverter.trytesToUInt(trytes.slice(0, 7))
              return [typesizes.uint32, decoder]
            }
          }
          break
        case 'bool':
          tryteBuffer[key] = {
            encode: (value: bool): string => { return tryteConverter.booleanToTryte(value) },
            decode: (trytes: string): bool => { return [typesizes.bool, tryteConverter.tryteToBoolean(trytes.slice(0, 1))] }
          }
          break
        case 'date':
          tryteBuffer[key] = {
            encode: (value: Date): string => { return tryteConverter.dateToTrytes(value) },
            decode: (trytes: string): Date => { return [typesizes.date, tryteConverter.trytesToDate(trytes.slice(0, 7))] }
          }
          break
        case 'geo':
          tryteBuffer[key] = {
            encode: (value: { lat: number, lon: number }): string => { return tryteConverter.geoToTrytes(value) },
            decode: (trytes: string): { lat: number, lon: number } => { return [typesizes.geo, tryteConverter.trytesToGeo(trytes.slice(0, 12))] }
          }
          break
        default:
          tryteBuffer[key] = {
            encode: (): string => { return '' },
            decode: (): null => { return [0, null] }
          }
      }
    }
  }
}

export default { createProtocol }
