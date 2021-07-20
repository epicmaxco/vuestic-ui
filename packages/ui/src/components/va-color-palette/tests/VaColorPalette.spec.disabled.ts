import { mount } from '@vue/test-utils'

import VaColorPalette from '../VaColorPalette.vue'

describe('VaColorPalette', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaColorPalette)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
