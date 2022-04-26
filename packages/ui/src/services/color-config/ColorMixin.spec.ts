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
    expect(isColor('#123')).toBe(true)
    expect(isColor('#123FFF')).toBe(true)
    expect(isColor('not-css-color')).toBe(false)
  })

  it('getColor should return default color', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'warn').mockImplementation(() => {})
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
