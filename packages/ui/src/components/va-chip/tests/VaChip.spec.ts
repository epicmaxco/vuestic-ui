import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig, shallowMountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaChip from '../VaChip.vue'

describe('VaChip', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaChip)
    expect(wrapper.exists()).toBeTruthy()
  })
  /* 2. Button sizes */

  // it('large chip', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaChip, {
  //     propsData: { size: 'large' },
  //   })
  //   expect(wrapper.classes()).toContain('va-chip--large')
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  // it('small chip', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaChip, {
  //     propsData: { size: 'small' },
  //   })
  //   expect(wrapper.classes()).toContain('va-chip--small')
  //   expect(wrapper.html()).toMatchSnapshot()
  // })

  // it('should be a link', () => {
  //   const wrapper = shallowMountWithGlobalConfig(VaChip, {
  //     propsData: {
  //       href: '/',
  //     },
  //   })
  //   expect(wrapper.element.tagName).toBe('A')
  // })
})
