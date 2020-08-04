import { mount } from '@vue/test-utils'

import VaList from '../VaList.vue'
import { testIsContextableComponent } from '../../../context-test/context-provide/testIsContextableComponent'

describe('VaList', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaList)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('is contextable', () => {
    const props = {
      fit: false,
    }
    expect(() => testIsContextableComponent(VaList, props)).not.toThrow()
  })
})
