export function findRoute (routes, name) {
  return routes.find((item) => {
    return item.name === name
  })
}