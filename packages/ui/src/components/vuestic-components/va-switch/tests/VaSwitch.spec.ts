import { mount, shallowMount } from '@vue/test-utils'

import { testIsSelectableComponent } from '../../../vuestic-mixins/SelectableMixin/testIsSelectableComponent'
import { testIsLoadingMixin } from '../../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'
import VaSwitch from '../VaSwitch.vue'

describe('VaSwitch', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaSwitch)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  xit('default', () => {
    const wrapper = shallowMount(VaSwitch, {
      propsData: { value: false },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  xit('true value', () => {
    const wrapper = shallowMount(VaSwitch, {
      propsData: { value: true },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('is Selectable Component', () => {
    expect(() => testIsSelectableComponent(VaSwitch)).not.toThrow()
  })

  it('has loading mixin', () => {
    expect(() => testIsLoadingMixin(VaSwitch)).not.toThrow()
  })
})
