'use strict'

exports.addParams = function (route, keys) {
  const newRoute = route.slice()
  const path = newRoute[0]
  newRoute[0] = path.replace(/(:[^\/]+)/g, function () {
    const key = arguments[0].substr(1)
    return keys[key]
  })
  return newRoute
}

exports.addQueryParams = function (route, params) {
  const newRoute = route.slice()
  const _params = []
  if (params) {
    for (const prop in params) {
      if(params.hasOwnProperty(prop)) {
        _params.push(prop + '=' + encodeURIComponent(params[prop]))
      }
    }
  }
  if (_params.length > 0) {
    return [newRoute[0] + '?' + _params.join('&'), newRoute[1]]
  }
  else {
    return newRoute
  }
}
