import { mount } from '@vue/test-utils'

import {
  PartialGlobalConfig,
  useGlobalConfig,
  GLOBAL_CONFIG, createGlobalConfig,
} from '../../global-config/global-config'
import { GlobalConfigPlugin } from '../../global-config/plugin'
import { describe, it, expect, beforeEach } from 'vitest'

describe('GlobalConfigPlugin', () => {
  describe('setGlobalConfig', () => {
    let instance: any

    const initialConfig: PartialGlobalConfig = {
      colors: undefined,
      components: {
        VaComponent: { propValue: 'propValue' },
      } as any,
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

      const wrapper = mount(Component, {
        global: {
          provide: {
            [GLOBAL_CONFIG]: createGlobalConfig(),
          },
        },
      })

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
      instance.setGlobalConfig((config: PartialGlobalConfig) => ({
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
