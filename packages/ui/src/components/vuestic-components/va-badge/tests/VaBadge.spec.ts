import { mount } from '@vue/test-utils'
import VaBadge from '../VaBadge.vue'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'

describe('VaBadge', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaBadge)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaBadge as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
