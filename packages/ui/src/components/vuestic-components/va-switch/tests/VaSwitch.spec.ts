import { mount, shallowMount } from '@vue/test-utils'

import { testIsSelectableComponent } from '../../../vuestic-mixins/SelectableMixin/testIsSelectableComponent'
import { testIsConfigProvidedComponent } from '../../../../services/config-transport/testIsConfigProvidedComponent'
import { testIsLoadingMixin } from '../../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'
import VaSwitch from '../VaSwitch.vue'

describe('VaSwitch', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaSwitch)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('default', () => {
    const wrapper = shallowMount(VaSwitch, {
      propsData: { value: false },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('true value', () => {
    const wrapper = shallowMount(VaSwitch, {
      propsData: { value: true },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('is Selectable Component', () => {
    expect(() => testIsSelectableComponent(VaSwitch)).not.toThrow()
  })

  it('is configurable component', () => {
    const contextProps = {
      value: true,
      readonly: false,
      disabled: false,
      size: 'test-size',
      loading: false,
      color: 'test-color',
      stateful: true,
    }
    expect(() => testIsConfigProvidedComponent(VaSwitch, contextProps)).not.toThrow()
  })

  it('has loading mixin', () => {
    expect(() => testIsLoadingMixin(VaSwitch)).not.toThrow()
  })
})
