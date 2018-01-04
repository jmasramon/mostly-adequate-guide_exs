// INPUT SPACE: KV-LINES ex:'author: \'F.Herbert\''
// OUTPUT SPACE: KV-PAIRS ex: ['author', 'F.Herbert']
const _ = require('ramda')

const splitKVline = _.split(': ')

// ex: ['author: \'F.Herbert\'', 'title: \'Dune\''] -> 
//  [['author', '\'F.Herbert\''], ['title', '\'Dune\'']]
const toKVPairs = _.map(splitKVline)

// (s, [[s]]) -> [[s]]   
//  ex: 'title: \'Dune\'' -> 
//  [['author', 'F.Herbert']] -> 
//  [['author', 'F.Herbert'], ['title', 'Dune']]
const add2KVPairs = (line, book) => 
  _.append(splitKVline(line), book)


module.exports = {
  splitKVline: splitKVline,
  toKVPairs: toKVPairs,
  add2KVPairs: add2KVPairs
}