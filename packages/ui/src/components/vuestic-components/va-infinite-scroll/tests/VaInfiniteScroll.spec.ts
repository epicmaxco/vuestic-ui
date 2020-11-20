import { shallowMount, mount } from '@vue/test-utils'

import VaInfiniteScroll from '../VaInfiniteScroll.vue'

describe('VaInfiniteScroll', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaInfiniteScroll)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('default snapshot', () => {
    const wrapper = shallowMount(VaInfiniteScroll)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
