import Vue, { CreateElement, ComponentOptions } from 'vue'
import { createLocalVue, mount } from '@vue/test-utils'

import {
  GlobalConfigPlugin,
  setGlobalConfig,
  ContextConfig,
} from './GlobalConfigPlugin'

function mountWithPlugin (
  component: ComponentOptions<Vue>,
  options: ContextConfig,
) {
  const _Vue = createLocalVue()
  _Vue.use(GlobalConfigPlugin, options)

  return mount(component, {
    localVue: _Vue,
  })
}

describe('GlobalConfigPlugin', () => {
  describe('setGlobalConfig', () => {
    let instance: any

    const initialConfig = {
      all: { value: 'value' },
      VaComponent: { propValue: 'propValue' },
    }

    beforeEach(() => {
      const wrapper = mountWithPlugin(
        {
          render (h: CreateElement) {
            return h('')
          },
        },
        initialConfig,
      )

      instance = wrapper.vm
    })

    it("should update the global config with a partial user's config", () => {
      expect(instance.$vaGlobalConfig).toStrictEqual(initialConfig)

      const partialConfig = {
        all: {
          value: 'newValue',
        },
      }

      setGlobalConfig(partialConfig)

      expect(instance.$vaGlobalConfig).toStrictEqual({
        ...initialConfig,
        ...partialConfig,
      })
    })

    it("should update the global config with a user's update function", () => {
      const prefix = 'prefix'
      const anotherComponentConfig = {
        VaAnotherComponent: { propValue: 'propValue' },
      }

      setGlobalConfig((config) => ({
        ...config,
        all: { value: `${prefix}${config.all.value}` },
        ...anotherComponentConfig,
      }))

      expect(instance.$vaGlobalConfig).toStrictEqual({
        ...initialConfig,
        all: { value: `${prefix}${initialConfig.all.value}` },
        ...anotherComponentConfig,
      })
    })
  })
})
