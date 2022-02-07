import { mount } from '@vue/test-utils'

import VaDatePicker from '../VaDatePicker.vue'

describe('VaDatePicker', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaDatePicker)
    expect(wrapper.findComponent(VaDatePicker)).toBeTruthy()
  })
})
