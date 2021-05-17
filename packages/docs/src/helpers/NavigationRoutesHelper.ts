// @ts-nocheck
import { NavigationRoute } from '@/components/sidebar/NavigationRoute'

export const getSortedNavigationRoutes = (routes): NavigationRoute[] => {
  // ToDO: normalize navigation routes with better structure. This sort is temporary solution
  const uiElementsIndex = routes.findIndex(route => route.name === 'ui-elements')
  const uiElements = routes.find(route => route.name === 'ui-elements').children
  let result = []
  let nextCategoryIndex
  // Sort elements alphabetically
  do {
    let tempArr = []
    const tempCategoryName = uiElements[0].category
    delete uiElements[0].category
    nextCategoryIndex = uiElements.findIndex(element => element.category)
    if (nextCategoryIndex !== -1) {
      tempArr = uiElements.slice(0, nextCategoryIndex).sort((a, b) => a.name.localeCompare(b.name))
    } else {
      tempArr = uiElements.slice(0, uiElements.length).sort((a, b) => a.name.localeCompare(b.name))
    }
    tempArr[0].category = tempCategoryName
    result = [...result, ...tempArr]
    uiElements.splice(0, nextCategoryIndex)
  } while (uiElements.length && nextCategoryIndex !== -1)

  routes[uiElementsIndex].children = result
  return routes
}
