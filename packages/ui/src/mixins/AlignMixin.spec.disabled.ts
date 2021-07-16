import { shallowMount } from '@vue/test-utils'
import { AlignMixin, alignMap } from './AlignMixin'
import { mixins } from 'vue-class-component'
import { h } from 'vue'

export default class ExampleComponent extends mixins(AlignMixin) {
  render () {
    return h('')
  }
}

describe('AlignMixin', () => {
  it('works with no prop', () => {
    const wrapper = shallowMount(ExampleComponent)
    expect(wrapper.vm.alignComputed.display).toBe('flex')
    expect(wrapper.vm.alignComputed.justifyContent).toBe(alignMap.left)
  })
  it('typeof align is string', () => {
    const wrapper = shallowMount(ExampleComponent)
    const { align } = wrapper.props()
    expect(typeof align).toBe('string')
  })
  it('applies proper align', () => {
    for (const key in alignMap) {
      const wrapper = shallowMount(ExampleComponent, { propsData: { align: String(key) } })
      const { display, justifyContent } = wrapper.vm.alignComputed
      expect(display).toBe('flex')
      expect(justifyContent).toBe(alignMap[key as keyof typeof alignMap])
    }
  })
  it('justifyContent is valid css value', () => {
    const wrapper = shallowMount(ExampleComponent)
    const element = document.createElement('div')
    element.style.display = wrapper.vm.alignComputed.display
    Object.values(alignMap).forEach(value => {
      element.style.justifyContent = value
      expect(element.style.justifyContent).toBe(value)
    })
  })
})
