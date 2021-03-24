import { mount, shallowMount } from '@vue/test-utils'

import VaPagination from '../VaPagination.vue'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorMixin } from '../../../../services/color-config/ColorMixin'
describe('VaPagination', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaPagination)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaPagination as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
