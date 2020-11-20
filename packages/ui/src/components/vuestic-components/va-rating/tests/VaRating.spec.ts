import { mount, shallowMount } from '@vue/test-utils'

import { testHasStatefulMixin } from '../../../vuestic-mixins/StatefulMixin/testHasStatefulMixin'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../vuestic-mixins/ColorMixin'
import VaRating from '../VaRating.vue'

describe('VaRating', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaRating)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('default', () => {
    const wrapper = shallowMount(VaRating)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('custom length', () => {
    const wrapper = shallowMount(VaRating, {
      propsData: { max: 3 },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('numbers', () => {
    const wrapper = shallowMount(VaRating, {
      propsData: { numbers: true },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('has stateful mixin', () => {
    expect(() => testHasStatefulMixin(VaRating as any)).not.toThrow()
  })

  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaRating as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
