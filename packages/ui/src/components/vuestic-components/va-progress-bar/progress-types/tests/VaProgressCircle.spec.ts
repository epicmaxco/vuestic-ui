import { mount } from '@vue/test-utils'

// @ts-ignore
import VaProgressCircle from '../VaProgressCircle.vue'

describe('VaProgressCircle', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaProgressCircle)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
