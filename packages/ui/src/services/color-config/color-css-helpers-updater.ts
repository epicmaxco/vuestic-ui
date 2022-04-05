import { watch } from 'vue'
import { useGlobalConfig } from '../global-config/global-config'
import { isServer } from '../../utils/ssr-utils'
import { addOrUpdateStyleElement } from '../dom-functions'
import type { ColorConfig } from './color-config'

export type HelperConfig = {
  stylePrefix: string;
  styleProperty: string;
}

export const helperConfigValues: HelperConfig[] = [
  {
    stylePrefix: 'bg',
    styleProperty: 'background-color',
  },
  {
    stylePrefix: 'text',
    styleProperty: 'color',
  },
]

export const renderCSSHelpers = (helpers: ColorConfig) => {
  const helperNames = Object.keys(helpers)
  let resultHelperClasses = ''

  helperNames.forEach((key) => {
    helperConfigValues.forEach((helper: ColorConfig) => {
      resultHelperClasses += `.${helper.stylePrefix}--${key} {${helper.styleProperty}: ${helpers[key]};}`
    })
  })

  return resultHelperClasses
}

const ColorHelpersPlugin = {
  install () {
    if (isServer()) {
      return
    }

    const { globalConfig } = useGlobalConfig()

    watch(() => globalConfig.value.classHelpers, (newValue) => {
      if (!newValue) {
        return
      }

      addOrUpdateStyleElement('css-helpers', () => renderCSSHelpers(newValue))
    }, { immediate: true, deep: true })
  },
}

export default ColorHelpersPlugin
