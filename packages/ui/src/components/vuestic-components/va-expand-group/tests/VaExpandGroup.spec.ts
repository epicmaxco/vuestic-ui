import { mount } from '@vue/test-utils'

import VaExpandGroup from '../VaExpandGroup.vue'

describe('VaExpandGroup', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaExpandGroup)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
