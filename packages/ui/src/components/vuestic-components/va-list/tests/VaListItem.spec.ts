import { mount, shallowMount } from '@vue/test-utils'
import { testHasRouterLinkMixin } from './../../../vuestic-mixins/RouterLinkMixin/testHasRouterLinkMixin'
import { testHasKeyboardOnlyFocusMixin } from '../../../vuestic-mixins/KeyboardOnlyFocusMixin/testHasKeyboardOnlyFocusMixin'

import VaListItem from '../VaListItem.vue'
import { RouterLinkMixin } from '../../../vuestic-mixins/RouterLinkMixin/RouterLinkMixin'
import { KeyboardOnlyFocusMixin } from '../../../vuestic-mixins/KeyboardOnlyFocusMixin/KeyboardOnlyFocusMixin'

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

  it('has KeyboardOnlyFocusMixin', () => {
    expect(() =>
      testHasKeyboardOnlyFocusMixin((VaListItem as unknown) as KeyboardOnlyFocusMixin),
    ).not.toThrow()
  })
})
