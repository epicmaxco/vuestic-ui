import { mount } from '@vue/test-utils'
import VaBadge from '../VaBadge.vue'

describe('VaBadge', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaBadge)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
