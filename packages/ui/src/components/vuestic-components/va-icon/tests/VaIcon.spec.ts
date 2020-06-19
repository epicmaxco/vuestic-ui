import { mount } from '@vue/test-utils'
import VaIcon from '../VaIcon.vue'

describe('VaIcon', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaIcon)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
