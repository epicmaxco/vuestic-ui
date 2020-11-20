import { shallowMount, Wrapper } from '@vue/test-utils'
import { ColorThemeMixin } from '../components/vuestic-mixins/ColorMixin'

export function testHasColorThemeMixin<T extends ColorThemeMixin> (componentOptions: T) {
  const wrapper: Wrapper<T> = shallowMount(componentOptions)

  // Test mixin applied
  if (!(wrapper.vm as any).hasColorThemeMixin) {
    throw new Error('ColorThemeMixin is not added')
  }
}
