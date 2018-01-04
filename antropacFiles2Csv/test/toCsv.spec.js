var assert = require("chai").assert;
var _ = require('../src/toCsv')

describe('toCsv library', function () {
  describe('create csvs from arrays', function () {
    it('invConcat should concat the first elem to the second', async () => {
      assert.equal(
        _.appendSemiColon('hola'), 
        'hola;')
    })
    it('add2csv should add a new data column to a csv', async () => {
      assert.equal(
        _.add2csv('hola;lola', 'how are you'), 
        'hola;lola;how are you')
    })
    it('arr2csv should convert an array of strings into a csv string with line feeed', async () => {
      assert.equal(
        _.arr2csv(['hola', 'lola', 'how are you']), 
        'hola;lola;how are you\n')
    })
    it('mergeCsvs should convert an array of csvs into a csv string', async () => {
      assert.equal(
        _.mergeCsvs([_.arr2csv(['hola', 'lola', 'how are you']),
                    _.arr2csv(['la', 'lluvia', 'en', 'sevilla'])]), 
        'hola;lola;how are you\nla;lluvia;en;sevilla\n')
    })
  })    
})

