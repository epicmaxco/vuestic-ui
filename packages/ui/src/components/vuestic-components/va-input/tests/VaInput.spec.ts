import Vue from 'vue'
import VaInput from '../VaInput.vue'
import { mount } from '@vue/test-utils'

import { ColorThemePlugin } from '../../../../services/ColorThemePlugin'
import { testIsFormComponent } from '../../../vuestic-mixins/FormComponent/testIsFormComponent'

// TODO Should work without ColorThemePlugin.
// @ts-ignore
Vue.use(ColorThemePlugin)

describe('VaInput', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaInput)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is FormElement', () => {
    expect(() => testIsFormComponent(VaInput)).not.toThrow()
  })
})
