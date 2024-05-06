import { computed, watch } from 'vue'

import { isServer } from '../../../utils/ssr'
import { useGlobalConfig } from '../../../composables/useGlobalConfig'
import { defineGlobalProperty, defineVuesticPlugin } from '../../vue-plugin/utils'
import { addOrUpdateStyleElement } from '../../../utils/dom'

import { ComponentConfig } from '../types'
import { generateUniqueId } from '../../../utils/uuid'
import { renderComponentsStyles } from '../utils/render-styles-from-config'

const handleConfigUpdate = (config: Partial<ComponentConfig>, styleId: string) => {
  addOrUpdateStyleElement(
    `va-component-classes-${styleId}`,
    () => renderComponentsStyles(config),
  )
}

const createComponentConfigPlugin = () => {
  if (isServer()) { return }

  const { globalConfig } = useGlobalConfig()

  const uniqueId = computed(generateUniqueId)

  watch(() => globalConfig.value.components, (components) => {
    if (components) {
      handleConfigUpdate(components, uniqueId.value)
    }
  }, { immediate: true, deep: true })

  return {
    renderStyles: () => {
      return renderComponentsStyles(globalConfig.value.components)
    },
  }
}

export const ComponentConfigPlugin = defineVuesticPlugin(() => ({
  install (app) {
    defineGlobalProperty(app, '$vaComponentConfig', createComponentConfigPlugin())
  },
}))

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $vaComponentConfig: ReturnType<typeof createComponentConfigPlugin>
  }
}
