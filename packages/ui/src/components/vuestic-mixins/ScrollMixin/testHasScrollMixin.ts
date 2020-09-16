import { shallowMount, Wrapper } from '@vue/test-utils'
import { ScrollMixin } from './ScrollMixin'

export function testHasScrollMixin<T extends ScrollMixin> (componentOptions: T) {
  const wrapper: Wrapper<T> = shallowMount(componentOptions)

  // Test mixin applied
  if (!(wrapper.vm as any).hasScrollMixin) {
    throw new Error('ScrollMixin is not added')
  }
}
