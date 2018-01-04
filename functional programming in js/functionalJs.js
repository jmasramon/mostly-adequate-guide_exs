const _ = require('underscore')

const existy = (x) => x != null

const truthy = (x) => (x !== false) && existy(x)

// const splat = (fun) => {
//   return (array) => {
//     return fun.apply(null, array)
//   }
// }

// const unsplat = (fun) => {
//   return function () {
//     return fun.call(null, _.toArray(arguments))
//   }
// }

// const isIndexed = (data) => _.isArray(data) || _.isString(data)

// const fail = (mes) => {
//   throw new Error(mes)
// }

// const nth = (a, index) => {
//   if (!_.isNumber(index)) fail('expected number as index')
//   if (!isIndexed(a)) fail('expected indexed')
//   if (index < 0 || index > a.length - 1) fail('index out of bounds')

//   return a[index]
// }

// const second = (a) => nth(a, 1)

// const compareLessThanOrEqual = (x, y) => {
//   if (x < y) return -1
//   if (y < x) return 1
//   return 0
// }

// const lessOrEqual = (x, y) => x <= y

// const comparator = (pred) => {
//   return (x, y) => {
//     if (pred(x, y)) return -1
//     else if (pred(y, x)) return 1
//     return 0
//   }
// }
// // use starts here

// const addArrayElems = splat((x, y) => x + y)
// console.log(addArrayElems([1, 2]))

// const sortArgs = unsplat((array) => array.sort())
// console.log(sortArgs(4, 3, 2))

// console.log(nth([1, 2, 3, 4], 2))
// console.log(second([1, 2, 3, 4], 2))

// console.log([1, -2, 33, 0, -23].sort(compareLessThanOrEqual))
// if (lessOrEqual(2, 1)) console.log('less or equal')
// else console.log('bigger')
// if (compareLessThanOrEqual(1, 1)) console.log('less or equal')
// if (comparator(lessOrEqual)(1, 1)) console.log('less or equal')

// const sing = () => {
//   const lyrics = []
//   for (let bottles = 5; bottles > 0; bottles--) {
//     lyrics.push(bottles + ' bottles of beer on the wall.')
//     lyrics.push(bottles + ' bottles of beer')
//     lyrics.push('Take one down, pass it around')

//     if (bottles <= 1) {
//       lyrics.push('No more bottles of beer on the wall')
//     }
//   }
//   console.log(lyrics)
// }

// sing()

// function lyricSegment(bottles) {
//   return _.chain([])
//     .push(bottles + ' bottles of beer on the wall.')
//     .push(bottles + ' bottles of beer')
//     .push('Take one down, pass it around')
//     .tap((lyrics) => {
//       if (bottles <= 1) {
//         lyrics.push('No more bottles of beer on the wall')
//       }
//     })
//     .value()
// }

// function singWithSegments(start, end, lyricsGenerator) {
//   return _.reduce(_.range(start, end, -1),
//     (acc, n) => acc.concat(lyricsGenerator(n)),
//     []
//   )
// }

// console.log(lyricSegment(99))
// console.log(lyricSegment(1))
// console.log(singWithSegments(5, 0, lyricSegment))

function cat () {
  // console.log('cat called')
  // console.log('  arguments:', arguments)
  let head = _.first(arguments)
  // console.log('  head:', head)
  if (existy(head)) {
    // console.log('  _.rest(arguments):', _.rest(arguments))
    return head.concat.apply(head, _.rest(arguments))
  } else {
    return []
  }
}

function construct (head, tail) {
  return cat([head], _.toArray(tail))
}

function mapCat (fun, coll) {
  return cat.apply(null, _.map(coll, fun))
}

console.log('cat([2, 5], [1,2,3], [6, 7, 8]):', cat([2, 5], [1, 2, 3], [6, 7, 8]))
console.log('cat([1, 2, 3]):', cat([1, 2, 3]))
// console.log('cat(_.map([1, 2, 3]), (x) => 2 * x)):', cat(_.map([1, 2, 3], (x) => 2 * x)))
// console.log('cat.call(null, [2, 4, 6]):', cat.call(null, [2, 4, 6]))
console.log('construct(3, [1, 2]):', construct(3, [1, 2]))
console.log('mapCat((e) => construct(e, [\',\']), [1, 2, 3]):', mapCat((e) => construct(e, [',']), [1, 2, 3]))
// console.log('_.map([1, 2, 3], (x) => 2 * x):', _.map([1, 2, 3], (x) => 2 * x))
// console.log('mapCat((x) => 2 * x, [1, 2, 3]):', mapCat((x) => 2 * x, [1, 2, 3]))

function butLast (coll) {
  return _.toArray(coll).slice(0, -1)
}

const interpose = (inter, coll) => butLast(mapCat((e) => construct(e, [inter]), coll))

console.log('butLast([1, 2, 3]):', butLast([1, 2, 3]))
console.log('interpose(\',\', [1, 2, 3]:', interpose(',', [1, 2, 3]))

