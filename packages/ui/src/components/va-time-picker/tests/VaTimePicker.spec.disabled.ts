import { mount } from '@vue/test-utils'

import { VaTimePicker } from '..'

describe('VaTimePicker', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaTimePicker)
    expect(wrapper.findComponent(VaTimePicker)).toBeTruthy()
  })
})
