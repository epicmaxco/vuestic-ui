import { watch } from 'vue'

import { isServer } from '../../../utils/ssr'
import { useGlobalConfig } from '../../global-config'
import { defineVuesticPlugin } from '../../vue-plugin/utils'
import { addOrUpdateStyleElement } from '../../../utils/dom'

import type { ColorVariables } from '../../color'
import type { ColorsCustomClassesConfig, ColorsCustomClassesConfigItem } from '../types'

import { ColorsCustomClassesPresets } from '../config/default'

export const getColorsCustomClassesDefaultConfig = () => ColorsCustomClassesPresets

const getColorsCustomClassesHelpers = (helpers: ColorsCustomClassesConfig, colors: ColorVariables) => {
  const colorsEntries = Object.entries(colors)

  return helpers.reduce((acc, helper: ColorsCustomClassesConfigItem) => acc.concat(
    colorsEntries.map(([colorName, colorValue]) => ({
      ...helper,
      postfix: helper.postfix ? helper.postfix : colorName,
      value: helper.value ? helper.value : colorValue,
    })),
  ), [] as ColorsCustomClassesConfig)
}

const getColorsCustomClassesStyles = (helpers: ColorsCustomClassesConfig) =>
  helpers.reduce((styles, helper) => {
    const style = [helper.property].flat().map(prop => `${prop}: ${helper.value};`).join('')

    styles += `.va-${helper.prefix}--${helper.postfix} { ${style} }`

    return styles
  }, '')

const handleConfigUpdate = (helpers: ColorsCustomClassesConfig, colors: ColorVariables) => {
  const coloredHelpers = getColorsCustomClassesHelpers(helpers, colors)

  addOrUpdateStyleElement(
    'va-color-helpers',
    () => getColorsCustomClassesStyles(coloredHelpers),
  )
}

export const ColorsCustomClassesPlugin = defineVuesticPlugin(() => ({
  install () {
    if (isServer()) { return }

    const { globalConfig } = useGlobalConfig()

    watch(() => globalConfig.value.colorsCustomClasses as ColorsCustomClassesConfig, (newHelpers: ColorsCustomClassesConfig) => {
      if (newHelpers.length) {
        handleConfigUpdate(newHelpers, globalConfig.value.colors.variables)
      }
    }, { immediate: true, deep: true })

    watch(() => globalConfig.value.colors.variables as ColorVariables, (newColors: ColorVariables) => {
      if (!newColors) { return }

      handleConfigUpdate(globalConfig.value.colorsCustomClasses as ColorsCustomClassesConfig, newColors)
    }, { immediate: true, deep: true })
  },
}))
