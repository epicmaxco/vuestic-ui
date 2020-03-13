import { shallowMount } from '@vue/test-utils'

// Ensure that component is proper form component
export function testIsFormComponent (componentOptions) {
  const wrapper = shallowMount(componentOptions, {
    propsData: {
      value: true,
      id: 'test-id',
      name: 'test-name',
    },
  })

  // Test mixin applied
  if (!wrapper.vm.isFormComponent) {
    throw new Error('FormElementMixin is not added')
  }

  // Test id and name are present in template.
  wrapper.get('#test-id')
  wrapper.get('[name="test-name"]')

  // Test focus and reset are implemented.
  wrapper.vm.focus()
  wrapper.vm.reset()
}
