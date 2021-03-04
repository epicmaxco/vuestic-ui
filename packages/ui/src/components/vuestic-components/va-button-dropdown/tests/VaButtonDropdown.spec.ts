import VaButtonDropdown from '../VaButtonDropdown.vue'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorMixin } from '../../../../services/color-config/ColorMixin'

describe('VaButtonDropdown', () => {
  // it('should render without an error', () => {
  //   const wrapper = mount(VaButtonDropdown)
  //   expect(wrapper.isVueInstance()).toBeTruthy()
  // })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaButtonDropdown as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
