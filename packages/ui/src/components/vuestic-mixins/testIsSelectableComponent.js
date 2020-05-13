import { shallowMount } from '@vue/test-utils'
import { testIsFormComponent } from './testIsFormComponent'
import { testHasStatefulMixin } from './StatefullMixin/testHasStatefulMixin'

export function testIsSelectableComponent (componentOptions) {
  const wrapper = shallowMount(componentOptions)
  // Test mixin applied
  if (!wrapper.vm.isSelectableComponent) {
    throw new Error('SelectableMixin is not added')
  }
  testIsFormComponent(componentOptions)
  testHasStatefulMixin(componentOptions)
}
