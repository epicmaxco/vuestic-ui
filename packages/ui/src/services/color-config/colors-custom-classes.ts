import { App, watch } from 'vue'
import { isServer } from '../../utils/ssr-utils'
import { addOrUpdateStyleElement } from '../dom-functions'
import { ColorsCustomClassesConfig } from './types'
import { defineVuesticPlugin } from '../../vuestic-plugin/types'
import { getGlobalProperty } from '../../vuestic-plugin/utils'
import { ColorConfig } from './color-config'

const getColoredHelpers = (helpers: ColorsCustomClassesConfig[], colors: ColorConfig): ColorsCustomClassesConfig[] => {
  const colorsEntries = Object.entries(colors)

  return helpers.reduce((acc, helper: ColorsCustomClassesConfig) => acc.concat(
    colorsEntries.map(([colorName, colorValue]) => ({
      ...helper,
      postfix: helper.postfix ? helper.postfix : colorName,
      value: helper.value ? helper.value : colorValue,
    })),
  ), [] as ColorsCustomClassesConfig[])
}

const getColorHelpersStyles = (helpers: ColorsCustomClassesConfig[]) => helpers.reduce((styles, helper) => {
  const style = [helper.property].flat().map(prop => `${prop}: ${helper.value};`).join('')

  styles += `.va-${helper.prefix}--${helper.postfix} { ${style} }`

  return styles
}, '')

const handleConfigUpdate = (helpers: ColorsCustomClassesConfig[], colors: ColorConfig) => {
  const coloredHelpers = getColoredHelpers(helpers, colors)

  addOrUpdateStyleElement('va-color-helpers', () => getColorHelpersStyles(coloredHelpers))
}

export const ColorsCustomClassesPlugin = defineVuesticPlugin(() => ({
  install (app: App) {
    if (isServer()) { return }

    const { globalConfig } = getGlobalProperty(app, '$vaConfig')

    watch(() => globalConfig.value.colorsCustomClasses as ColorsCustomClassesConfig[], (newHelpers: ColorsCustomClassesConfig[]) => {
      if (!newHelpers.length || !globalConfig.value.colors) { return }

      handleConfigUpdate(newHelpers, globalConfig.value.colors)
    }, { immediate: true, deep: true })

    watch(() => globalConfig.value.colors as ColorConfig, (newColors: ColorConfig) => {
      if (!newColors) { return }

      handleConfigUpdate(globalConfig.value.colorsCustomClasses as ColorsCustomClassesConfig[], newColors)
    }, { immediate: true, deep: true })
  },
}))
