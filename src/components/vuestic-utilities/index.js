import { colorConfig } from '../vuestic-components/va-color-picker/VuesticTheme'

const createBackgroundHelpers = () => {
  let result = ''
  Object.keys(colorConfig).map((name) => {
    result += `.background--${name.toLowerCase()} { background-color: ${colorConfig[name]}; }`
  })
  return result
}

const createTextColorHelpers = () => {
  let result = ''
  Object.keys(colorConfig).map((name) => {
    result += `.text--${name.toLowerCase()} { color: ${colorConfig[name]}; }`
  })
  return result
}

export default (() => {
  const $style = document.createElement('style')
  $style.setAttribute('id', 'va-utilities')
  $style.innerHTML = createBackgroundHelpers() + createTextColorHelpers()
  document.body.insertBefore($style, document.body.firstChild)
})()
