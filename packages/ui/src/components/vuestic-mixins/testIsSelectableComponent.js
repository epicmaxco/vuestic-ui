import { shallowMount } from '@vue/test-utils'

export function testIsSelectableComponent (componentOptions) {
  const wrapper = shallowMount(componentOptions)

  // Test mixin applied
  if (!wrapper.vm.isSelectableComponent) {
    throw new Error('SelectableMixin is not added')
  }
}
