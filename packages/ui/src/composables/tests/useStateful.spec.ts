import { useStateful, useStatefulProps } from '../useStateful'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { defineComponent } from 'vue'

const TestComponentRich = defineComponent({
  template: '<p></p>',
  props: { ...useStatefulProps },
  setup (props, { emit }) {
    const valueComputed = useStateful(props, emit)

    return {
      valueComputed,
    }
  },
  emits: ['update:modelValue'],
})

describe('useStateful', () => {
  // stateful
  //   value updates on internal value change attempt

  // both
  //   should react to prop change
  //   should emit on internal value change attempt

  it.each([
    /* eslint-disable */
   // stateful | valueToSet | internalValue
    [ true,      true,        true      ],
    [ false,     true,        undefined ],
    /* eslint-enable */
  ])('stateful %s', async (stateful: boolean, valueToSet: boolean, internalValue?: boolean) => {
    const wrapper = mount(TestComponentRich, { props: { stateful } })
    wrapper.vm.valueComputed = valueToSet
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.vm.valueComputed).toBe(internalValue)

    await wrapper.setProps({ modelValue: false })
    expect(wrapper.vm.valueComputed).toBe(false)
  })

  it('should react to prop change', async () => {
    const wrapper = mount(TestComponentRich, { props: { stateful: true, modelValue: 'Hello!' } })
    expect(wrapper.vm.valueComputed).toBe('Hello!')
  })
})
