import { describe, it, expect } from 'vitest'

import { mountWithGlobalConfig, shallowMountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaOptionList from '../VaOptionList.vue'

import type { VueWrapper } from '@vue/test-utils'

describe('VaOptionList', () => {
  it('should be rendered without errors', () => {
    const wrapper = mountWithGlobalConfig(VaOptionList)
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('`selectedValue` should use `defaultValue` and interpret `useSelectableProps`', () => {
    const entries = [
      {
        defaultValue: { id: 1, name: 'one', value: 2, disabled: true },
        expected: [true, 'one', 2, 2],
      },
      {
        defaultValue: 'one',
        expected: [false, 'one', 'one', 'one'],
      },
      {
        defaultValue: 0,
        expected: [false, '0', 0, 0],
      },
      {
        defaultValue: false,
        expected: [false, 'false', false, false],
      },
    ]

    entries.forEach(({ defaultValue, expected }) => {
      const wrapper: VueWrapper<any> = shallowMountWithGlobalConfig(VaOptionList, {
        attrs: {
          stateful: true,
          disabledBy: 'disabled',
          textBy: 'name',
          valueBy: 'value',
          defaultValue,
          type: 'radio',
        },
      })

      it('should return `defaultValue`', async () => {
        expect(wrapper.vm.selectedValue).toEqual(defaultValue)
      })

      it('should correctly interpret `useSelectableProps`', () => {
        expect(wrapper.vm.isDisabled(wrapper.vm.selectedValue)).toBe(expected[0])
        expect(wrapper.vm.getText(wrapper.vm.selectedValue)).toBe(expected[1])
        expect(wrapper.vm.getValue(wrapper.vm.selectedValue)).toBe(expected[2])
        expect(wrapper.vm.getTrackBy(wrapper.vm.selectedValue)).toBe(expected[3])
      })
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
