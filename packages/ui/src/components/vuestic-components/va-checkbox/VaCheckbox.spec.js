import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import VaCheckbox from './VaCheckbox'

import { ColorThemePlugin } from '../../../services/ColorThemePlugin'
import { testIsSelectableComponent } from '../../vuestic-mixins/SelectableMixin/testIsSelectableComponent'

Vue.use(ColorThemePlugin)

describe('VaCheckbox', () => {
  // TODO: need fix icon with context-config

  it('default', () => {
    const wrapper = shallowMount(VaCheckbox, {
      propsData: { value: false },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('true value', () => {
    const wrapper = shallowMount(VaCheckbox, {
      propsData: { value: true },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('has indeterminate class', () => {
    const wrapper = shallowMount(VaCheckbox, {
      propsData: { indeterminate: true },
    })
    expect(wrapper.find(VaCheckbox).classes()).toContain('va-checkbox--indeterminate')
  })
  it('computedClass defined', () => {
    const wrapper = shallowMount(VaCheckbox)
    expect(wrapper.vm.computedClass).toBeDefined()
  })
  it('computedIconName should be "check" ', () => {
    const wrapper = shallowMount(VaCheckbox)
    expect(wrapper.vm.computedIconName).toBe('check')
  })
  it('is Selectable Component', () => {
    expect(() => testIsSelectableComponent(VaCheckbox)).not.toThrow()
  })
})
