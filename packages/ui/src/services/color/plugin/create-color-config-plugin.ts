import { PartialGlobalConfig } from './../../global-config/types'
import { ColorVariables } from './../types'
import { App, watch, computed } from 'vue'
import { isServer } from '../../../utils/ssr'
import { cssVariableName } from '../../../utils/css-variables'
import { useColors } from '../../../composables'
import { generateUniqueId } from '../../../utils/uuid'
import { addOrUpdateStyleElement } from '../../../utils/dom'

export const setCSSVariable = (name: string, value: string, root: HTMLElement) => {
  root.style.setProperty(cssVariableName(name), value)
}

export const generateCSSVariable = (key: string, value: string) => {
  return `${cssVariableName(key)}: ${value};`
}

export const createColorConfigPlugin = (app: App, config?: PartialGlobalConfig) => {
  const { colors: configColors, getTextColor, getColor, currentPresetName, applyPreset } = useColors()

  /** Renders CSS variables string. Use this in SSR mode */
  const renderCSSVariables = (colors: ColorVariables | undefined = configColors) => {
    if (!colors) { return }

    const colorNames = Object.keys(colors)
    const renderedColors = colorNames.map((key) => generateCSSVariable(key, colors[key]))
    const renderedOnColors = colorNames.map((key) => generateCSSVariable(`on-${key}`, getColor(getTextColor(colors[key]))))

    return [...renderedColors, ...renderedOnColors].join(';')
  }

  const renderCSSVariablesStyleContent = (colors: ColorVariables = configColors) => {
    const colorNames = Object.keys(colors)

    let result = ':root {\n'
    colorNames.forEach((key) => {
      result += generateCSSVariable(key, colors[key]) + '\n'
    })
    colorNames.forEach((key) => {
      result += generateCSSVariable(`on-${key}`, getColor(getTextColor(colors[key]))) + '\n'
    })
    result += '}\n'

    return result
  }

  const uniqueId = computed(generateUniqueId)

  const updateColors = (newValue: ColorVariables | undefined) => {
    if (!newValue) { return }
    if (isServer()) { return }

    const styleContent = renderCSSVariablesStyleContent(newValue)

    addOrUpdateStyleElement(`va-color-variables-${uniqueId.value}`, () => styleContent)
  }

  watch(configColors, (newValue) => {
    updateColors(newValue)
  }, { immediate: true, deep: true })

  return {
    colors: configColors,
    currentPresetName,
    renderCSSVariables,
    updateColors,
    renderCSSVariablesStyleContent,
  }
}
