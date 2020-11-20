import { mount } from '@vue/test-utils'
import VaDivider from '../VaDivider.vue'

describe('VaDivider', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaDivider)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
