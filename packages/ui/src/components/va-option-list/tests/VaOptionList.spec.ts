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
        },
      })

      it('should return `defaultValue`', async () => {
        expect(wrapper.vm.selectedValue).toEqual(defaultValue)
      })

      it('should correctly interpret `useSelectableProps`', async () => {
        expect(wrapper.vm.isDisabled(wrapper.vm.selectedValue)).toBe(expected[0])
        expect(wrapper.vm.getText(wrapper.vm.selectedValue)).toBe(expected[1])
        expect(wrapper.vm.getValue(wrapper.vm.selectedValue)).toBe(expected[2])
        expect(wrapper.vm.getTrackBy(wrapper.vm.selectedValue)).toBe(expected[3])
      })
    })
  })
})
