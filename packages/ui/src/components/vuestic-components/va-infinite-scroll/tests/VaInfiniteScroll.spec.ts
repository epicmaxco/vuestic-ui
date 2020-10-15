import { shallowMount, mount } from '@vue/test-utils'

import VaInfiniteScroll from '../VaInfiniteScroll.vue'

import { testIsConfigProvidedComponent } from '../../../../services/config-transport/testIsConfigProvidedComponent'

describe('VaInfiniteScroll', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaInfiniteScroll)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is configurable', () => {
    const props = {
      tag: 'ul',
      offset: 300,
      reverse: true,
      disabled: true,
      scrollTarget: '.scroll__container',
      debounce: 200,
    }
    expect(() => testIsConfigProvidedComponent(VaInfiniteScroll, props)).not.toThrow()
  })

  it('default snapshot', () => {
    const wrapper = shallowMount(VaInfiniteScroll)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
