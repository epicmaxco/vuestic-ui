import { mount } from '@vue/test-utils'

import VaColorInput from '../VaColorInput.vue'

describe('VaColorInput', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaColorInput)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
