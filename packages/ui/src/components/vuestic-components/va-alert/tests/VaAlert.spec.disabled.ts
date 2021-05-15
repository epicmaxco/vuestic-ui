import { mount } from '@vue/test-utils'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import ColorMixin from '../../../../services/color-config/ColorMixin'

import VaAlert from '../VaAlert.vue'

describe('VaAlert', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAlert)
    expect(wrapper.exists()).toBeTruthy()
  })

  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaAlert as unknown) as ColorMixin),
    ).not.toThrow()
  })
})
