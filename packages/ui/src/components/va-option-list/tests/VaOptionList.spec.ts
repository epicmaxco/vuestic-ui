import { describe, it, expect } from 'vitest'

import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaOptionList from '../VaOptionList.vue'

import type { VueWrapper } from '@vue/test-utils'

describe('VaOptionList', () => {
  it('should be rendered without errors', () => {
    const wrapper = mountWithGlobalConfig(VaOptionList)
    expect(wrapper.exists()).toBeTruthy()
  })

  it('should correctly set the new selected value', () => {
    const wrapper: VueWrapper<any> = mountWithGlobalConfig(VaOptionList, {
      attrs: {
        stateful: 3,
        type: 'radio',
        valueBy: 'value',
      },
    })

    wrapper.vm.selectedValue = { value: 3 }
    expect(wrapper.vm.selectedValue).toBe(3)
  })

  const entries = [
    {
      options: [{ id: 1, name: 'one', value: 2, disabled: true }],
      expected: [true, 'one', 2, 2],
    },
    {
      options: [{ id: 0, name: 0, value: false, disabled: false }],
      expected: [false, '0', false, false],
    },
  ]

  entries.forEach(({ options, expected }) => {
    const wrapper: VueWrapper<any> = mountWithGlobalConfig(VaOptionList, {
      attrs: {
        options,
        disabledBy: 'disabled',
        textBy: 'name',
        modelValue: [options[0].value],
        valueBy: 'value',
      },
    })

    it('should correctly interpret `useSelectableProps`', () => {
      expect(wrapper.vm.isDisabled(wrapper.props().options[0])).toBe(expected[0])
      expect(wrapper.vm.getText(wrapper.props().options[0])).toBe(expected[1])
      expect(wrapper.vm.getValue(wrapper.props().options[0])).toBe(expected[2])
      expect(wrapper.vm.getTrackBy(wrapper.props().options[0])).toBe(expected[3])

      // checking if checked option is correct (relies on getTrackBy and getText)
      expect(wrapper
        .find('.va-checkbox--selected')
        .find('.va-checkbox__label')
        .text()).toBe(expected[1])
    })
  })

  // describe('selectedValue should use default value', () => {
  //   let wrapper

  //   beforeEach(() => {
  //     wrapper = shallowMountWithGlobalConfig(VaOptionList, {
  //       attrs: {
  //         options: [{ name: 'one' }, { name: 'two' }],
  //         defaultValue: 'one',
  //       },
  //     })
  //   })

  //   it('selected value updates with default value', () => {
  //     wrapper.setProps({ defaultValue: 'two' })
  //     expect(wrapper.vm.selectedValue).toBe('two')
  //   })

  //   it('should set selectedValue with default value', () => {
  //     expect(wrapper.vm.selectedValue).toBe('one')
  //   })
  // })

  // describe('selectedValue should use value if provided', () => {
  //   it('should update selectedValue', () => {
  //     const wrapper = shallowMountWithGlobalConfig(VaOptionList)
  //     wrapper.setProps({ value: 'three' })
  //     expect(wrapper.vm.selectedValue).toBe('three')
  //   })
  // })
})
