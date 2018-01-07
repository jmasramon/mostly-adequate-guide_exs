// INPUT SPACE: [{book}] ex: [{author: 'F.Herbert', title: 'Dune'}]
// OUTPUT SPACE: csv-string ex: 'author;title\n'
const _ = require('ramda')
const csv = require('./toCsv')

// [k] -> {b} -> [k]
const addNewKeysReducer = (acc, book) => acc.length === 0 ? 
  _.keys(book) : 
  _.uniq(_.concat(acc, _.keys(book)))

// [o] -> [s]
const getAllKeys = _.reduce(addNewKeysReducer, [])

const createKeysTitle = csv.arr2csv
const createBooksTitle = _.compose(csv.arr2csv, getAllKeys)

module.exports = {
  addNewKeys: addNewKeysReducer,
  getAllKeys: getAllKeys,
  createKeysTitle: createKeysTitle,
  createBooksTitle: createBooksTitle
}