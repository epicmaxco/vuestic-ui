import { mount } from '@vue/test-utils'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorMixin } from '../../../../services/color-config/ColorMixin'

import VaTabs from '../VaTabs.vue'

describe('VaTabs', () => {
  // it('should render without an error', () => {
  //   const wrapper = mount(VaTabs)
  //   expect(wrapper.isVueInstance()).toBeTruthy()
  // })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaTabs as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
