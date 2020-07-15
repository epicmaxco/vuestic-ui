import { mount } from '@vue/test-utils'

import VaProgressBar from '../VaProgressBar.vue'

describe('VaProgressBar', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaProgressBar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
