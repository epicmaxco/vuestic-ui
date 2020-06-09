import { shallowMount } from '@vue/test-utils'
import VaSwitch from './VaSwitch'

import { testIsSelectableComponent } from '../../vuestic-mixins/SelectableMixin/testIsSelectableComponent'
import { testIsContextableComponent } from '../../context-test/context-provide/testIsContextableComponent'
import { testIsLoadingMixin } from '../../vuestic-mixins/LoadingMixin/testIsLoadingMixin'

describe('VaSwitch', () => {
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
  it('is contextable component', () => {
    const contextProps = {
      value: true,
      readonly: false,
      disabled: false,
      size: 'test-size',
      loading: false,
      color: 'test-color',
      stateful: true,
    }
    expect(() => testIsContextableComponent(VaSwitch, contextProps).not.toThrow())
  })
  it('has loading mixin', () => {
    expect(() => testIsLoadingMixin(VaSwitch)).not.toThrow()
  })
})
