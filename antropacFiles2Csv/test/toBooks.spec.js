var assert = require("chai").assert;
var _ = require('../src/toBooks')

describe('toBooks library', function () {
  describe('create books from KV pairs', function () {
    it('toObjs should convert ', async () => {
      assert.deepEqual(
        _.toBook([['author', '\'F.Herbert\''], ['title',  '\'Dune\'']]), 
        {author: '\'F.Herbert\'', title: '\'Dune\''})
      })
    it('emtpyKVPair should recognize non empty KV pairs', async () => {
      assert.equal(
        _.emptyKVPair(['k', 'v']), false);
        assert.equal(
          _.emptyKVPair([]), true);
      })
    it('nonEmtpyKVPair should recognize non empty KV pairs', async () => {
      assert.equal(
        _.nonEmptyKVPair(['k', 'v']), true);
        assert.equal(
          _.nonEmptyKVPair([]), false);
      })
    it('appendToKVPairs shoud add a non empty KV pair to a list of KV pairs', async () => {
      assert.deepEqual(
        _.appendToKVPairs([['author', '\'F.Herbert\'']], ['title',  '\'Dune\'']), 
        [['author', '\'F.Herbert\''], ['title',  '\'Dune\'']]);
        assert.deepEqual(
          _.appendToKVPairs([['author', '\'F.Herbert\'']], []), 
          [['author', '\'F.Herbert\'']])
      })
    it('updateLastBook should update the last book', async () => {
      assert.deepEqual(
        _.updateLastBook([[['author', '\'F.Herbert\'']]], [['author', '\'F.Herbert\''], ['title',  '\'Dune\'']]),
        [[['author', '\'F.Herbert\''], ['title',  '\'Dune\'']]])
      assert.deepEqual(
        _.updateLastBook([[]], [['author', '\'F.Herbert\''], ['title',  '\'Dune\'']]),
        [[['author', '\'F.Herbert\''], ['title',  '\'Dune\'']]])
      assert.deepEqual(
        _.updateLastBook([[['author', '\'F.Herbert\''], ['title',  '\'Dune\'']],[]], [['author2', '\'F.Herbert2\''], ['title2',  '\'Dune2\'']]),
        [[['author', '\'F.Herbert\''], ['title',  '\'Dune\'']], [['author2', '\'F.Herbert2\''], ['title2',  '\'Dune2\'']]])
        // [])
      })
    it('toKVBooks should group al KV pairs from a book together', async () => {
      assert.deepEqual(
        _.toKVBooks([['author', '\'F.Herbert\''], ['title',  '\'Dune\''], [], ['author', '\'Flaubert\''], ['title',  '\'Germinal\''], []]), 
        [[[
            "author",
            "'F.Herbert'"
          ],
          [
            "title",
            "'Dune'"
          ]
        ],[[
            "author",
            "'Flaubert'"
          ],
          [
            "title",
            "'Germinal'"
          ]]])
      })
  })    
})