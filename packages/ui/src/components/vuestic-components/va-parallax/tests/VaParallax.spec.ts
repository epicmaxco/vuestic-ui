import { mount } from '@vue/test-utils'

import VaParallax from '../VaParallax.vue'

describe('VaParallax', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaParallax, { propsData: { src: '' } })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
