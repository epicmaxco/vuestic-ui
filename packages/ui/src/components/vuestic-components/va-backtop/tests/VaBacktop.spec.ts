import { mount } from '@vue/test-utils'

import VaBacktop from '../VaBacktop.vue'

describe('VaBacktop', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaBacktop)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
