import VaOptionList from './VaOptionList'
import { testIsSelectableList } from '../../vuestic-mixins/testIsSelectableList'
import { shallowMount } from '@vue/test-utils'

describe('VaOptionList', () => {
  it('is SelectableList component', () => {
    expect(() => testIsSelectableList(VaOptionList)).not.toThrow()
  })

  it('selected value updates with default value', () => {
    const wrapper = shallowMount(VaOptionList, {
      attrs: {
        options: [{ name: 'one' }, { name: 'two' }],
        defaultValue: 'one',
      },
    })
    wrapper.setProps({ defaultValue: 'two' })
    expect(wrapper.vm.selectedValue).toBe('two')
  })
})
