import { shallowMount } from '@vue/test-utils'

export function testIsSelectableList (componentOptions) {
  const wrapper = shallowMount(componentOptions)

  // Test mixin applied
  if (!wrapper.vm.isSelectableListComponent) {
    throw new Error('SelectableListMixin is not added')
  }

  if (!wrapper.vm.isFormComponent) {
    throw new Error('FormElementMixin is not added')
  }
}
