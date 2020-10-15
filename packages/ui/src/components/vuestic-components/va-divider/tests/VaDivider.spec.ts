import { mount } from '@vue/test-utils'
import VaDivider from '../VaDivider.vue'

import { testIsConfigProvidedComponent } from '../../../../services/config-transport/testIsConfigProvidedComponent'

describe('VaDivider', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaDivider)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('should throw if prop tag does not exist in the config', () => {
    const props = {
      tag: 'a',
    }
    expect(() => testIsConfigProvidedComponent(VaDivider, props)).toThrow()
  })
  it('is configurable', () => {
    const props = {
      vertical: false,
      dashed: false,
      inset: false,
      orientation: 'left',
    }
    expect(() => testIsConfigProvidedComponent(VaDivider, props)).not.toThrow()
  })
})
