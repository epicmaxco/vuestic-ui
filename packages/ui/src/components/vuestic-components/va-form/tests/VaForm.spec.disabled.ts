import { mount } from '@vue/test-utils'
import VaForm from '../VaForm.vue'

describe('VaForm', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaForm)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
