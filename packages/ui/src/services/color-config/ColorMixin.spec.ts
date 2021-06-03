import { h } from 'vue'
import { mixins } from 'vue-class-component'
import { mount } from '@vue/test-utils'
import { isColor } from './color-functions'
import ColorMixin from './ColorMixin'

export default class ExampleComponent extends mixins(ColorMixin) {
  render () {
    return h('template')
  }
}

describe('ColorMixin', () => {
  const wrapper: any = mount(ExampleComponent)
  it('isColor', () => {
    expect(isColor('tomato')).toBe(false)
    expect(isColor('#123')).toBe(true)
    expect(isColor('#123FFF')).toBe(true)
    expect(isColor('not-css-color')).toBe(false)
  })
  it('getColor should return default color', () => {
    expect(wrapper.vm.theme.getColor('not-css-color')).toBe('#000000')
  })
  it('getColor should return prop color', () => {
    // We don't translate 'green' to '#008000'.
    expect(wrapper.vm.theme.getColor('green')).toBe('#000000')
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
