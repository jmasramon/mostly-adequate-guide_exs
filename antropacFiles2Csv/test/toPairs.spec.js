var assert = require("chai").assert;
var _ = require('../src/toPairs')

describe('toPairs library', function () {
  it('splitObjectLine should split a key: value string into a key-value pair', async () => {
    assert.deepEqual(
      _.splitKVline('key: value'), 
        ['key', 'value'])
  })
  it('toKVPairs should create an array of KV pairs from an array of KV lines', async () => {
    assert.deepEqual(
      _.toKVPairs(['author: \'F.Herbert\'', 'title: \'Dune\'']), 
        [['author', '\'F.Herbert\''], ['title', '\'Dune\'']])  
  })
  it('addLine2BookAtrtributePairsArray should add a new key-value pair to an array of them', async () => {
    assert.deepEqual(
      // TODO: invert this params order?
      _.add2KVPairs('key: value', [['name', 'jordi']]), 
        [['name', 'jordi'], ['key', 'value']])
  })

})