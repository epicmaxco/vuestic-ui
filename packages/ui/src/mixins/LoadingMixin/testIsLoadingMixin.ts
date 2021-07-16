import { shallowMount } from '@vue/test-utils'

export function testIsLoadingMixin (componentOptions: any, componentProps?: any) {
  const wrapper = shallowMount(componentOptions, {
    propsData: componentProps,
  })

  // Test mixin applied
  if (!(wrapper.vm as any).isLoadingMixin) {
    throw new Error('LoadingMixin is not added')
  }
}
