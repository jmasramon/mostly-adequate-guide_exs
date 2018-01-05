// INPUT SPACE: [[s]] ex:[['author', '\'F.Herbert\''], ['title',  '\'Dune\''], []]
// OUTPUT SPACE: [[[k, v]]] ex: [[["author","'F.Herbert'"],["title","'Dune'"]],[["author","'Flaubert'"]["title","'Germinal'"  ]]]
const _ = require('ramda')

// [[k, v]] -> {k: v} 
const toObj = _.fromPairs

const emptyKVPair = kvPair => (kvPair.length < 2)
const nonEmptyKVPair = _.compose(_.not, emptyKVPair)

// [[k, v]] -> [k, v] -> [[k, v]]
// ex: ex: [['author', '\'F.Herbert\'']] -> ['title',  '\'Dune\''] -> [['author', '\'F.Herbert\''], ['title',  '\'Dune\'']]
const appendToKVPairs = (kvPairs, kvPair) => 
  nonEmptyKVPair(kvPair) ? _.append(kvPair, kvPairs) : kvPairs

// [[[k, v]] -> [[k, v]] -> [[k, v]]
// ex: ex: [[['author', '\'F.Herbert\'']]] -> [['author', '\'F.Herbert\''], ['title',  '\'Dune\'']] -> [['author', '\'F.Herbert\''], ['title',  '\'Dune\'']]
const updateLastBook = (books, newLastBook) => 
  _.tail(books).length ? 
    _.append(newLastBook, _.init(books)) : 
    [newLastBook]

// [[k, v]] -> {} 
//  ex: [['author', '\'F.Herbert\''], ['title',  '\'Dune\'']] -> 
//    [[[author, 'F.Herbert'], [title, 'Dune']]]
const toKVBooks = _.compose(_.init, _.reduce(
  (acc, kvPair) => {
    let curBook = _.last(acc)
    let newBook = appendToKVPairs(curBook, kvPair)
    let newBooks = updateLastBook(acc, newBook)

    return emptyKVPair(kvPair) ? 
      _.append([], newBooks) : 
      newBooks
  },
  [[]]))


module.exports = {
  emptyKVPair: emptyKVPair,
  nonEmptyKVPair: nonEmptyKVPair,
  appendToKVPairs: appendToKVPairs,
  updateLastBook: updateLastBook,
  toBook: toObj,
  toKVBooks: toKVBooks
}