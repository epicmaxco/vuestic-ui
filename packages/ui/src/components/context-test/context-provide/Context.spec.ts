import { mergeConfigs, makeContextablePropsMixin } from './ContextPlugin'
import { shallowMount, mount } from '@vue/test-utils'
import VaContext from './VaContext'
import { h, VNode } from 'vue'

const ContextableComponentConfig = {
  mixins: [makeContextablePropsMixin({
    value: { default: 'one' },
  })],
  render: (): VNode => h(''),
}

describe('ContextPlugin', () => {
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

  describe('makeContextablePropsMixin', () => {
    it('context mixin doesn\'t interfere with props defaults', () => {
      const vm = shallowMount({
        mixins: [makeContextablePropsMixin({
          value: { default: 'one' },
        })],
        render: () => h(''),
      }).vm as any
      expect(vm.value).toBe('one')
      expect(vm.c_value).toBe('one')
    })
  })

  describe('VaContext', () => {
    it('context overrides default value', () => {
      const vm = mount({
        render: () => h(
          VaContext,
          { props: { config: { all: { value: 'two' } } } },
          [h(ContextableComponentConfig)],
        ),
      }).vm as any
      const contextableComponent = vm.$children[0].$children[0]
      expect(contextableComponent.value).toBe('one')
      expect(contextableComponent.c_value).toBe('two')
    })
  })
})
