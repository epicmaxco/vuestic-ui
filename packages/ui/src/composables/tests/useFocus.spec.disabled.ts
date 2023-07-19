import { useFocus } from '../useFocus'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import { describe, it, expect } from 'vitest'

// Disabled, because document.activeElement is not changing in jsdom
// See: https://github.com/jsdom/jsdom/issues/2586#issuecomment-627155416
describe('useFocus', () => {
  it(
    'focus & blur events should change isFocused value',
    async () => {
      const TestComponent = {
        template: '<p ref="content"></p>',
        setup () {
          const content = ref(null)
          const { isFocused } = useFocus(content)
          return { isFocused, content }
        },
      }

      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()
  
      await wrapper.trigger('focus')
      await wrapper.vm.$nextTick(async () => nextTick(() => expect(wrapper.vm.isFocused).toBe(true)))

      await wrapper.trigger('blur')
      await wrapper.vm.$nextTick(() => expect(wrapper.vm.isFocused).toBe(false))
    },
  )
})
