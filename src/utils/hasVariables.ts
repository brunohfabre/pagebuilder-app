export function hasVariables(route: string, routeParams: any) {
  const values = route
    .split('/')
    .filter((item) => Boolean(item) && item.startsWith('['))
    .map((item) => item.replace('[', '').replace(']', ''))
    .filter((item) => routeParams[item])

  return !!values.length
}
