import { shallowMount } from '@vue/test-utils'

export function testIsSelectableList (componentOptions: any) {
  const wrapper = shallowMount(componentOptions)

  // Test mixin applied
  if (!(wrapper.vm as any).isSelectableListComponent) {
    throw new Error('SelectableListMixin is not added')
  }

  if (!(wrapper.vm as any).isFormComponent) {
    throw new Error('FormElementMixin is not added')
  }
}
