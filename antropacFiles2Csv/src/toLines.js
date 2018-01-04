// INPUT SPACE: FILE DATA ex:'author: \'F.Herbert\\ntitle: \'Dune\'\n\n''
// OUTPUT SPACE: KV-LINES ex: ['author: \'F.Herbert\'', 'title: \'Dune\'']
const _ = require('ramda')

const splitLines = _.split('\n')

module.exports = {
  splitDataLines: splitLines
} 