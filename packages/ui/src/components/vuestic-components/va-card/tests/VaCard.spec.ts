import { mount } from '@vue/test-utils'
import VaCard from '../VaCard.vue'

import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../vuestic-mixins/ColorMixin'

describe('VaCard', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaCard)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaCard as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
