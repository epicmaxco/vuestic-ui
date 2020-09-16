import { mount } from '@vue/test-utils'

import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { testHasScrollMixin } from '../../../vuestic-mixins/ScrollMixin/testHasScrollMixin'
import { ScrollMixin } from '../../../vuestic-mixins/ScrollMixin/ScrollMixin'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'

import VaAppBar from '../VaAppBar.vue'

describe('VaAppBar', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAppBar)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaAppBar as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
  it('has ScrollMixin', () => {
    expect(() =>
      testHasScrollMixin((VaAppBar as unknown) as ScrollMixin),
    ).not.toThrow()
  })
  it('is contextable', () => {
    const props = {
      gradient: false,
      position: 'top',
      target: '',
      color: 'primary',
    }
    expect(() => testIsContextableComponent(VaAppBar, props)).not.toThrow()
  })
})
