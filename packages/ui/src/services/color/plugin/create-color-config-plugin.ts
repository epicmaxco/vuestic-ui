import { PartialGlobalConfig } from './../../global-config/types'
import { ColorVariables } from './../types'
import { App, watch, computed, onMounted } from 'vue'
import { isServer } from '../../../utils/ssr'
import { cssVariableName } from '../utils'
import { useColors } from '../../../composables'
import { generateUniqueId } from '../../../utils/uuid'
import { addOrUpdateStyleElement, removeStyleElement } from '../../../utils/dom'
import { isDev } from '../../../utils/env'

export const setCSSVariable = (name: string, value: string, root: HTMLElement) => {
  root.style.setProperty(cssVariableName(name), value)
}

export const generateCSSVariable = (key: string, value: string) => {
  return `${cssVariableName(key)}: ${value};\n`
}

const STYLE_ROOT_ATTR = 'data-va-app'

const getStyleElementId = (id: string | number) => `va-color-variables-${id}`

export const createColorConfigPlugin = (app: App, config?: PartialGlobalConfig) => {
  const { colors: configColors, getTextColor, getColor, currentPresetName, applyPreset } = useColors()

  /** Renders CSS variables string. Use this in SSR mode */
  const renderCSSVariables = (colors: ColorVariables | undefined = configColors) => {
    if (!colors) { return }

    const colorNames = Object.keys(colors)
    const renderedColors = colorNames.map((key) => `${cssVariableName(key)}: ${colors[key]}`).join(';')
    const renderedOnColors = colorNames.map((key) => `${cssVariableName(`on-${key}`)}: ${getColor(getTextColor(colors[key]))}`).join(';')

    return `${renderedColors};${renderedOnColors}`
  }

  const renderCSSVariablesStyleContent = (colors: ColorVariables = configColors, selector = ':root, :host') => {
    const colorNames = Object.keys(colors)

    let result = `${selector} {
`
    colorNames.forEach((key) => {
      result += generateCSSVariable(key, colors[key])
    })
    colorNames.forEach((key) => {
      result += generateCSSVariable(`on-${key}`, getColor(getTextColor(colors[key])))
    })
    result += '}\n'

    return result
  }

  const uniqueId = computed(() => app._uid)

  // TODO: Use this selector later
  const stylesRootSelector = computed(() => ':root, :host') // `[${STYLE_ROOT_ATTR}="${uniqueId.value}"]`

  const updateColors = (newValue: ColorVariables | undefined) => {
    if (!newValue || isServer()) { return }

    const styleContent = renderCSSVariablesStyleContent(newValue, stylesRootSelector.value)

    addOrUpdateStyleElement(getStyleElementId(uniqueId.value), () => styleContent)
  }

  function getAppStylesRootAttribute () {
    return { [STYLE_ROOT_ATTR]: uniqueId.value }
  }

  const origMount = app.mount

  app.mount = function (...args: Parameters<typeof origMount>) {
    const result = origMount.apply(this, args)
    const appRootElement = app._container as HTMLElement

    // Remove previous styles when remounting to the same root element (happens on HMR)
    const existingStylesId = appRootElement.getAttribute(STYLE_ROOT_ATTR)

    if (existingStylesId && existingStylesId !== uniqueId.value.toString()) {
      removeStyleElement(getStyleElementId(existingStylesId))
    }

    appRootElement.setAttribute(STYLE_ROOT_ATTR, uniqueId.value.toString())

    return result
  }

  watch(configColors, (newValue) => {
    updateColors(newValue)
  }, { immediate: true, deep: true })

  return {
    colors: configColors,
    currentPresetName,
    getAppStylesRootAttribute,
    renderCSSVariables,
    updateColors,
    renderCSSVariablesStyleContent,
  }
}
