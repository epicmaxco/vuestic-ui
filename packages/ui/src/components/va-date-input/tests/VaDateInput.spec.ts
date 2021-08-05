import { mount } from '@vue/test-utils'

import VaDateInput from '../VaDateInput.vue'

describe('VaDateInput', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaDateInput)
    expect(wrapper.findComponent('VaDateInput')).toBeTruthy()
  })
})
