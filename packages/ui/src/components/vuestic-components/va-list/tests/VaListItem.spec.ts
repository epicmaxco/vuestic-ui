import { mount, shallowMount } from '@vue/test-utils'
import { testHasRouterLinkMixin } from './../../../vuestic-mixins/RouterLinkMixin/testHasRouterLinkMixin'

import VaListItem from '../VaListItem.vue'
import { RouterLinkMixin } from 'src/components/vuestic-mixins/RouterLinkMixin/RouterLinkMixin'

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
  it('has RouterLinkMixin', () => {
    expect(() =>
      testHasRouterLinkMixin((VaListItem as unknown) as RouterLinkMixin),
    ).not.toThrow()
  })
})
