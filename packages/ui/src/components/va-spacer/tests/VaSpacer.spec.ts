import { mount } from '@vue/test-utils'

import VaSpacer from '../VaSpacer.vue'

describe('VaSpacer', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaSpacer)
    expect(wrapper.findComponent('VaSpacer')).toBeTruthy()
  })
})
