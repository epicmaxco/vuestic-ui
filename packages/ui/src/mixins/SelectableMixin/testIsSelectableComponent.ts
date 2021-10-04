import { shallowMount } from '@vue/test-utils'
// @ts-ignore
import { testIsFormComponent } from '../FormComponent/testIsFormComponent'
import { testHasStatefulMixin } from '../StatefulMixin/testHasStatefulMixin'

export function testIsSelectableComponent (componentOptions: any) {
  const wrapper = shallowMount(componentOptions)
  // Test mixin applied
  if (!(wrapper.vm as any).isSelectableComponent) {
    throw new Error('SelectableMixin is not added')
  }
  testIsFormComponent(componentOptions)
  testHasStatefulMixin(componentOptions)
}
