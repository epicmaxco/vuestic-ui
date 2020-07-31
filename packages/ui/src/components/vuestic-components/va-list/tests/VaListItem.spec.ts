import { mount, shallowMount } from '@vue/test-utils'

import VaListItem from '../VaListItem.vue'

describe('VaListItem', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaListItem)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('should be a link', () => {
    const wrapper = shallowMount(VaListItem, {
      propsData: {
        href: '/'
      },
    })
    expect(wrapper.is('a')).toBe(true)
  })
})
