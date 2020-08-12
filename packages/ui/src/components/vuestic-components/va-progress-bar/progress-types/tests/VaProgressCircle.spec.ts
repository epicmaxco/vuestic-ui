import { mount } from '@vue/test-utils'

import VaProgressCircle from '../VaProgressCircle.vue'
import { testHasColorThemeMixin } from '../../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../../../services/ColorThemePlugin'

describe('VaProgressCircle', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaProgressCircle)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaProgressCircle as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
