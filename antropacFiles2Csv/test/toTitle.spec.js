var assert = require("chai").assert;
var _ = require('../src/toTitle')

const keys = ['author', 'ed', 'title', 'year']

describe('toTitle functions', function () {
  it('addNewKeys should add a books keys to a list of keys', async () => {
    assert.deepEqual(
      _.addNewKeys(['key'], {key: 'value', key2: 'value2', key3: 'value2'}), 
      ['key', 'key2', 'key3'])
  })
  it('getAllKeys should get all keys from a book-object array', async () => {
    assert.deepEqual(
      _.getAllKeys([{ author: '\'F.Herbert\'', ed: '\'Anaya\'', title: '\'Dune\''}, { author: '\'Flaubert\'', title: '\'Germinal\'', year: 1970}]).sort(), 
      keys)
  })
  it('createTitle should create the csv title line from lines array', async () => {
    assert.deepEqual(
      _.createKeysTitle(keys), 
      'author;ed;title;year\n')
  })
  it('getAllDataKeys should get all books keys from lines array', async () => {
    assert.deepEqual(
      _.createBooksTitle([{author: 'F.Herbert', title: 'Dune', ed: 'Anaya'}, {author: 'Flaubert', title: 'Germinal', year: 1970}]), 
      'author;title;ed;year\n')
  })
})