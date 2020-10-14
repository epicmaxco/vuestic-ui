import { CreateElement } from 'vue'
import { shallowMount, mount } from '@vue/test-utils'
import { makeConfigTransportMixin } from '../../../../services/config-transport/makeConfigTransportMixin'
import VaConfig, { mergeConfigs } from '../VaConfig'

const ComponentConfig = {
  mixins: [makeConfigTransportMixin({
    value: { default: 'one' },
  })],
  render: (h: CreateElement) => h(''),
}

describe('ConfigTransportMixin', () => {
  it('mergeConfigs', () => {
    const configA = {
      A: { A: 'A' },
      AB: {
        A: 'A',
        AB: 'A',
      },
    }
    const configB = {
      AB: {
        AB: 'B',
        B: 'B',
      },
      B: { B: 'B' },
    }

    expect(mergeConfigs(configA, configB)).toEqual({
      A: { A: 'A' },
      AB: {
        A: 'A',
        AB: 'B',
        B: 'B',
      },
      B: { B: 'B' },
    })
  })

  describe('makeConfigTransportMixin', () => {
    it('config mixin doesn\'t interfere with props defaults', () => {
      const vm = shallowMount({
        mixins: [makeConfigTransportMixin({
          value: { default: 'one' },
        })],
        render: h => h(''),
      }).vm as any
      expect(vm.value).toBe('one')
      expect(vm.c_value).toBe('one')
    })
  })

  describe('VaConfig', () => {
    it('config overrides default value', () => {
      const vm = mount({
        render: (h: CreateElement) => h(
          VaConfig,
          { props: { config: { all: { value: 'two' } } } },
          [h(ComponentConfig)],
        ),
      }).vm as any
      const componentWithConfig = vm.$children[0].$children[0]
      expect(componentWithConfig.value).toBe('one')
      expect(componentWithConfig.c_value).toBe('two')
    })
  })
})
