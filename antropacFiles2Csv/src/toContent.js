// INPUT SPACE: ([keys], [{book}]) ex: (['author', 'ed', 'title', 'year'], [{author: 'F.Herbert', title: 'Dune', ed: 'Anaya'}, {author: 'Flaubert', title: 'Germinal', year: 1970}])
// OUTPUT SPACE: csv-string ex: 'F.Herbert;Dune;Anaya;\nFlabert;Germinal;;1970\n'
const _ = require('ramda')
const csv = require('./toCsv')

// [k] -> obj -> obj
// ex: ['author', 'ed', 'title', 'year'] -> {author: 'F.Herbert', title: 'Dune', ed: 'Anaya'} 
//    -> {author: 'F.Herbert', title: 'Dune', ed: 'Anaya', year: ''}
const addMissingKeys = _.curry((keys, obj) => {
  if (!keys.length) return obj
  return _.reduce((acc, key) => 
    _.merge(acc, _.fromPairs([[key, (obj[key] || '')]])), 
    {}, keys)
})
// [s] -> [obj] -> [obj]
// ex: ['author', 'ed', 'title', 'year'] -> 
//    [{author: 'F.Herbert', title: 'Dune', ed: 'Anaya'}, {author: 'Flaubert', title: 'Germinal', year: 1970}]
//    -> [{author: 'F.Herbert', title: 'Dune', ed: 'Anaya', year: ''}, {author: 'Flaubert', title: 'Germinal', ed: '', year: 1970}]
const addDefaults = (keys) =>_.map(addMissingKeys(keys))

const asureString = (e) => ((typeof e) === 'String') ? e : e.toString()

const all2Strings = _.map(asureString)

// [{book}] -> [[s]]
// ex: [{author: 'F.Herbert', title: 'Dune', ed: 'Anaya'}, {author: 'Flaubert', title: 'Germinal', year: 1970}] 
//      -> [['F.Herbert','Dune','Anaya'],['Flabert','Germinal','1970']]
const pluckContent = _.map(_.compose(all2Strings, _.values))

// [s] -> [[s]] 
// ex: ['author', 'ed', 'title', 'year'] -> 
//    [{author: 'F.Herbert', title: 'Dune', ed: 'Anaya'}, {author: 'Flaubert', title: 'Germinal', year: 1970}]
//    -> [['F.Herbert','Dune','Anaya', ''],['Flabert','Germinal','','1970']]
const createBooksContents = (keys) => _.compose(pluckContent, 
                                                addDefaults(keys))

const createCompleteBooksContent = pluckContent

// [[s]] -> [s]
const contents2csvs = _.map(csv.arr2csv)

// s -> s -> [s]
const data2booksCsvs = (keys) => _.compose(contents2csvs, 
                                        createBooksContents(keys))

const data2BooksCsvs = _.compose(contents2csvs, 
                                createCompleteBooksContent)

const books2Csv = (keys) => _.compose(csv.mergeCsvs, data2booksCsvs(keys))

const keysAndBooks2Csv = _.compose(csv.mergeCsvs, data2BooksCsvs)

module.exports = {
  addMissingKeys: addMissingKeys,
  addDefaults: addDefaults,
  pluckContent: pluckContent,
  createBooksContents: createBooksContents,
  bContents2csvs: contents2csvs,
  books2Csvs: data2booksCsvs,
  books2Csv: books2Csv,
  keysAndBooks2Csv: keysAndBooks2Csv
}