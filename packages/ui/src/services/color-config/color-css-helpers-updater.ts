import { watch } from 'vue'
import { useGlobalConfig } from '../global-config/global-config'
import { isServer } from '../../utils/ssr-utils'
import { addOrUpdateStyleElement } from '../dom-functions'

export type HelperConfig = {
  stylePrefix?: string;
  stylePostfix?: string;
  styleProperty?: string;
  styleValue?: string;
}

export let helperConfigValues: HelperConfig[] = [
  {
    stylePrefix: 'bg',
    styleProperty: 'background-color',
  },
  {
    stylePrefix: 'text',
    styleProperty: 'color',
  },
  {
    stylePrefix: 'fill',
    styleProperty: 'fill',
  },
]

const renderHelperPresets = (newColors: any) => {
  return Object.entries(newColors).map(color => {
    return helperConfigValues.map(value => ({
      ...value,
      stylePostfix: color[0],
      styleValue: color[1],
    }))
  }).flat()
}

export const renderCSSHelpers = (helpers: HelperConfig[]) => {
  let resultHelperClasses = ''

  helpers.forEach((helper: HelperConfig) => {
    resultHelperClasses += `.va-${helper.stylePrefix}--${helper.stylePostfix} {${helper.styleProperty}: ${helper.styleValue};}`
  })

  return resultHelperClasses
}

const ColorHelpersPlugin = {
  install () {
    if (isServer()) {
      return
    }

    const { globalConfig } = useGlobalConfig()

    watch(() => globalConfig.value.classHelpers as HelperConfig[], (newValue: HelperConfig[]) => {
      if (!newValue || !globalConfig.value.colors) {
        return
      }

      helperConfigValues = [...helperConfigValues, ...newValue]
      const helpers = renderHelperPresets(globalConfig.value.colors)
      addOrUpdateStyleElement('va-css-helpers', () => renderCSSHelpers(helpers as HelperConfig[]))
    }, { immediate: true, deep: true })

    watch(() => globalConfig.value.colors, (newValue) => {
      if (!newValue) {
        return
      }

      const helpers = renderHelperPresets(newValue)
      addOrUpdateStyleElement('va-css-helpers', () => renderCSSHelpers(helpers as HelperConfig[]))
    }, { immediate: true, deep: true })
  },
}

export default ColorHelpersPlugin
