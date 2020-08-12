import { mount, shallowMount } from '@vue/test-utils'
import VaTag from '../VaTag.vue'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorThemeMixin } from '../../../../services/ColorThemePlugin'

describe('VaTag', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaTag)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  /* 2. Button sizes */

  it('large tag', () => {
    const wrapper = shallowMount(VaTag, {
      propsData: { size: 'large' },
    })
    expect(wrapper.find(VaTag).classes()).toContain('va-tag--large')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('small tag', () => {
    const wrapper = shallowMount(VaTag, {
      propsData: { size: 'small' },
    })
    expect(wrapper.find(VaTag).classes()).toContain('va-tag--small')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be a link', () => {
    const wrapper = shallowMount(VaTag, {
      propsData: {
        href: '/',
      },
    })
    expect(wrapper.is('a')).toBe(true)
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaTag as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
