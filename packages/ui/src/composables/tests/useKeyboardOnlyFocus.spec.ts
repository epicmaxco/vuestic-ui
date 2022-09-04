import { useKeyboardOnlyFocus } from '../useKeyboardOnlyFocus'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('useKeyboardOnlyFocus', () => {
  it(
    'keyboard focus & blur should change hasKeyboardFocus value',
    async () => {
      const TestComponent = {
        template: '<p v-on="keyboardFocusListeners"></p>',
        setup () {
          return useKeyboardOnlyFocus()
        },
      }

      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()

      await wrapper.trigger('focus')
      await wrapper.vm.$nextTick(() => expect(wrapper.vm.hasKeyboardFocus).toBe(true))

      await wrapper.trigger('blur')
      await wrapper.vm.$nextTick(() => expect(wrapper.vm.hasKeyboardFocus).toBe(false))

      await wrapper.trigger('mousedown')
      await wrapper.trigger('focus')
      await wrapper.vm.$nextTick(() => expect(wrapper.vm.hasKeyboardFocus).toBe(false))
    },
  )
})
