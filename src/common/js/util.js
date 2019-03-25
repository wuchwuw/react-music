export function findRoute (routes, name) {
  return routes.find((item) => {
    return item.name === name
  })
}

export function debounce (fn, delay, immediately) {
  let timer = null
  return function (...args) {
    if (timer) {
      return
    } else {
      if (immediately) {
        fn.apply(this, args)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}