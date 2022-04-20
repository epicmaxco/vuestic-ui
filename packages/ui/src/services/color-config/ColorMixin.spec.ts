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
  })
  it('getColor should return default color', () => {
    expect(wrapper.vm.theme.getColor('not-css-color')).toBe('#2C82E0')
  })

  it('should compute color', async () => {
    const wrapper = mount(
      ExampleComponent,
      {
        propsData: { color: '' },
      } as any,
    )

    expect(wrapper.vm.colorComputed).toBe('#2C82E0')

    await wrapper.setProps({ color: '#333' })

    expect(wrapper.vm.colorComputed).toBe('#333')
  })
})
