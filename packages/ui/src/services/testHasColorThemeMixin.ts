import { shallowMount, Wrapper } from '@vue/test-utils'
import { ColorThemeMixin } from './ColorThemePlugin'
import { testIsContextableComponent } from '../components/context-test/context-provide/testIsContextableComponent'

export function testHasColorThemeMixin<T extends ColorThemeMixin> (componentOptions: T) {
  const wrapper: Wrapper<T> = shallowMount(componentOptions)

  // Test mixin applied
  if (!(wrapper.vm as any).hasColorThemeMixin) {
    throw new Error('ColorThemeMixin is not added')
  }

  // Test is contextable [troubles with icon context]
  // const props = {
  //   color: '',
  // }
  // expect(() => testIsContextableComponent(componentOptions, props)).not.toThrow()
}
