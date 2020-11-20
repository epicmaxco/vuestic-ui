import { mount, shallowMount } from '@vue/test-utils'

import VaListItemSection from '../VaListItemSection.vue'

describe('VaListItemSection', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaListItemSection)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should have main class', () => {
    const wrapper = shallowMount(VaListItemSection)
    expect(wrapper.classes()).toContain('va-list-item-section--main')
    expect(wrapper.classes()).not.toContain('va-list-item-section--avatar')
    expect(wrapper.classes()).not.toContain('va-list-item-section--icon')
  })
})
