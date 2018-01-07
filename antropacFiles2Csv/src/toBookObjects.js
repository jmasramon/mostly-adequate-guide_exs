// INPUT SPACE: [[[k,v]]] ex:[[['author', '\'F.Herbert\''], ['title',  '\'Dune\'']], []]
// OUTPUT SPACE: [{book}] ex: [{author: 'F.Herbert', title: 'Dune'}]
const _ = require('ramda')
const tt = require('./toTitle')
const tc = require('./toContent')

// [[k,v]] -> {k: v, ...}
// ex: [['author', '\'F.Herbert\''], ['title',  '\'Dune\'']] 
//  -> {author: 'F.Herbert', title: 'Dune'}
const toBookObject = _.fromPairs

// [k] -> [k] -> [k]
// ex: ['author', 'title', 'year'] -> 
//    ['author', 'ed', 'title'] -> 
//    ['author', 'ed', 'title', 'year']
const updateKeys = _.compose(_.uniq, _.concat)

// [k] -> [k] -> [k]
// ex: ['author', 'title', 'year'] -> 
//    ['author', 'ed', 'title'] -> 
//    ['ed']
const getNewKeys = _.without

// [k] -> [k] -> [k]
// ex: ['author', 'title', 'year'] -> 
//    ['author', 'ed', 'title'] -> 
//    ['year']
const getAbsentKeys = _.flip(_.without)

const toBookObjects = _.map(toBookObject)

const toKeysAndBooksReducer = (acc, bookKVPairs) => {
  const newBook = toBookObject(bookKVPairs)
  const newKeys = updateKeys(acc.keys, _.keys(newBook))
  const newBooks = _.concat(tc.addDefaults(newKeys)(acc.books), 
                            tc.addDefaults(newKeys)([newBook]))
  return {keys: newKeys, books: newBooks}
}

const toKeysAndBooks = _.reduce(toKeysAndBooksReducer, {keys: [], books: []})

module.exports = {
  toBookObject: toBookObject,
  toBookObjects: toBookObjects,
  updateKeys: updateKeys,
  getNewKeys: getNewKeys,
  getAbsentKeys: getAbsentKeys,
  toKeysAndBooks: toKeysAndBooks
}