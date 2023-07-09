import { watch } from 'vue'

import { isServer } from '../../../utils/ssr'
import { useGlobalConfig } from '../../../composables/useGlobalConfig'
import { defineGlobalProperty, defineVuesticPlugin } from '../../vue-plugin/utils'
import { addOrUpdateStyleElement } from '../../../utils/dom'

import type { ColorVariables } from '../../color'
import type { ColorsClassesConfig, ColorsClassesConfigItem } from '../types'

const getColorsClassesHelpers = (helpers: ColorsClassesConfig, colors: ColorVariables) => {
  const colorsEntries = Object.entries(colors)

  return helpers.reduce((acc, helper: ColorsClassesConfigItem) => acc.concat(
    colorsEntries.map(([colorName, colorValue]) => ({
      ...helper,
      postfix: helper.postfix ?? colorName,
      value: helper.value ?? colorValue,
    })),
  ), [] as ColorsClassesConfig)
}

const getColorsClassesStyles = (helpers: ColorsClassesConfig) => {
  return helpers.reduce((styles, helper) => {
    const style = [helper.property].flat().map(prop => `${prop}: ${helper.value};`).join('')

    styles += `.va-${helper.prefix}--${helper.postfix} { ${style} }`

    return styles
  }, '')
}

const handleConfigUpdate = (helpers: ColorsClassesConfig, colors: ColorVariables) => {
  const coloredHelpers = getColorsClassesHelpers(helpers, colors)

  addOrUpdateStyleElement(
    'va-color-helpers',
    () => getColorsClassesStyles(coloredHelpers),
  )
}

const createColorHelpersPlugin = () => {
  if (isServer()) { return }

  const { globalConfig } = useGlobalConfig()

  watch(() => globalConfig.value.colorsClasses, (newHelpers: ColorsClassesConfig) => {
    if (newHelpers.length) {
      handleConfigUpdate(newHelpers, globalConfig.value.colors.variables)
    }
  }, { immediate: true, deep: true })

  watch(() => globalConfig.value.colors.variables, (newColors: ColorVariables) => {
    if (!newColors) { return }

    handleConfigUpdate(globalConfig.value.colorsClasses, newColors)
  }, { immediate: true, deep: true })

  return {
    renderColorHelpers: () => {
      const coloredHelpers = getColorsClassesHelpers(globalConfig.value.colorsClasses, globalConfig.value.colors.variables)

      return getColorsClassesStyles(coloredHelpers)
    },
  }
}

export const ColorsClassesPlugin = defineVuesticPlugin(() => ({
  install (app) {
    defineGlobalProperty(app, '$vaColorsClasses', createColorHelpersPlugin())
  },
}))

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vaColorsClasses: ReturnType<typeof createColorHelpersPlugin>
  }
}
