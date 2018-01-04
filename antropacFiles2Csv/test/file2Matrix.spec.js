var assert = require("chai").assert;
var f2m = require('../src/file2Matrix')

const keys = ['author', 'ed', 'title', 'year']
const rawData = 'title: \'Dune\'\nauthor: \'F.Herbert\'\ned: \'Anaya\'\n\ntitle: \'Germinal\'\nauthor: \'Flaubert\'\nyear: 1970\n'

describe('file2Matrix functions', function () {
  describe('splitDataLines', function () {
    it('should split a file data string into lines', async () => {
      assert.deepEqual(
        f2m.splitDataLines('line 1\nline 2\nline 3'), 
        ['line 1', 'line 2', 'line 3'])
    })
  })

  describe('create csvs from arrays', function () {
    it('add2csv should add a new data column to a csv', async () => {
      assert.equal(
        f2m.add2csv('hola;lola', 'how are you'), 
        'hola;lola;how are you')
    })
    it('invConcat should concat the first elem to the second', async () => {
      assert.equal(
        f2m.invConcat(';', 'hola'), 
        'hola;')
    })
    it('arr2csv should convert an array of strings into a csv string with line feeed', async () => {
      assert.equal(
        f2m.arr2csv(['hola', 'lola', 'how are you']), 
        'hola;lola;how are you\n')
    })
  })

  describe('create book-object array', function () {
    it('splitObjectLine should split a key: value string into a key-value pair', async () => {
      assert.deepEqual(
        f2m.splitObjectLine('key: value'), ['key', 'value'])
    })
    it('addLine2BookAtrtributePairsArray should add a new key-value pair to an array of them', async () => {
      assert.deepEqual(
        // TODO: invert this params order?
        f2m.addLine2BookAttributePairsArray('key: value', [['name', 'jordi']]), 
        [['name', 'jordi'], ['key', 'value']])
    })
    it('addBokObject2array should add a new book object to an array of them', async () => {
      assert.deepEqual(
        f2m.parseBookLines2bookObjects([], 'key: value'), 
        []);
      assert.deepEqual(
        f2m.parseBookLines2bookObjects([], 'key2: value2'), 
        []);
      assert.deepEqual(
        f2m.parseBookLines2bookObjects([], ''), 
        [{key: 'value', key2: 'value2'}]);
      assert.deepEqual(
        f2m.parseBookLines2bookObjects([], 'key3: value3'), 
        []);
      assert.deepEqual(
        f2m.parseBookLines2bookObjects([], 'key4: value4'), 
        []);
      assert.deepEqual(
        f2m.parseBookLines2bookObjects([], ''), 
        [{key3: 'value3', key4: 'value4'}]);
      })
    it('lines2BookObjectArray should create an array of book object from file data', async () => {
      assert.deepEqual(
        f2m.lines2BookObjectArray(['title: \'Dune\'', 
                                    'author: \'F.Herbert\'', 
                                    '']), 
        [{ author: '\'F.Herbert\'', title: '\'Dune\''}])
     
        assert.deepEqual(
        f2m.lines2BookObjectArray(['title: \'Dune\'', 
                                    'author: \'F.Herbert\'', 
                                    '',
                                    'title: \'Germinal\'', 
                                    'author: \'Flaubert\'', 
                                    '']), 
        [
          { author: '\'F.Herbert\'', title: '\'Dune\''}, 
          { author: '\'Flaubert\'', title: '\'Germinal\''}])
      })
  })

  describe('create books title as csv from book-object array', function () {
    it('addNewKeys should add a books keys to a list of keys', async () => {
      assert.deepEqual(
        f2m.addNewKeys(['key'], {key: 'value', key2: 'value2', key3: 'value2'}), 
        ['key', 'key2', 'key3'])
    })
    it('getAllKeys should get all keys from a book-object array', async () => {
      assert.deepEqual(
        f2m.getAllKeys([{ author: '\'F.Herbert\'', ed: '\'Anaya\'', title: '\'Dune\''}, { author: '\'Flaubert\'', title: '\'Germinal\'', year: 1970}]).sort(), 
        keys)
    })
    it('getAllDataKeys should get all books keys from lines array', async () => {
      assert.deepEqual(
        f2m.getAllDataKeys('title: \'Dune\'\nauthor: \'F.Herbert\'\ned: \'Anaya\'\ntitle: \'Germinal\'\nauthor: \'Flaubert\'\nyear: 1970\n\n').sort(), 
        keys.sort())
    })
    it('createTitle should create the csv title line from lines array', async () => {
      assert.deepEqual(
        f2m.createTitle(keys), 
        'author;ed;title;year\n')
      assert.deepEqual(
        f2m.createTitle2(rawData), 
        'title;author;ed;year\n')
      })
  })
  describe('complete book-object array from keys set', function () {
    it('addMissingKeys should add missing keys to book object', async () => {
      assert.deepEqual(
        f2m.addMissingKeys(keys, 
                            { author: '\'F.Herbert\'', title: '\'Dune\'', ed: '\'Anaya\''}), 
        { author: '\'F.Herbert\'', title: '\'Dune\'', ed: '\'Anaya\'', year: ''})
    })
    it('addBooksMissingKeys should add missing keys generated from a data lines to a book', async () => {
      // TODO: this is a crazy interface
      assert.deepEqual(
        f2m.addBookMissingKeys(keys)({author: '\'F.Herbert\'', title: '\'Dune\'', ed: '\'Anaya\''}), 
      {author: '\'F.Herbert\'', ed: '\'Anaya\'', title: '\'Dune\'', year: ''})
    })
    it('addDefualts should add missing keys generated from a data lines to all book-objects in an array', async () => {
      assert.deepEqual(
        f2m.addDefaults(keys)([{author: '\'F.Herbert\'', title: '\'Dune\'', ed: '\'Anaya\''}, { author: '\'Flaubert\'', title: '\'Germinal\'', year: 1970}]), 
        [{
          author: '\'F.Herbert\'', 
          ed: '\'Anaya\'', 
          title: '\'Dune\'', 
          year: ''
        }, 
        {
          "author": "'Flaubert'",
          "ed": "",
          "title": "'Germinal'",
          "year": 1970
        }])
      // assert.deepEqual(
      //   f2m.addDefaults2([{author: '\'F.Herbert\'', title: '\'Dune\'', ed: '\'Anaya\''}, { author: '\'Flaubert\'', title: '\'Germinal\'', year: 1970}]), 
      //   [{
      //     author: '\'F.Herbert\'', 
      //     ed: '\'Anaya\'', 
      //     title: '\'Dune\'', 
      //     year: ''
      //   }, 
      //   {
      //     "author": "'Flaubert'",
      //     "ed": "",
      //     "title": "'Germinal'",
      //     "year": 1970
      //   }])

    })
    it('addDefaults2Books should add add missing keys  generated from a data lines to all books generated from data lines', async () => {
      assert.deepEqual(
        f2m.addDefaults2Books(keys)(['title: \'Dune\'','author: \'F.Herbert\'','ed: \'Anaya\'','',
        'title: \'Germinal\'','author: \'Flaubert\'','year: 1970','']), 
        [{
          author: '\'F.Herbert\'', 
          ed: '\'Anaya\'', 
          title: '\'Dune\'', 
          year: ''
        }, 
        {
          "author": "'Flaubert'",
          "ed": "",
          "title": "'Germinal'",
          "year": '1970'
        }])
    })
  })
  describe('convert book-object array to csv', function () {
    it('pluckContent should return all values from an object', async () => {
      assert.deepEqual(
        f2m.pluckContent([{
          author: '\'F.Herbert\'', 
          ed: '\'Anaya\'', 
          title: '\'Dune\'', 
          year: ''
        }, 
        {
          author: "'Flaubert'",
          ed: "",
          title: "'Germinal'",
          year: '1970'
        }]), 
        [[
          "'F.Herbert'",
          "'Anaya'",
          "'Dune'",
          ""
          ], [
          "'Flaubert'",
          "",
          "'Germinal'",
          "1970"
        ]])
    })
    it('createBooksContents should get the values from books created from file data', async () => {
      assert.deepEqual(
        f2m.createBooksContents(keys)(['title: \'Dune\'','author: \'F.Herbert\'','ed: \'Anaya\'','','title: \'Germinal\'','author: \'Flaubert\'','year: 1970','']), 
        [[
            "'F.Herbert'",
            "'Anaya'",
            "'Dune'",
            ""
          ],[
            "'Flaubert'",
            "",
            "'Germinal'",
            "1970"
          ]])
    })
    it('contents2csvs should convert an array of arrays into an array of csvs', async () => {
      assert.deepEqual(
        f2m.contents2csvs([[
            "'Dune'",
            "'F.Herbert'",
            "'Anaya'",
            ""
          ], [
            "'Germinal'",
            "'Flaubert'",
            "",
            "1970"
          ]]), 
        ["'Dune';'F.Herbert';'Anaya';\n", "'Germinal';'Flaubert';;1970\n"])
      })
    it('data2booksCsv should convert the data from a file into a csv-string array', async () => {
      assert.deepEqual(
        f2m.data2booksCsv(keys)(rawData), 
        ["'F.Herbert';'Anaya';'Dune';\n", "'Flaubert';;'Germinal';1970\n"])
      })
  })
  describe('join csv title with book-csv table', function () {
    it('preapendTitle should add the title at the beginning of the book-csv table', async () => {
      assert.deepEqual(
        f2m.preapendTitle(keys)(["'Dune';'F.Herbert';'Anaya';\n", "'Germinal';'Flaubert';;1970\n"]), 
        ["author;ed;title;year\n", "'Dune';'F.Herbert';'Anaya';\n", "'Germinal';'Flaubert';;1970\n"])
      })
    it('file2scv should create a full book-table csv from raw file data', async () => {
      assert.deepEqual(
        f2m.file2csv(keys)(rawData), 
        ["author;ed;title;year\n", "'F.Herbert';'Anaya';'Dune';\n", "'Flaubert';;'Germinal';1970\n"])
      })
  })
})