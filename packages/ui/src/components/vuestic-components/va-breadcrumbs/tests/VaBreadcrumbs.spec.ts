import { mount } from '@vue/test-utils'
import VaBreadcrumbs from '../VaBreadcrumbs.vue'

describe('VaBreadcrumbs', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaBreadcrumbs)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
