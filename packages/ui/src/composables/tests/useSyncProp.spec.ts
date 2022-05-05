import { useSyncProp } from '../useSyncProp'
import { mount } from '@vue/test-utils'

const TestComponent = {
  template: '<p></p>',
  props: {
    modelValue: {
      type: Number,
    },
  },
}

describe('useSyncProp', () => {
  it(
    'should return prop value and then emit new value',
    async () => {
      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()
      const emit = wrapper.vm.$emit

      await wrapper.setProps({ modelValue: 1 })

      const [modelValue] = useSyncProp('modelValue', wrapper.props(), emit)
      expect(modelValue.value).toBe(1)

      modelValue.value = 0
      expect((wrapper.emitted()['update:modelValue'] as Array<Array<Array<number>>>)[0][0]).toBe(0)
    },
  )

  it(
    'should return default value',
    () => {
      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()
      const emit = wrapper.vm.$emit

      const [modelValue] = useSyncProp('modelValue', wrapper.props(), emit, 0)
      expect(modelValue.value).toBe(0)
    },
  )
})
