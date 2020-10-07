import { mount } from '@vue/test-utils'
import VaIcon from '../VaIcon.vue'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../vuestic-mixins/ColorMixin'

describe('VaIcon', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaIcon)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaIcon as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
