import { h } from 'vue'
import { mixins } from 'vue-class-component'
import { mount } from '@vue/test-utils'
import ColorMixin, { isCssColor } from './ColorMixin'

export default class ExampleComponent extends mixins(ColorMixin) {
  render () {
    return h('template')
  }
}

describe('ColorMixin', () => {
  const wrapper: any = mount(ExampleComponent)
  it('isCssColor', () => {
    expect(isCssColor('tomato')).toBe(true)
    expect(isCssColor('#123')).toBe(true)
    expect(isCssColor('#123FFF')).toBe(true)
    expect(isCssColor('not-css-color')).toBe(false)
  })
  it('getColor should return default color', () => {
    expect(wrapper.vm.theme.getColor('not-css-color')).toBe('#000000')
  })
  it('getColor should return prop color', () => {
    expect(wrapper.vm.theme.getColor('green')).toBe('green')
  })

  it('should compute color', async () => {
    const wrapper = mount(
      ExampleComponent,
      {
        propsData: { color: '' },
      } as any,
    )

    expect(wrapper.vm.colorComputed).toBe('#000000')

    await wrapper.setProps({ color: '#333' })

    expect(wrapper.vm.colorComputed).toBe('#333')
  })
})
