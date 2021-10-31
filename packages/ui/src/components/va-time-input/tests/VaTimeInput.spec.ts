import { mount } from '@vue/test-utils'

import VaTimeInput from '../VaTimeInput.vue'

describe('VaTimeInput', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaTimeInput)
    expect(wrapper.findComponent('VaTimeInput')).toBeTruthy()
  })
})
