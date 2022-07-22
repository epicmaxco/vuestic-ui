import { useHover } from '../useHover'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { describe, it, expect } from 'vitest'

// TODO Test broken. Getting error.
describe.skip('useHover', () => {
  it(
    'mouse enter & leave should change isHovered value',
    async () => {
      const TestComponent = {
        template: '<p ref="content"></p>',
        setup () {
          const content = ref(null)
          const { isHovered } = useHover(content)
          return { isHovered, content }
        },
      }

      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()

      await wrapper.trigger('mouseenter')
      await wrapper.vm.$nextTick(() => expect(wrapper.vm.isHovered).toBe(true))

      await wrapper.trigger('mouseleave')
      await wrapper.vm.$nextTick(() => expect(wrapper.vm.isHovered).toBe(false))
    },
  )
})
