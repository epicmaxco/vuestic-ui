// @ts-nocheck
import { mount, shallowMount } from '@vue/test-utils'
import { testIsFormComponent } from '../../../vuestic-mixins/FormComponent/testIsFormComponent'

import VaOptionList from '../VaOptionList.vue'

describe('VaOptionList', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaOptionList)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('is SelectableList component', () => {
    expect(() => testIsFormComponent(VaOptionList, { options: ['test'], value: 'test' })).not.toThrow()
  })

  describe('selectedValue should use default value', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallowMount(VaOptionList, {
        attrs: {
          options: [{ name: 'one' }, { name: 'two' }],
          defaultValue: 'one',
        },
      })
    })

    it('selected value updates with default value', () => {
      wrapper.setProps({ defaultValue: 'two' })
      expect(wrapper.vm.selectedValue).toBe('two')
    })

    it('should set selectedValue with default value', () => {
      expect(wrapper.vm.selectedValue).toBe('one')
    })
  })

  describe('selectedValue should use value if provided', () => {
    it('should update selectedValue', () => {
      const wrapper = shallowMount(VaOptionList)
      wrapper.setProps({ value: 'three' })
      expect(wrapper.vm.selectedValue).toBe('three')
    })
  })
})
