const _ = require('ramda')
const M = require('ramda-fantasy').Maybe

const props = {
  user: {
    posts: [
      { title: 'Foo', comments: [ 'Good one!', 'Interesting...' ] },
      { title: 'Bar', comments: [ 'Ok' ] },
      { title: 'Baz', comments: [] },
    ]
  }
}

const get = path => obj => path.reduce((acc, pathStep) => 
  (acc && acc[pathStep]) ? acc[pathStep] : null, 
  obj)

console.log('props:', props)
console.log(props.user &&
  props.user.posts &&
  props.user.posts[0] &&
  props.user.posts[0].comments &&
  props.user.posts[0].comments[0])

console.log(get(['user', 'posts', 0, 'comments', 0])(props))
console.log(get(['user', 'posts', 0, 'comments', 0])({user: {posts:[]}}))

console.log(_.pathOr([], ['user', 'posts', 0, 'comments', 0])(props))
console.log(_.pathOr([], ['user', 'posts', 0, 'comments', 0])({user: {posts:[]}}))

const Just    = M.Just;
const Nothing = M.Nothing;

const safeDiv = _.curry((n, d) => d === 0 ? Nothing() : Just(n / d));
const lookup = _.curry((k, obj) => k in obj ? Just(obj[k]) : Nothing());

console.log('safeDiv(42,2):', safeDiv(42,2))

const plus1or0 = M.maybe(0, _.inc);
console.log('plus1or0(safeDiv(42, 2)):', plus1or0(safeDiv(42, 2)))

const savePath = (path, obj) => _.path(path, obj) ? M.Just(_.path(path, obj)) : M.Nothing()
console.log('savePath:', savePath(['user', 'posts', 0, 'comments', 0], props))
console.log('getPath():', savePath(['user', 'posts', 0, 'comments', 0], props).getOrElse('Not found'))
console.log('getPath():', savePath(['user', 'posts', 0, 'comments', 0], {user: {posts:[]}}).getOrElse('Not found'))