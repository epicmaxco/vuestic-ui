import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'
import { NOT_PROVIDED, useUserProvidedProp } from './useUserProvidedProp'

const TestComponentRich = defineComponent({
  template: '<p></p>',
  props: { modelValue: { type: String } },
  setup (props) {
    const providedProp = useUserProvidedProp('modelValue', props)

    return {
      providedProp,
    }
  },
  emits: ['update:modelValue'],
})

describe('useUserProvidedProp', () => {
  it('should react to prop change', async () => {
    const wrapper = mount(TestComponentRich, { props: { stateful: true } } as any)
    expect(wrapper.vm.providedProp).toBe(NOT_PROVIDED)

    await wrapper.setProps({ modelValue: 'Hello' })
    expect(wrapper.vm.providedProp).toBe('Hello')
  })
})
