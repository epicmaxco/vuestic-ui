import { mount } from '@vue/test-utils'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorMixin } from '../../../../services/color-config/ColorMixin'

import VaSlider from '../VaSlider.vue'

describe('VaSlider', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaSlider)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaSlider as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
