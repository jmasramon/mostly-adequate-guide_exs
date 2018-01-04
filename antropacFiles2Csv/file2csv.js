// INPUT SPACE: ([keys], [{book}]) ex: (['author', 'ed', 'title', 'year'], [{author: 'F.Herbert', title: 'Dune', ed: 'Anaya'}, {author: 'Flaubert', title: 'Germinal', year: 1970}])
// OUTPUT SPACE: csv-string ex: 'F.Herbert;Dune;Anaya;\nFlabert;Germinal;;1970\n'
const fs = require('fs')
const _ = require('ramda')
const tl = require('./src/toLines')
const tp = require('./src/toPairs')
const tb = require('./src/toBooks')
const tbo = require('./src/toBookObjects')
const tt = require('./src/toTitle')
const tc = require('./src/toContent')
const lf = require('ramda-fantasy')

const logger = fs.createWriteStream('./table.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})

const writeCsv2file = _.forEach(_.unary(logger.write.bind(logger)))

const data = fs.readFileSync('./file.txt', 'UTF-8')

// Functional processing, normal io

// const keysAndBooks = _.compose(tbo.toKeysAndBooks, 
//                               tb.toKVBooks, 
//                               tp.toKVPairs,
//                               tl.splitDataLines)(data)
// const matrix = _.concat(tt.createKeysTitle(keysAndBooks.keys), 
//                         tc.keysAndBooks2Csv(keysAndBooks.books))
// logger.write(matrix)

// Full functional
const ioLog = data => lf.IO(() => console.log(data));
const log = (data) => {
  console.log(data)
  return data
}
const csvTable = (keysAndBooks) => _.concat(tt.createKeysTitle(keysAndBooks.keys), 
                                              tc.keysAndBooks2Csv(keysAndBooks.books))
lf.IO(() => 
    fs.readFileSync('./file.txt', 'utf8'))
  .map(_.pipe(tl.splitDataLines,
              tp.toKVPairs,
              tb.toKVBooks, 
              tbo.toKeysAndBooks))
  .map(csvTable)
  // .chain(ioLog)
  // .map(log)
  .chain(data => lf.IO(() => writeCsv2file([data])))
  .runIO()

logger.end()
