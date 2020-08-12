import { mount } from '@vue/test-utils'
import VaBreadcrumbs from '../VaBreadcrumbs.vue'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'

describe('VaBreadcrumbs', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaBreadcrumbs)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaBreadcrumbs as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
