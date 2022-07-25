import { mount } from '@vue/test-utils'

import VaDropdown from '../VaDropdown.vue'

describe('VaDropdown', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaDropdown)
    expect(wrapper.findComponent('VaDropdown')).toBeTruthy()
  })
})
