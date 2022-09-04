import { App, watch } from 'vue'
import { GlobalConfig } from '../../global-config/global-config'
import { isServer } from '../../../utils/ssr-utils'
import { getGlobalProperty } from '../../../vuestic-plugin/utils'
import { cssVariableName } from '../utils'
import { getTextColor } from '../color-functions'

export const setCSSVariable = (name: string, value: string, root: HTMLElement) => {
  root.style.setProperty(cssVariableName(name), value)
}

export const createColorConfigPlugin = (app: App) => {
  const globalConfig = getGlobalProperty(app, '$vaConfig').globalConfig

  /** Renders CSS variables string. Use this in SSR mode */
  const renderCSSVariables = (colors: GlobalConfig['colors'] = globalConfig.value.colors) => {
    if (!colors) { return }

    const colorNames = Object.keys(colors)
    return colorNames.map((key) => `${cssVariableName(key)}: ${colors[key]}`).join(';')
  }

  const updateColors = (newValue: GlobalConfig['colors']) => {
    if (!newValue) { return }
    if (isServer()) { return }

    const root = document.documentElement

    const colorNames = Object.keys(newValue)
    colorNames.forEach((key) => {
      setCSSVariable(key, newValue[key], root)
    })

    colorNames.forEach((key) => {
      setCSSVariable(`on-${key}`, getTextColor(newValue[key], newValue.textDark, newValue.textLight), root)
    })
  }

  updateColors(globalConfig.value.colors)

  watch(() => globalConfig.value.colors, (newValue) => {
    updateColors(newValue)
  }, { immediate: true, deep: true })

  return {
    // Let's have this method for a while, it is used in nuxt plugin that uses `latest` vuestic-ui version.
    /** @deprecated it's typo here, lol */
    renderCSSVarialbes: renderCSSVariables,
    renderCSSVariables,
    updateColors,
  }
}
