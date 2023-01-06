import { PartialGlobalConfig } from './../../global-config/types'
import { ColorVariables } from './../types'
import { App, watch } from 'vue'
import { isServer } from '../../../utils/ssr'
import { cssVariableName } from '../utils'
import { useColors } from '../../../composables'

export const setCSSVariable = (name: string, value: string, root: HTMLElement) => {
  root.style.setProperty(cssVariableName(name), value)
}

export const createColorConfigPlugin = (app: App, config?: PartialGlobalConfig) => {
  const { colors: configColors, getTextColor, getColor, currentPresetName, applyPreset } = useColors()

  /** Renders CSS variables string. Use this in SSR mode */
  const renderCSSVariables = (colors: ColorVariables | undefined = configColors) => {
    if (!colors) { return }

    const colorNames = Object.keys(colors)
    return colorNames.map((key) => `${cssVariableName(key)}: ${colors[key]}`).join(';')
  }

  const updateColors = (newValue: ColorVariables | undefined) => {
    if (!newValue) { return }
    if (isServer()) { return }

    const root = document.documentElement

    const colorNames = Object.keys(newValue)
    colorNames.forEach((key) => {
      setCSSVariable(key, newValue[key], root)
    })
    colorNames.forEach((key) => {
      setCSSVariable(`on-${key}`, getColor(getTextColor(newValue[key])), root)
    })
  }

  watch(configColors, (newValue) => {
    updateColors(newValue)
  }, { immediate: true, deep: true })

  if (config?.colors?.currentPresetName) {
    applyPreset(config.colors.currentPresetName)
  }

  return {
    renderCSSVariables,
    updateColors,
  }
}
