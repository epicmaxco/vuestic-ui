import { shallowMount } from '@vue/test-utils'
import { FormComponentMixin } from './FormComponentMixin'

const componentOptions = {
  render: () => '',
  mixins: [FormComponentMixin],
  props: {
    value: {},
  },
}

describe('FormElementMixin', () => {
  it('sets selfValidatesOnBlur on first interaction', () => {
    const wrapper = shallowMount(componentOptions)
    expect(wrapper.vm.shouldValidateOnBlur).toBe(false)
    wrapper.vm.isFocused = true
    expect(wrapper.vm.shouldValidateOnBlur).toBe(true)
  })
})
