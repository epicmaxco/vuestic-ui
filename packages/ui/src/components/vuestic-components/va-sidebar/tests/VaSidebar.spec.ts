import { mount } from '@vue/test-utils'

import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorMixin } from '../../../../services/color-config/ColorMixin'

import VaSidebar from '../VaSidebar.vue'

describe('VaSidebar', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaSidebar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaSidebar as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
