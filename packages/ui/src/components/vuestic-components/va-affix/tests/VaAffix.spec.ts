import { mount } from '@vue/test-utils'

import { testIsConfigProvidedComponent } from '../../../../services/config-transport/testIsConfigProvidedComponent'
import VaAffix from '../VaAffix.vue'

describe('VaAffix', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAffix)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('should throw if prop tag does not exist in the context', () => {
    const props = {
      tag: 'a',
    }
    expect(() => testIsConfigProvidedComponent(VaAffix, props)).toThrow()
  })
  it('is configurable', () => {
    const props = {
      offsetTop: undefined,
      offsetBottom: undefined,
      target: window,
    }
    expect(() => testIsConfigProvidedComponent(VaAffix, props)).not.toThrow()
  })
})
