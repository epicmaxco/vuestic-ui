import VaOptionList from './VaOptionList'
import { testIsSelectableList } from '../../vuestic-mixins/testIsSelectableList'
import { shallowMount } from '@vue/test-utils'

describe('VaOptionList', () => {
  it('is SelectableList component', () => {
    expect(() => testIsSelectableList(VaOptionList)).not.toThrow()
  })

  describe('selectedValue', () => {
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

    it('should update selectedValue', () => {
      wrapper.setProps({ value: 'three' })
      expect(wrapper.vm.selectedValue).toBe('three')
    })
  })
})
