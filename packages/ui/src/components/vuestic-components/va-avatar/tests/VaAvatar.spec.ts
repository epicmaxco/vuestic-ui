import VaAvatar from '../VaAvatar.vue'
import { mount } from '@vue/test-utils'
import { testIsLoadingMixin } from '../../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../vuestic-mixins/ColorMixin'

describe('VaAvatar', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAvatar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has loading mixin', () => {
    expect(() => testIsLoadingMixin(VaAvatar)).not.toThrow()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaAvatar as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
