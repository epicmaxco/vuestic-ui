import { mount } from '@vue/test-utils'

import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'

import VaAppBar from '../VaAppBar.vue'

describe('VaAppBar', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAppBar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaAppBar as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