const zombie = {name: 'Bub', film: 'Day of the dead'}

console.log('_.keys(zombie):', _.keys(zombie))
console.log('_.values(zombie):', _.values(zombie))
console.log('_.pluck([{title: "Chthon", author: "Anthony"}, {title: "Chthon", author: "Gardner"}], "title"):', _.pluck([{title: "Chthon", author: "Anthony"}, {title: "Chthon", author: "Gardner"}], 'author'))
console.log('_.pairs(zombie):', _.pairs(zombie))
console.log('_.map((p) => [p[0].toUpperCase(), p[1]], _.pairs(zombie):', _.object(_.map(_.pairs(zombie), (p) => [p[0].toUpperCase(), p[1]])))

const library = [{title: 'SICP', isbn: '9293', ed: 1},
  {title: 'SICP', isbn: '4003', ed: 2},
  {title: 'Joy of Clojure', isbn: '97797', ed: 1}
]

console.log('_.findWhere(library, {title: "SICP"}):', _.findWhere(library, {title: "SICP"}))
console.log('_.where(library, {title: "SICP"}):', _.where(library, {title: "SICP"}))
console.log('_.where(library, {title: "SICP"}):', _.where(library, {title: "SICP", ed: 2}))

function project (table, keysArray) {
  return _.map(table, (obj) => _.pick.apply(null, construct(obj, keysArray)))
}

console.log('project(library, ["title", "isbn"]):', project(library, ["title", "isbn"]))
console.log('project(project(library, ["title", "isbn"]), ["title"]):', project(project(library, ["title", "isbn"]), ["title"]))

const repeat = (times, VALUE) => _.map(_.range(times), () => VALUE)

console.log('repeat(5, 3):', repeat(5, 3))

const k = (cte) => cte
const always = (cte) => () => cte

console.log('repeat(k(5), k(3)):', repeat(k(5), k(3)))

const repeatedly = (times, fun) => _.map(_.range(times), fun)

console.log('repeatedly(k(3), (e) => e * 2):', repeatedly(k(3), (e) => e * 2))
console.log('repeatedly(k(3), () => k(3)):', repeatedly(k(3), () => k(3)))
console.log('repeatedly(k(3), always(3):', repeatedly(k(3), always(3)))

const iterateUntil = (gen, check, init) => {
  const ret = []
  let res = gen(init)
  while (check(res)) {
    ret.push(res)
    res = gen(res)
  }
  return ret
}

console.log('iterateUntil(n => n + n, n => n < 1024, k(1)):', iterateUntil(n => n + n, n => n < 1024, k(1)))
console.log('always returns a singleton?:', always(3) === always(3))

function fnull (fun) {
  const defaults = _.rest(arguments)
  return function () {
    const args = _.toArray(arguments)
    const safeArgs = args.map((a, i) => {
      return existy(a) ? a : defaults[i]
    })
    return fun.apply(null, safeArgs)
  }
}

const prod = (acc, current) => acc * current

function allProd () {
  const args = _.toArray(arguments)
  return _.reduce(args, prod, 1)
}

console.log('allProd(1, 2, 3, 4):', allProd(1, 2, 3, 4))
console.log('allProd(1, null, 3, 4):', allProd(1, null, 3, 4))

function protectedallProd () {
  return _.reduce(_.toArray(arguments), fnull(prod, 1, 1), 1)
}

console.log('protectedallProd(1, null, 3, 4):', protectedallProd(1, null, 3, 4))

function checker () {
  const validators = _.toArray(arguments)
  return function (obj) {
    return _.reduce(validators, (acc, v) => {
      return v(obj) ? acc : _.chain(acc).push(v.message).value()
    }, [])
  }
}

const validator = (fun, mes) => {
  fun.message = mes
  return fun
}

const isMap = (p) => _.isObject(p)
isMap.message = 'It is not an object'

console.log('isMap({}):', isMap({}))
console.log('isMap(1):', isMap(1))

const hasId = validator((p) => _.isObject(p) && existy(p.id), 'Does not have id')

console.log('hasId({id: 1}):', hasId({id: 1}))
console.log('hasId({}):', hasId({}))
console.log('hasId(1):', hasId(1))

function hasKeys () {
  const keys = _.toArray(arguments)
  console.log('keys:', keys)
  const validators = _.map(keys, (key) =>
    validator((p) => existy(p[key]), 'Does not have ' + key))
  console.log('validators:', validators)
  return checker.apply(null, validators)
}

console.log('hasKeys(\'age\')({}):', hasKeys('id', 'name', 'age')({id: 3}))

const isObject = checker(isMap, hasId, hasKeys('name', 'age'))

console.log('isObject({id: 1, name: \'jordi\', age: 44}):', isObject({id: 1, name: 'jordi', age: 44}))
console.log('isObject({id: 1, name: \'jordi\'}):', isObject({id: 1, name: 'jordi'}))
console.log('isObject({id: 1}):', isObject({id: 1}))
console.log('isObject({}):', isObject({}))
console.log('isObject(1):', isObject(1))
