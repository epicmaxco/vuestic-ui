import { mount, shallowMount } from '@vue/test-utils'

import VaListItemLabel from '../VaListItemLabel.vue'
import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'

describe('VaListItemLabel', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaListItemLabel)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('is contextable', () => {
    const props = {
      caption: false,
      lines: 1,
    }
    expect(() => testIsContextableComponent(VaListItemLabel, props)).not.toThrow()
  })

  it('should have caption class', () => {
    const wrapper = shallowMount(VaListItemLabel, {
      propsData: { caption: true },
    })
    expect(wrapper.classes()).toContain('va-list-item-label--caption')
  })
})
