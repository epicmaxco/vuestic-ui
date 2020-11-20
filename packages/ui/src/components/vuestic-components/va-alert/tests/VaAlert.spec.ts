import { mount } from '@vue/test-utils'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { testHasStatefulMixin } from '../../../vuestic-mixins/StatefulMixin/testHasStatefulMixin'
import { StatefulMixin } from '../../../vuestic-mixins/StatefulMixin/StatefulMixin'
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

  it('has StatefulMixin', () => {
    expect(() =>
      testHasStatefulMixin((VaAlert as unknown) as StatefulMixin),
    ).not.toThrow()
  })
})
