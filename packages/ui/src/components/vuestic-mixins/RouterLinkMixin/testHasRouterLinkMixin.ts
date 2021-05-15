// @ts-nocheck
import { shallowMount, Wrapper } from '@vue/test-utils'
import { RouterLinkMixin } from './RouterLinkMixin'

export function testHasRouterLinkMixin<T extends RouterLinkMixin> (componentOptions: T) {
  const wrapper: Wrapper<T> = shallowMount(componentOptions)

  // Test mixin applied
  if (!(wrapper.vm as any).hasRouterLinkMixin) {
    throw new Error('RouterLinkMixin is not added')
  }
}
