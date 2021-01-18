import { mount } from '@vue/test-utils'

import VaAffix from '../VaAffix.vue'

describe('VaAffix', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAffix)
    expect(wrapper.exists()).toBeTruthy()
  })
})
