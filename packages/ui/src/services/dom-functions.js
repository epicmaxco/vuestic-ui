export const addOrUpdateStyleElement = (id, getStyles) => {
  if (!id) {
    throw new Error('Style id is required')
  }

  let stylesElement = document.getElementById(id)

  if (stylesElement) {
    stylesElement.innerHTML = getStyles()
  } else {
    stylesElement = document.createElement('style')
    stylesElement.setAttribute('type', 'text/css')
    stylesElement.setAttribute('id', id)
    stylesElement.innerHTML = getStyles()
    document.head.append(stylesElement)
  }
}
