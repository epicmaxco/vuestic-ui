import { mount } from '@vue/test-utils'
import VaTag from '../VaTag.vue'

describe('VaTag', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaTag)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
