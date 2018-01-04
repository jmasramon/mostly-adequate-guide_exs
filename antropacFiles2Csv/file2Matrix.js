const _ = require('ramda')
const fs = require('fs')

const splitDataLines = _.split('\n')

// CREATE CSV FROM ARRAY
  const add2csv = (csv, s) => _.concat(_.concat(csv, ';'), s)
  const invConcat = _.flip(_.concat)

// [s] -> s
const arr2csv = _.compose(invConcat('\n'), 
                          _.tail, 
                          _.reduce(add2csv, ''))

// CREATE BOOKS OBJECT ARRAY
  const splitObjectLine = _.split(': ')

  // (s, [[s]]) -> [[s]]
  const addLine2BookAttributePairsArray = (line, book) => 
                                            _.append(splitObjectLine(line), book)

  // [] -> [o] -> [o] 
  const parseBookLines2bookObjects = (() => {
    let tmpBookAttrPairs = []
    return (bookObjectArray, line) => {
      let newBookObjectArray = _.clone(bookObjectArray)
      line !== '' ? 
        (tmpBookAttrPairs = addLine2BookAttributePairsArray (line, tmpBookAttrPairs)) : 
        (newBookObjectArray = _.append(_.fromPairs(tmpBookAttrPairs), bookObjectArray), tmpBookAttrPairs = [])
      return newBookObjectArray
    }
  })()

const lines2BookObjectArray = _.reduce(parseBookLines2bookObjects, [])
const data2BookObjectArray = _.compose(lines2BookObjectArray, splitDataLines)

// CREATE BOOK TITLE AS CSV FROM BOOKS OBJECT ARRAY
  // [s] -> o -> [s]
  const addNewKeys = (acc, book) => acc.length === 0 ? 
                  _.keys(book) : 
                  _.uniq(_.concat(acc, _.keys(book)))

  // [o] -> [s]
  const getAllKeys = _.reduce(addNewKeys, [])

  // s -> [s]
  const getAllDataKeys = _.compose(getAllKeys, 
                                  data2BookObjectArray)

const createTitle = arr2csv
const createTitle2 = _.compose(arr2csv, getAllDataKeys)

// COMPLETE BOOKS OBJECT ARRAY DATA FROM KEYS SET 
  // [k] -> obj -> obj
  const addMissingKeys = _.curry((keys, obj) => 
    _.reduce((acc, key) => 
      _.merge(acc, _.fromPairs([[key, (obj[key] || '')]])), 
      {}, keys))
  // TODO: this should expect an already made set of keys?
  // s -> obj -> obj
  const addBookMissingKeys = addMissingKeys
  // s -> [obj] -> [obj]
  const addDefaults = (keys) =>_.map(addBookMissingKeys(keys))
  const addDefaults2 = _.map(_.compose(addBookMissingKeys,                                                      getAllKeys))

  const addDefaults2Books = (keys) => _.compose(addDefaults(keys), 
                                                lines2BookObjectArray)
  const addDefaults2Books2 = _.compose(addDefaults2, 
                                      lines2BookObjectArray)

// BOOKS OBJECTS 2 BOOKS CSV LINES
  const pluckContent = _.map(_.values)

  // [s] -> [[s]] 
  const createBooksContents = (keys) => _.compose(pluckContent, 
                                                  addDefaults2Books(keys))
  const createBooksContents2 = _.compose(pluckContent, 
                                        addDefaults2Books2)
  
  // [[s]] -> [s]
  const contents2csvs = _.map(arr2csv)

// s -> s -> [s]
const data2booksCsv = (keys) => _.compose(contents2csvs, 
                                          createBooksContents(keys), 
                                          splitDataLines)

const data2booksCsv2 = _.compose(contents2csvs, 
                                createBooksContents2, 
                                splitDataLines)
                                            
// JOIN TITLE WITH BOOKS CONTENT
  const preapendTitle = _.compose(_.prepend, 
                                  createTitle)
  const preapendTitle2 = _.compose(_.prepend, 
                                  createTitle2)
  
const file2csv = (keys) => _.compose(preapendTitle(keys), 
                                    data2booksCsv(keys))
const file2csv2 = (rawData) => preapendTitle2(rawData)(data2booksCsv2(rawData)) 
const generateCsv = (books, keys) => preapendTitle(keys)(_.compose(contents2csvs, createBooksContents(keys))(books))

//////////////////////////////////////////////////////////////////////////////////

const run = () => {
  const data = fs.readFileSync('./file.txt', 'UTF-8')

  const logger = fs.createWriteStream('./table.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })

  const writeCsv2file = _.forEach(_.unary(logger.write.bind(logger)))

  // const keys = getAllDataKeys(data)
  // writeCsv2file(file2csv(keys)(data))
  // writeCsv2file(file2csv2(data))
  const books = data2BookObjectArray(data)
  const keys = getAllKeys(books)
  const csv = generateCsv(books, keys)
  logger.end()
}

// run()

module.exports = { splitDataLines: splitDataLines,
  add2csv: add2csv,
  invConcat: invConcat,
  arr2csv: arr2csv,
  splitObjectLine: splitObjectLine,
  addLine2BookAttributePairsArray: addLine2BookAttributePairsArray,
  parseBookLines2bookObjects: parseBookLines2bookObjects,
  lines2BookObjectArray: lines2BookObjectArray,
  addNewKeys: addNewKeys,
  getAllKeys: getAllKeys,
  getAllDataKeys: getAllDataKeys,
  createTitle: createTitle,
  createTitle2: createTitle2,
  addMissingKeys: addMissingKeys,
  addBookMissingKeys: addBookMissingKeys,
  addDefaults: addDefaults,
  addDefaults2: addDefaults2,
  addDefaults2Books: addDefaults2Books,
  addDefaults2Books2: addDefaults2Books2,
  pluckContent: pluckContent,
  createBooksContents: createBooksContents,
  createBooksContents2: createBooksContents2,
  contents2csvs: contents2csvs,
  data2booksCsv: data2booksCsv,
  data2booksCsv2: data2booksCsv2,
  preapendTitle: preapendTitle,
  preapendTitle2: preapendTitle2,
  file2csv: file2csv,
  file2csv2: file2csv2,
  run: run
};

