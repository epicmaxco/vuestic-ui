import { mount } from '@vue/test-utils'

import VaNavbar from '../VaNavbar.vue'

describe('VaNavbar', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaNavbar)
    expect(wrapper.findComponent('VaNavbar')).toBeTruthy()
  })
})
