import { shallowMount } from '@vue/test-utils'
import VaCheckbox from '../vuestic-components/va-checkbox/VaCheckbox'
import VaSwitch from '../vuestic-components/va-switch/VaSwitch'
import { testIsFormComponent } from './testIsFormComponent'

export function testIsSelectableComponent (componentOptions) {
  const wrapper = shallowMount(componentOptions)

  // Test mixin applied
  if (!wrapper.vm.isSelectableComponent) {
    throw new Error('SelectableMixin is not added')
  }
}

it('CheckBox is Form Component', () => {
  expect(() => testIsFormComponent(VaCheckbox)).not.toThrow()
})
it('Switch is Form Component', () => {
  expect(() => testIsFormComponent(VaSwitch)).not.toThrow()
})
