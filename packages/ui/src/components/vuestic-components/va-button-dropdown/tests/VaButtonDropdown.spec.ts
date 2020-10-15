import { mount } from '@vue/test-utils'
import VaButtonDropdown from '../VaButtonDropdown.vue'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../vuestic-mixins/ColorMixin'

describe('VaButtonDropdown', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaButtonDropdown)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaButtonDropdown as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
