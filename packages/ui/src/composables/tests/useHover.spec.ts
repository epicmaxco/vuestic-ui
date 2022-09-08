import { useHover } from '../useHover'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { describe, it, expect } from 'vitest'

describe('useHover', () => {
  it('mouse enter & leave should change isHovered value', async () => {
    const TestComponent = {
      template: '<p ref="content">test test</p>',
      setup () {
        const content = ref(null)
        const { isHovered } = useHover(content)
        return { isHovered, content }
      },
    }

    const wrapper = mount(TestComponent)
    expect(wrapper.exists()).toBeTruthy()
    await wrapper.vm.$nextTick()

    await wrapper.trigger('mouseenter')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isHovered).toBe(true)

    await wrapper.trigger('mouseleave')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isHovered).toBe(false)
  })
})
