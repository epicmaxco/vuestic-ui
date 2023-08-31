import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig, shallowMountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaCollapse from '../VaCollapse.vue'

describe('VaCollapse', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaCollapse)
    expect(wrapper.exists()).toBeTruthy()
  })

  it('should have appropriate classes class', () => {
    const wrapper = shallowMountWithGlobalConfig(VaCollapse, {
      propsData: {
        modelValue: true,
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('va-collapse--disabled')
    expect(wrapper.classes()).toContain('va-collapse--active')
  })

  // it('should emit `input`', async () => {
  //   const wrapper: any = shallowMountWithGlobalConfig(VaCollapse)
  //   await wrapper.vm.changeValue()
  //   expect(wrapper.emitted().input.length).toBe(1)
  // })

  // it('should emit `focus`', async () => {
  //   const wrapper: any = shallowMountWithGlobalConfig(VaCollapse)
  //   await wrapper.trigger('focus')
  //   expect(wrapper.emitted().focus.length).toBe(1)
  // })

  // it('should be triggered on mousedown', async () => {
  //   const wrapper: any = shallowMountWithGlobalConfig(VaCollapse)
  //   const collapseHeader = wrapper.find('.va-collapse__header')

  //   await collapseHeader.trigger('mousedown')
  //   expect(wrapper.vm.hasMouseDown).toBe(true)
  //   await collapseHeader.trigger('mouseup')
  //   expect(wrapper.vm.hasMouseDown).toBe(false)
  // })
})
