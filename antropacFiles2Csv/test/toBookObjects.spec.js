var assert = require("chai").assert;
var _ = require('../src/toBookObjects')

const booksKVs = [[['author', '\'F.Herbert\''], ['title',  '\'Dune\''], ['year', 1970]], 
                  [['author', '\'Flaubert\''], ['ed', '\'Anaya\''], ['title',  '\'Germinal\'']]]
const bookObjects = [{author: '\'F.Herbert\'',  title: '\'Dune\'', year: 1970}, 
                  {author: '\'Flaubert\'', ed: '\'Anaya\'', title: '\'Germinal\''}]
const completedBookObjects = [{author: '\'F.Herbert\'', ed: '',  title: '\'Dune\'', year: 1970}, 
                  {author: '\'Flaubert\'', ed: '\'Anaya\'', title: '\'Germinal\'', year: ''}]
const keysAndBookObjects = {keys: ['author', 'title', 'year', 'ed'],
                            books: completedBookObjects}

describe('toBookObjects library', function () {
  describe('create book objects from book arrays of arrays [[[k,v]]]', function () {
    it('_.tobookObject should convert a book array into a book object', async () => {
      assert.deepEqual(
        _.toBookObject(booksKVs[0]), 
        bookObjects[0])
    })

    it('updatedKeys shoud return a unique list of all keys', async () => {
      assert.deepEqual(
        _.updateKeys(['author', 'title', 'year'],
                      ['author', 'ed', 'title']), 
        ['author', 'title', 'year', 'ed']);
      assert.deepEqual(
        _.updateKeys([],
                    ['author', 'ed', 'title']), 
        ['author', 'ed', 'title']);
    })

    it('getNewKeys shoud return a unique list of new keys', async () => {
      assert.deepEqual(
        _.getNewKeys(['author', 'title', 'year'],
                      ['author', 'ed', 'title']), 
        ['ed']);
      assert.deepEqual(
        _.getNewKeys([],
                      ['author', 'ed', 'title']), 
        ['author', 'ed', 'title']);
    })

    it('getNewKeys shoud return a unique list of new keys', async () => {
      assert.deepEqual(
        _.getAbsentKeys(['author', 'title', 'year'],
                      ['author', 'ed', 'title']), 
        ['year']);
      assert.deepEqual(
        _.getAbsentKeys([],
                      ['author', 'ed', 'title']), 
        []);
    })
    
    it('toBookObjects shoud convert a book arrays of arrays [[[k,v]]] into a book-object array', async () => {
      assert.deepEqual(
        _.toBookObjects(booksKVs), 
        bookObjects)
    })

    it('toKeysAndBooks shoud at the same time create the keys list and update the books with missing keys', async () => {
      assert.deepEqual(
        _.toKeysAndBooks(booksKVs), 
        keysAndBookObjects)
    })
  })
})