import { mount } from '@vue/test-utils'

import VaList from '../VaList.vue'

describe('VaList', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaList)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
