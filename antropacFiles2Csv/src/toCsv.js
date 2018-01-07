// INPUT SPACE: [STRING] ex:['author', '\'F.Herbert\'', 'title',  '\'Dune\'']
// OUTPUT SPACE: CSV-STRINGS ex: 'author;title\n\'F.Herbert\';\'Dune\'\n'
const _ = require('ramda')

const invConcat = _.flip(_.concat)

const appendSemiColon = invConcat(';')

// s -> s -> s    ex: 'hola' -> 'lola;me dijo' -> 'lola;me dijo;hola' 
const add2csvReducer = (csv, s) => _.concat(appendSemiColon(csv), s)

// [s] -> s   ex: ['a', 'b', 'c'] -> 'a;b;c\n'
const arr2csv = _.compose(invConcat('\n'), 
                        _.tail, 
                        _.reduce(add2csvReducer, ''))

const mergeCsvs = _.reduce(_.concat, '')

module.exports = {
  appendSemiColon: appendSemiColon,
  add2csv: add2csvReducer,
  arr2csv: arr2csv,
  mergeCsvs: mergeCsvs
}                        
