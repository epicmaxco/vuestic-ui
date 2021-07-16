import { mount } from '@vue/test-utils'
import VaButtonToggle from '../VaButtonToggle.vue'

describe('VaButtonToggle', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaButtonToggle)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
