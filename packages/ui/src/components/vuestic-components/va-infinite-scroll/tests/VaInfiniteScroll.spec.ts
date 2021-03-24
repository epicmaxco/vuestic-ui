import Vue from 'vue'
import { shallowMount, mount } from '@vue/test-utils'

import VaInfiniteScroll from '../VaInfiniteScroll.vue'

import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'

import { ColorThemePlugin } from '../../../../services/color-config/ColorMixin'
import { ContextPlugin } from '../../../context-test/context-provide/ContextPlugin'

// @ts-ignore
Vue.use(ColorThemePlugin)
// @ts-ignore
Vue.use(ContextPlugin, {})

describe('VaInfiniteScroll', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaInfiniteScroll)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is contextable', () => {
    const props = {
      tag: 'ul',
      offset: 300,
      reverse: true,
      disabled: true,
      scrollTarget: '.scroll__container',
      debounce: 200,
    }
    expect(() => testIsContextableComponent(VaInfiniteScroll, props)).not.toThrow()
  })

  it('default snapshot', () => {
    const wrapper = shallowMount(VaInfiniteScroll)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
