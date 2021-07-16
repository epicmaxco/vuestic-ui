import { mount } from '@vue/test-utils'

import VaPopover from '../VaPopover.vue'

describe('VaPopover', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaPopover)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
