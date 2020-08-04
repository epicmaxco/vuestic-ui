import { mount, shallowMount } from '@vue/test-utils'

import VaListSeparator from '../VaListSeparator.vue'
import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'
describe('VaListSeparator', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaListSeparator)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('is contextable', () => {
    const props = {
      fit: false,
      spaced: false,
    }
    expect(() => testIsContextableComponent(VaListSeparator, props)).not.toThrow()
  })

  it('should have offset class', () => {
    const wrapper = shallowMount(VaListSeparator, {
      propsData: {
        fit: false,
      },
    })
    expect(wrapper.classes()).toContain('va-list-separator--offset')
    expect(wrapper.classes()).not.toContain('va-list-separator--spaced')
  })
})
