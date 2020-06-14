import { mount } from '@vue/test-utils'

// @ts-ignore
import VaProgressBar from '../VaProgressBar.vue'

describe('VaProgressBar', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaProgressBar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
