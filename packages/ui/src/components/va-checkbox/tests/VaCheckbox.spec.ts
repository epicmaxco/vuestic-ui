import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig, shallowMountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaCheckbox from '../VaCheckbox.vue'

describe('VaCheckbox', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaCheckbox)
    expect(wrapper.exists()).toBeTruthy()
  })

  // it('default', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaCheckbox, {
  //     propsData: { value: false },
  //   })
  //   expect(wrapper.html()).toMatchSnapshot()
  // })
  // it('true value', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaCheckbox, {
  //     propsData: { value: true },
  //   })
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  it('has indeterminate class', () => {
    const wrapper = mountWithGlobalConfig(VaCheckbox, {
      propsData: { indeterminate: true },
    })

    expect(wrapper.classes()).toContain('va-checkbox--indeterminate')
  })

  it('computedClass defined', () => {
    const wrapper = shallowMountWithGlobalConfig(VaCheckbox)
    expect((wrapper.vm as any).computedClass).toBeDefined()
  })

  it('computedIconName should be "va-check" ', () => {
    const wrapper = shallowMountWithGlobalConfig(VaCheckbox)
    expect((wrapper.vm as any).computedIconName).toBe('va-check')
  })
})
