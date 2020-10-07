import { mount } from '@vue/test-utils'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../vuestic-mixins/ColorMixin'

import VaAlert from '../VaAlert.vue'

describe('VaAlert', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAlert)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaAlert as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
