var assert = require("chai").assert;
var _ = require('../src/toContent')

const keys = ['author', 'ed', 'title', 'year']
const books = [{author: 'F.Herbert', title: 'Dune', ed: 'Anaya'}, 
              {author: 'Flaubert', title: 'Germinal', year: 1970}]
const completeBooks = [{ author: 'F.Herbert', title: 'Dune', ed: 'Anaya', year: ''}, 
                      {author: 'Flaubert', title: 'Germinal', ed: '', year: 1970}]
const resCsv = ["F.Herbert;Anaya;Dune;\n", "Flaubert;;Germinal;1970\n"]

describe('toContent library', function () {
  describe('complete book-object array from keys set', function () {
    it('addMissingKeys should add missing keys to book object', async () => {
      assert.deepEqual(
        _.addMissingKeys(keys, books[0]), 
        { author: 'F.Herbert', title: 'Dune', ed: 'Anaya', year: ''})
    })
    it('addDefualts should add missing keys generated from a data lines to all book-objects in an array', async () => {
      assert.deepEqual(
        _.addDefaults(keys)(books), 
        completeBooks)
      assert.deepEqual(
        _.addDefaults(keys)([{}]), 
        [{"author": "", "ed": "", "title": "", "year": ""}])
      assert.deepEqual(
        _.addDefaults(keys)([]), 
        [])
      assert.deepEqual(
        _.addDefaults([])(books), 
        books)
    })
  })
  describe('convert book-object array to csv', function () {
    it('pluckContent should return all values from an object', async () => {
      assert.deepEqual(
        _.pluckContent(books), 
        [[
          'F.Herbert',
          'Dune',
          'Anaya',
          ], [
          'Flaubert',
          'Germinal',
          '1970'
        ]])
    })
    it('createBooksContents should get the values from books created from file data', async () => {
      assert.deepEqual(
        _.createBooksContents(keys)(books), 
        [[
          'F.Herbert',
          'Anaya',
          'Dune',
          ''          
          ], [
          'Flaubert',
          '',
          'Germinal',
          '1970'
        ]])
    })
    it('bContents2csvs should convert an array of arrays into an array of csvs', async () => {
      assert.deepEqual(
        _.bContents2csvs([[
          'F.Herbert',
          'Anaya',
          'Dune',
          ''          
          ], [
          'Flaubert',
          '',
          'Germinal',
          '1970'
        ]]), 
        resCsv)
    })
    it('books2Csv should convert the data from a file into a csv-string array', async () => {
      assert.deepEqual(
        _.books2Csvs(keys)(books), 
        resCsv)
    })
  })
})
