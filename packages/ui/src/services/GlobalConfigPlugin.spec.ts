import { mount, config } from '@vue/test-utils'

import {
  GlobalConfigPlugin,
  GlobalConfig,
  useGlobalConfig,
} from './GlobalConfigPlugin'

config.global.plugins.push([GlobalConfigPlugin])

describe('GlobalConfigPlugin', () => {
  describe('setGlobalConfig', () => {
    let instance: any

    const initialConfig: GlobalConfig = {
      colors: undefined,
      components: {
        VaComponent: { propValue: 'propValue' },
      },
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

    it('overridable by object', () => {
      const partialConfig = {
        components: {
          VaComponent: {
            propValue: 'newPropValue',
          },
        },
      }

      instance.setGlobalConfig(partialConfig)

      expect(instance.getGlobalConfig().components.VaComponent.propValue).toBe('newPropValue')
    })

    it('overridable by function', () => {
      instance.setGlobalConfig((config: GlobalConfig) => ({
        components: {
          VaComponent: {
            propValue: 'newPropValue',
          },
        },
      }))

      expect(instance.getGlobalConfig().components.VaComponent.propValue).toBe('newPropValue')
    })
  })
})
