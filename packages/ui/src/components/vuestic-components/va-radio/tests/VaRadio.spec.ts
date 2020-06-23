import { mount } from '@vue/test-utils'

import VaRadio from '../VaRadio.vue'

describe('VaRadio', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaRadio)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
