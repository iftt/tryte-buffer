const test = require('tape');
const TryteBuffer = require('../lib').default;

const addressProtocol = require('./addressProtocol.json');
const garageProtocol  = require('./garageProtocol.json');

test('test encoding and decoding a string by itself', function (t) {
  t.plan(2);

  let protocol = { name: { type: 'string'} };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { name: 'Craig' };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('999JMBFDPCXCVC', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding two string types', function (t) {
  t.plan(2);

  let protocol = { firstName: { type: 'string'}, lastName: { type: 'string'} };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { firstName: 'Craig', lastName: 'O\'Connor' };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('999JMBFDPCXCVC999PYBLAMBCDBDBDCDFD', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding an array of strings', function (t) {
  t.plan(2);

  let protocol = { aliases: { type: 'string', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { aliases: ['Craiggles', 'CTO', 'CraigO'] };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('9C999RMBFDPCXCVCVC9DTCGD999FMBCCYB999LMBFDPCXCVCYB', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding an 8 bit integer and 8 bit integer array', function (t) {
  t.plan(2);

  let protocol = { int: { type: 'int8' }, intArray: { type: 'int8', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { int: 127, intArray: [-128, 0, 127] };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('IL9C99DTIL', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding an 8 bit unsigned integer and 8 bit unsigned integer array', function (t) {
  t.plan(2);

  let protocol = { uint: { type: 'uint8' }, uintArray: { type: 'uint8', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { uint: 255, uintArray: [0, 100, 255] };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('IL9C99CSIL', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding an 16 bit integer and 16 bit integer array', function (t) {
  t.plan(2);

  let protocol = { int: { type: 'int16' }, intArray: { type: 'int16', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { int: 32767, intArray: [-32768, 0, 32767] };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('CHXF9C9999AQYQCHXF', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding an 16 bit unsigned integer and 16 bit unsigned integer array', function (t) {
  t.plan(2);

  let protocol = { uint: { type: 'uint16' }, uintArray: { type: 'uint16', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { uint: 65535, uintArray: [0, 10000, 65535] };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('CHXF9C99999MSJCHXF', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding an 32 bit integer and 32 bit integer array', function (t) {
  t.plan(2);

  let protocol = { int: { type: 'int32' }, intArray: { type: 'int32', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { int: 2147483647, intArray: [-2147483648, 0, 2147483647] };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('KBHSYMU9C9999999ENQWLTKKBHSYMU', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding an 32 bit unsigned integer and 32 bit unsigned integer array', function (t) {
  t.plan(2);

  let protocol = { uint: { type: 'uint32' }, uintArray: { type: 'uint32', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { uint: 4294967295, uintArray: [0, 1000000000, 4294967295] };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('KBHSYMU9C9999999BORRGCAKBHSYMU', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding a bool and bool array', function (t) {
  t.plan(2);

  let protocol = { bool: { type: 'bool' }, boolArray: { type: 'bool', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { bool: true, boolArray: [false, true, false, false] };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('A9D9A99', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding a date and date array', function (t) {
  t.plan(2);

  let protocol = { date: { type: 'date' }, dateArray: { type: 'date', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { date: new Date('2019-03-18T04:39:00.000Z'), dateArray: [new Date('2019-03-18T04:38:00.000Z'), new Date(5000), new Date(2018, 11, 24, 10, 33, 30, 0)] };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('D9F9RH99CD9F9REU999999ECZSKYPL', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding geospatial coordinates and geospatial coordinates array', function (t) {
  t.plan(2);

  let protocol = { geo: { type: 'geo' }, geoArray: { type: 'geo', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { geo: { lat: 52.529562, lon: 13.413047 }, geoArray: [{lat: 52.52956250000001, lon :13.413046874999981}, {lat: 40.71426249999996, lon :-74.005984375}, {lat: 0.0000125, lon :0.000015625}] };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('NPHTQORL9XKP9CNPHTQORL9XKPMLQLUZLW9USFKPQFFFFF9FFF', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify({geo: {lat:52.52956250000001, lon:13.413046874999981}, geoArray:[{lat:52.52956250000001, lon:13.413046874999981}, {lat:40.71426249999996, lon:-74.005984375}, {lat:0.0000125, lon:0.000015625}]}), JSON.stringify(decodedTrytes), 'the decoded object is similar (stores geo as a "square" location) to the original input');
});

test('test encoding and decoding an enum', function (t) {
  t.plan(6);

  let protocol = { phoneType: { enum: ['mobile', 'work', 'home'] } };

  const tryteBuffer = new TryteBuffer(protocol);
  let testInput     = { phoneType: 'mobile' };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('99', tryteEncoding, 'the encoded trytes 1');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input 1');

  testInput     = { phoneType: 'work' };
  tryteEncoding = tryteBuffer.encode(testInput);
  decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('9A', tryteEncoding, 'the encoded trytes 2');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input 2');

  testInput     = { phoneType: 'home' };
  tryteEncoding = tryteBuffer.encode(testInput);
  decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('9B', tryteEncoding, 'the encoded trytes 3');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input 3');
});

test('test encoding and decoding of multiple kinds of arrays', function (t) {
  t.plan(2);

  let protocol = {
    boolArray: { type: 'bool', repeat: true },
    int8Array: { type: 'int8', repeat: true },
    stringArray: { type: 'string', repeat: true },
    dateArray: { type: 'date', repeat: true }
  };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = {
    boolArray: [false, true, false, false],
    int8Array: [0, 1, 2, 3],
    stringArray: ['a', 'b', 'cd', 'efg'],
    dateArray: [new Date(0), new Date(10000), new Date(20000)]
  };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  // '9D 9 A 9 9    9D DT DU DV DW     9D 999B PC 999B QC 999D RC SC 999F TC UC VC    9C 9999999 999999J 999999T'

  t.equal('9D9A999DDTDUDVDW9D999BPC999BQC999DRCSC999FTCUCVC9C9999999999999J999999T', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding using the example address protocol', function (t) {
  t.plan(2);

  const tryteBuffer = new TryteBuffer(addressProtocol);
  const testInput   = {
    name: 'Craig O\'Connor',
    aliases: ['CTO', 'Craiggles', 'Goober'],
    id: 76543456,
    phone: '+8005555555',
    phoneType: 'work',
    location: { lat: 40.7607800, lon: -111.8910500 }
  };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  testInput.location.lat = 40.760787500000006 // how it should get stored
  testInput.location.lon = -111.89104687500001 // how it should get stored

  t.equal('99AAMBFDPCXCVCEAYBLAMBCDBDBDCDFD9C999FMBCCYB999RMBFDPCXCVCVC9DTCGD999LQBCDCDQCTCFD9EI9UWV999VPABBUAUAZAZAZAZAZAZAZA9AMJQOVHKJ9MRM', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding using the example garage protocol', function (t) {
  t.plan(4);

  const tryteBuffer = new TryteBuffer(garageProtocol);
  let testInput     = {
    date: new Date('2019-03-18T04:39:00.000Z'),
    garageDoor: false
  };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('D9F9RH99', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');

  testInput = {
    date: new Date(1000),
    garageDoor: true
  };

  tryteEncoding = tryteBuffer.encode(testInput);
  decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('999999AA', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding with excess inputs', function (t) {
  t.plan(2);

  let protocol = { name: { type: 'string'} };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { name: 'Craig', age: 25, height: 6 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('999JMBFDPCXCVC', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify({ name: 'Craig' }), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding int 8 with precision', function (t) {
  t.plan(2);

  let protocol = { int: { type: 'int8', precision: 1 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { int: 5.5 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('FU', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding int 8 with precision and overflow', function (t) {
  t.plan(2);

  let protocol = { int: { type: 'int8', precision: 1 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { int: 5.55 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('FV', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify({ int: 5.6 }), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding unsigned int 8 with precision', function (t) {
  t.plan(2);

  let protocol = { uint: { type: 'uint8', precision: 1 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { uint: 5.5 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('BA', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding unsigned int 8 with precision with overflow', function (t) {
  t.plan(2);

  let protocol = { uint: { type: 'uint8', precision: 1 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { uint: 5.55 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('BB', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify({ uint: 5.6 }), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding int 16 with precision', function (t) {
  t.plan(2);

  let protocol = { int: { type: 'int16', precision: 2 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { int: 5.55 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('ARSE', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding int 16 with precision and overflow', function (t) {
  t.plan(2);

  let protocol = { int: { type: 'int16', precision: 2 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { int: 5.555 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('ARSF', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify({ int: 5.56 }), JSON.stringify(decodedTrytes), 'the decoded object is the same as the rounded version of the original object');
});

test('test encoding and decoding unsigned int 16 with precision', function (t) {
  t.plan(2);

  let protocol = { uint: { type: 'uint16', precision: 2 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { uint: 5.55 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('99TO', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding unsigned int 16 with precision and overflow', function (t) {
  t.plan(2);

  let protocol = { uint: { type: 'uint16', precision: 2 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { uint: 5.555 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('99TP', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify({ uint: 5.56 }), JSON.stringify(decodedTrytes), 'the decoded object is the same as the rounded version of the original object');
});

test('test encoding and decoding int 32 with precision', function (t) {
  t.plan(2);

  let protocol = { int: { type: 'int32', precision: 4 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { int: 5.5555 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('ENQZGZ9', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding int 32 with precision and overflow', function (t) {
  t.plan(2);

  let protocol = { int: { type: 'int32', precision: 4 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { int: 5.55555 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('ENQZGZA', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify({ int: 5.5556 }), JSON.stringify(decodedTrytes), 'the decoded object is the same as the rounded version of the original object');
});

test('test encoding and decoding unsigned int 32 with precision', function (t) {
  t.plan(2);

  let protocol = { uint: { type: 'uint32', precision: 4 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { uint: 5.5555 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('999BVEP', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify(testInput), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});

test('test encoding and decoding unsigned int 32 with precision and overflow', function (t) {
  t.plan(2);

  let protocol = { uint: { type: 'uint32', precision: 4 } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { uint: 5.55555 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('999BVEQ', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify({ uint: 5.5556 }), JSON.stringify(decodedTrytes), 'the decoded object is the same as the rounded version of the original object');
});

test('test encoding tryte limit', function (t) {
  t.plan(2);

  let protocol = { intArray: { type: 'int32', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol, 10);
  const testInput   = { intArray: [0, 1, 2, 3, 4] };

  let tryteEncoding = tryteBuffer.encode(testInput);

  t.equal(10, tryteBuffer.tryteLimit, 'the tryte limit is properly update upon instantiation');
  t.equal(true, tryteBuffer.overTryteLimit, 'the maximum tryte value is exceeded');
});

test('test last encoding size', function (t) {
  t.plan(2);

  let protocol = { intArray: { type: 'int32', repeat: true } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { intArray: [0, 1, 2, 3, 4] };

  let tryteEncoding = tryteBuffer.encode(testInput);

  t.equal('9EENQWLTKENQWLTLENQWLTMENQWLTNENQWLTO', tryteEncoding, 'the encoded trytes');
  t.equal(37, tryteBuffer.lastEncodingSize, 'the size is recorded correctly');
});

test('test "bad" type', function (t) {
  t.plan(2);

  let protocol = { intArray: { type: 'intint32' } };

  const tryteBuffer = new TryteBuffer(protocol);
  const testInput   = { intArray: 5 };

  let tryteEncoding = tryteBuffer.encode(testInput);
  let decodedTrytes = tryteBuffer.decode(tryteEncoding);

  t.equal('', tryteEncoding, 'the encoded trytes');
  t.equal(JSON.stringify({ intArray: null }), JSON.stringify(decodedTrytes), 'the decoded object is the same as the original input');
});
