import { shallowMount } from '@vue/test-utils'

// Ensure that component is proper form component
export function testIsFormComponent (componentOptions: any, props = {}) {
  const wrapper = shallowMount(componentOptions, {
    propsData: Object.assign({
      value: true,
      id: 'test-id',
      name: 'test-name',
    }, props),
  })

  // Test mixin applied
  if (!(wrapper.vm as any).isFormComponent) {
    throw new Error('FormElementMixin is not added')
  }

  // Test id and name are present in template.
  wrapper.get('#test-id')
  wrapper.get('[name="test-name"]')

  // Test focus and reset are implemented.
  // @ts-ignore
  wrapper.vm.focus()
  // @ts-ignore
  wrapper.vm.reset()
}
