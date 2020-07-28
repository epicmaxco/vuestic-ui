import { mount } from '@vue/test-utils'

import VaSelect from '../VaSelect.vue'

describe('VaSelect', () => {
  // Fix after context will work fine
  it('should render without an error', () => {
    const wrapper = mount(VaSelect)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
