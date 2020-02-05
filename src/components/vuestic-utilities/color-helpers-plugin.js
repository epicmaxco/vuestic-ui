import { getDefaultOptions } from '../../services/ColorThemePlugin'

const ColorHelpersPlugin = {
  install () {
    const { themes } = getDefaultOptions()

    const createBackgroundHelpers = () => {
      let result = ''
      Object.keys(themes).map((name) => {
        result += `.background--${name.toLowerCase()} { background-color: ${themes[name]} !important; }`
      })
      return result
    }

    const createTextColorHelpers = () => {
      let result = ''
      Object.keys(themes).map((name) => {
        result += `.text--${name.toLowerCase()} { color: ${themes[name]} !important; }`
      })
      return result
    }

    const $style = document.createElement('style')
    $style.setAttribute('id', 'va-utilities')
    $style.innerHTML = createBackgroundHelpers() + createTextColorHelpers()
    document.body.insertBefore($style, document.body.firstChild)
  },
}

export default ColorHelpersPlugin
