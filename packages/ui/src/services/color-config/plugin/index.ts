import { Plugin, watch } from 'vue'
import { GlobalConfig, ProvidedGlobalConfig } from '../../global-config/global-config'
import { isServer } from '../../../utils/ssr-utils'

export const setCSSVariable = (name: string, value: string, root: HTMLElement) => {
  root.style.setProperty(`--va-${name}`, value)
}

/** Creates color css variables and reactively updates on ColorConfig changes. */
export const ColorConfigPlugin: Plugin = {
  install (app) {
    const { globalConfig } = app.config.globalProperties.$vaConfig as ProvidedGlobalConfig

    /** Renders CSS varialbes string. Use this in SSR mode */
    const renderCSSVarialbes = (colors: GlobalConfig['colors'] = globalConfig.value.colors) => {
      if (!colors) { return }

      const colorNames = Object.keys(colors)
      return colorNames.map((key) => `--va-${key}: ${colors[key]}`).join(';')
    }

    const updateColors = (newValue: GlobalConfig['colors']) => {
      if (!newValue) { return }
      if (isServer()) { return }

      const root = document.documentElement

      const colorNames = Object.keys(newValue)
      colorNames.forEach((key) => {
        setCSSVariable(key, newValue[key], root)
      })
    }

    updateColors(globalConfig.value.colors)

    watch(() => globalConfig.value.colors, (newValue) => {
      updateColors(newValue)
    }, { immediate: true, deep: true })

    app.config.globalProperties.$vaColorConfig = { renderCSSVarialbes, updateColors }
  },
}
