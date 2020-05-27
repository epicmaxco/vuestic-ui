import { mount } from '@vue/test-utils'

import VaOptionList from '../VaOptionList.vue'

describe('VaOptionList', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaOptionList)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
