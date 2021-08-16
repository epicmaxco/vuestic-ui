import { shallowMount } from '@vue/test-utils'
import { ScrollMixin } from './ScrollMixin'
import Component, { mixins } from 'vue-class-component'

// TODO Should probably have better typing. A  bit rushed.
@Component
export default class ExampleComponent extends mixins(ScrollMixin) {
  render () {
    return ''
  }
}

describe('ScrollMixin', () => {
  it('default target is window', () => {
    const wrapper = shallowMount(ExampleComponent)
    expect(wrapper.vm.targetElement).toBe(window)
  })
})
