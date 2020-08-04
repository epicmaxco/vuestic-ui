import { shallowMount } from '@vue/test-utils'
import { isCssColor, getColor, ColorThemeMixin } from './ColorThemePlugin'
import Component, { mixins } from 'vue-class-component'

// TODO Should probably have better typing. A bit rushed.
@Component
export default class ExampleComponent extends mixins(ColorThemeMixin) {
  render () {
    return ''
  }
}

describe('ColorThemePlugin', () => {
  const wrapper: any = shallowMount(ExampleComponent)
  it('isCssColor', () => {
    expect(isCssColor('tomato')).toBe(true)
    expect(isCssColor('#123')).toBe(true)
    expect(isCssColor('#123FFF')).toBe(true)
    expect(isCssColor('not-css-color')).toBe(false)
  })
  it('getColor should return default color', () => {
    expect(getColor(wrapper, 'not-css-color')).toBe('#000000')
  })
  it('getColor should return prop color', () => {
    expect(getColor(wrapper, 'green')).toBe('green')
  })

  it('should compute color', async () => {
    const wrapper = shallowMount(
      ExampleComponent,
      {
        propsData: { color: '' },
      } as any,
    )
    expect(wrapper.vm.colorComputed).toBe('#000000')
    wrapper.setProps({ color: '#333' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.colorComputed).toBe('#333')
  })
})
