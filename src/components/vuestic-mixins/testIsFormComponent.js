import { shallowMount } from '@vue/test-utils'

// Ensure that component is proper form component
export function testIsFormComponent (componentOptions) {
  const vm = shallowMount(componentOptions, {
    propsData: { value: true },
  }).vm
  if (!vm.isFormComponent) {
    throw new Error('FormElementMixin is not added')
  }
  vm.focus()
  vm.reset()
}
