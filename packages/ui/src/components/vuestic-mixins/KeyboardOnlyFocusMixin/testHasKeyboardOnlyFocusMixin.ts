// @ts-nocheck
import { shallowMount, Wrapper } from '@vue/test-utils'
import { KeyboardOnlyFocusMixin } from './KeyboardOnlyFocusMixin'

export function testHasKeyboardOnlyFocusMixin<T extends KeyboardOnlyFocusMixin> (componentOptions: T) {
  const wrapper: Wrapper<T> = shallowMount(componentOptions)

  // Test mixin applied
  if (!(wrapper.vm as any).hasKeyboardOnlyFocusMixin) {
    throw new Error('KeyboardOnlyFocusMixin is not added')
  }
}
