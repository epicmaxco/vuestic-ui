import VaInput from '../VaInput.vue'
import { mount } from '@vue/test-utils'

import { testIsFormComponent } from '../../../vuestic-mixins/FormComponent/testIsFormComponent'

describe('VaInput', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaInput)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is FormElement', () => {
    expect(() => testIsFormComponent(VaInput)).not.toThrow()
  })
})
