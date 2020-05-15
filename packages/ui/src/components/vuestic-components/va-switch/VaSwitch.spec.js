import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import VaSwitch from './VaSwitch'

import { ColorThemePlugin } from '../../../services/ColorThemePlugin'
import { testIsSelectableComponent } from '../../vuestic-mixins/testIsSelectableComponent'

Vue.use(ColorThemePlugin)

describe('VaSwitch', () => {
  it('default', () => {
    const wrapper = shallowMount(VaSwitch, {
      propsData: { value: false },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('true value', () => {
    const wrapper = shallowMount(VaSwitch, {
      propsData: { value: true },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('is Selectable Component', () => {
    expect(() => testIsSelectableComponent(VaSwitch)).not.toThrow()
  })
})
