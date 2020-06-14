import { mount } from '@vue/test-utils'

// @ts-ignore
import VaSlider from '../VaSlider.vue'

describe('VaSlider', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaSlider)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
