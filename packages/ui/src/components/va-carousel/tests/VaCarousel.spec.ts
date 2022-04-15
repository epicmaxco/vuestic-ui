import { mount } from '@vue/test-utils'

import VaCarousel from '../VaCarousel.vue'

describe('VaCarousel', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaCarousel)
    expect(wrapper.findComponent('VaCarousel')).toBeTruthy()
  })
})
