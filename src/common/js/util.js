export function findRoute (routes, name) {
  return routes.find((item) => {
    return item.name === name
  })
}

export function debounce (fn, delay, immediately) {
  let timer = null
  return function (...args) {
    if (immediately && !timer) {
      fn.apply(this, args)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }
}