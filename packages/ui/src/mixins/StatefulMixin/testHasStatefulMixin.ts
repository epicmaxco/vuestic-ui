// @ts-nocheck
import { shallowMount, Wrapper } from '@vue/test-utils'
import { StatefulMixin } from './StatefulMixin'

// Ensure that component is proper form component
export function testHasStatefulMixin<T extends StatefulMixin> (componentOptions: T) {
  const wrapper: Wrapper<T> = shallowMount(componentOptions)

  // Test mixin applied
  if (!(wrapper.vm as any).hasStatefulMixin) {
    throw new Error('StatefulMixin is not added')
  }

  // Stateless component can't modify value
  wrapper.vm.valueComputed = 'one'
  expect(wrapper.vm.valueComputed).not.toBe('one')
  // But parent can
  wrapper.setProps({ value: 'two' })
  expect(wrapper.vm.valueComputed).toBe('two')
  // Stateful component can modify value
  wrapper.setProps({ stateful: true })
  wrapper.vm.valueComputed = 'three'
  expect(wrapper.vm.valueComputed).toBe('three')
}
