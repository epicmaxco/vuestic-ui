import { mount, config } from '@vue/test-utils'

import GlobalConfigPlugin, {
  GlobalConfig, useGlobalConfig,
} from './GlobalConfigPlugin'

config.global.plugins.push([GlobalConfigPlugin])

describe('GlobalConfigPlugin', () => {
  describe('setGlobalConfig', () => {
    let instance: any

    const initialConfig = {
      theme: undefined,
      all: { value: 'value' },
      VaComponent: { propValue: 'propValue' },
    }

    beforeEach(() => {
      const Component = {
        setup () {
          return {
            ...useGlobalConfig(),
          }
        },
        render () {
          return null
        },
      }

      const wrapper = mount(Component)

      instance = wrapper.vm

      instance.setGlobalConfig(initialConfig)
    })

    it("should update the global config with a partial user's config", () => {
      expect(instance.getGlobalConfig()).toStrictEqual(initialConfig)

      const partialConfig = {
        all: {
          value: 'newValue',
        },
      }

      instance.setGlobalConfig(partialConfig)

      const nextConfig = {
        ...initialConfig,
        ...partialConfig,
      }

      expect(instance.getGlobalConfig()).toStrictEqual(nextConfig)
    })

    it("should update the global config with a user's update function", () => {
      const prefix = 'prefix'
      const anotherComponentConfig = {
        VaAnotherComponent: { propValue: 'propValue' },
      }

      instance.setGlobalConfig((config: GlobalConfig) => ({
        ...config,
        all: { value: `${prefix}${config.all?.value}` },
        ...anotherComponentConfig,
      }))

      const nextConfig = {
        ...initialConfig,
        all: { value: `${prefix}${initialConfig.all.value}` },
        ...anotherComponentConfig,
      }

      expect(instance.getGlobalConfig()).toStrictEqual(nextConfig)
    })
  })
})
