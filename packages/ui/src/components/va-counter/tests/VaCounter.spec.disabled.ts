import VaCounter from '../VaCounter.vue'
import { mount } from '@vue/test-utils'

describe('VaInput', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaCounter)
    expect(wrapper.exists()).toBeTruthy()
  })
})
