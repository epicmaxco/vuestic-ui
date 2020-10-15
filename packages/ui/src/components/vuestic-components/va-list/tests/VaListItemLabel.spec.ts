import { mount, shallowMount } from '@vue/test-utils'

import VaListItemLabel from '../VaListItemLabel.vue'
import { testIsConfigProvidedComponent } from '../../../../services/config-transport/testIsConfigProvidedComponent'

describe('VaListItemLabel', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaListItemLabel)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('is configurable', () => {
    const props = {
      caption: false,
      lines: 1,
    }
    expect(() => testIsConfigProvidedComponent(VaListItemLabel, props)).not.toThrow()
  })

  it('should have caption class', () => {
    const wrapper = shallowMount(VaListItemLabel, {
      propsData: { caption: true },
    })
    expect(wrapper.classes()).toContain('va-list-item-label--caption')
  })
})
