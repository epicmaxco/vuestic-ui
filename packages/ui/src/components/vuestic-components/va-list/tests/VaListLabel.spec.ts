import { mount, shallowMount } from '@vue/test-utils'

import VaListLabel from '../VaListLabel.vue'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorMixin } from '../../../../services/color-config/ColorMixin'
describe('VaListLabel', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaListLabel)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaListLabel as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
