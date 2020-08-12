import { mount } from '@vue/test-utils'
import { testHasColorThemeMixin } from '../../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../../../services/ColorThemePlugin'
import VaProgressBar from '../VaProgressBar.vue'

describe('VaProgressBar', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaProgressBar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaProgressBar as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
