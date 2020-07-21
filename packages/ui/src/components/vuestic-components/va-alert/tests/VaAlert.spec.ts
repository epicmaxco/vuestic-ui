import { mount } from '@vue/test-utils'

import VaAlert from '../VaAlert.vue'

describe('VaAlert', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAlert)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
