if (typeof Promise === 'undefined') {
  require('promise/lib/rejection-tracking').enable()
  require('es6-promise').polyfill()
}

require('axios')

if (typeof Object.values === 'undefined')
  Object.assign = require('object-assign')

if (typeof Object.values === 'undefined')
  Object.values = obj => Object.keys(obj).map(i => obj[i])

if (typeof Object.entries === 'undefined')
  Object.entries = obj => Object.keys(obj).map(i => [i, obj[i]])
