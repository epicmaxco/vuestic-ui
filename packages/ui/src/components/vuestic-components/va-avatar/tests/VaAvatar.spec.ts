import VaAvatar from '../VaAvatar.vue'
import { mount } from '@vue/test-utils'
import { testIsLoadingMixin } from '../../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'

describe('VaAvatar', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAvatar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has loading mixin', () => {
    expect(() => testIsLoadingMixin(VaAvatar)).not.toThrow()
  })
})
