import { mount, shallowMount } from '@vue/test-utils'

import VaListItemLabel from '../VaListItemLabel.vue'

describe('VaListItemLabel', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaListItemLabel)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should have caption class', () => {
    const wrapper = shallowMount(VaListItemLabel, {
      propsData: { caption: true },
    })
    expect(wrapper.classes()).toContain('va-list-item-label--caption')
  })
})
