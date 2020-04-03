import VaInfiniteScroll from './VaInfiniteScroll'
import { testIsContextableComponent } from '../../context-test/context-provide/testIsContextableComponent'
import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'

import { ColorThemePlugin } from '../../../services/ColorThemePlugin'
import { ContextPlugin } from '../../context-test/context-provide/ContextPlugin'

Vue.use(ColorThemePlugin)
Vue.use(ContextPlugin, {})

describe('VaInfiniteScroll', () => {
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
