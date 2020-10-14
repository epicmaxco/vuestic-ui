import { mount } from '@vue/test-utils'

import VaList from '../VaList.vue'
import { testIsConfigProvidedComponent } from '../../../../services/config-transport/testIsConfigProvidedComponent'

describe('VaList', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaList)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('is contextable', () => {
    const props = {
      fit: false,
    }
    expect(() => testIsConfigProvidedComponent(VaList, props)).not.toThrow()
  })
})
