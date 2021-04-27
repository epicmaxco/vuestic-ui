import { mount, shallowMount } from '@vue/test-utils'
import VaChip from '../VaChip.vue'
import { testHasColorThemeMixin } from '../../../../services/testHasColorThemeMixin'
import { ColorMixin } from '../../../../services/color-config/ColorMixin'

describe('VaChip', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaChip)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  /* 2. Button sizes */

  it('large chip', () => {
    const wrapper = shallowMount(VaChip, {
      propsData: { size: 'large' },
    })
    expect(wrapper.find(VaChip).classes()).toContain('va-chip--large')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('small chip', () => {
    const wrapper = shallowMount(VaChip, {
      propsData: { size: 'small' },
    })
    expect(wrapper.find(VaChip).classes()).toContain('va-chip--small')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be a link', () => {
    const wrapper = shallowMount(VaChip, {
      propsData: {
        href: '/',
      },
    })
    expect(wrapper.is('a')).toBe(true)
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((VaChip as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
