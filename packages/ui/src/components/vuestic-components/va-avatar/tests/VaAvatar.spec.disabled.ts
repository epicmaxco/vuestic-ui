import VaAvatar from '../VaAvatar.vue'
import { mount } from '@vue/test-utils'
import { testIsLoadingMixin } from '../../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import ColorMixin from '../../../../services/color-config/ColorMixin'

describe('VaAvatar', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAvatar)
    expect(wrapper.exists()).toBeTruthy()
  })
  it('has loading mixin', () => {
    expect(() => testIsLoadingMixin(VaAvatar)).not.toThrow()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaAvatar as unknown) as ColorMixin),
    ).not.toThrow()
  })
})
