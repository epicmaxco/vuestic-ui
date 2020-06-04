import { shallowMount } from '@vue/test-utils'

export function testIsLoadingMixin (componentOptions: any) {
  const wrapper = shallowMount(componentOptions)

  // Test mixin applied
  if (!(wrapper.vm as any).isLoadingMixin) {
    throw new Error('LoadingMixin is not added')
  }
}
