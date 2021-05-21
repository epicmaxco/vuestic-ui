import { watch } from 'vue'
import { useGlobalConfig } from '../global-config/global-config'
import { isServer } from '../../utils/ssr-utils'

export const setCSSVariable = (name: string, value: string, root: HTMLElement) => {
  root.style.setProperty(`--va-${name}`, value)
}

const ColorHelpersPlugin = {
  install () {
    if (isServer()) { return }

    const { globalConfig } = useGlobalConfig()

    const root = document.documentElement

    watch(() => globalConfig.value.colors, (newValue) => {
      if (!newValue) { return }

      const colorNames = Object.keys(newValue)
      colorNames.forEach((key) => {
        setCSSVariable(key, newValue[key], root)
      })
    }, { immediate: true, deep: true })
  },
}

export default ColorHelpersPlugin
