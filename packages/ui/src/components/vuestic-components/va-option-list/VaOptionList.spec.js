import VaOptionList from './VaOptionList'
import { testIsFormComponent } from '../../vuestic-mixins/testIsFormComponent'
import { shallowMount } from '@vue/test-utils'

describe('VaOptionList', () => {
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
