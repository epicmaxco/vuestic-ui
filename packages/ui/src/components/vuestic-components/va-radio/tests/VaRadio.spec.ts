import { mount } from '@vue/test-utils'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'

import VaRadio from '../VaRadio.vue'

describe('VaRadio', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaRadio)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaRadio as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
