import { describe, it, expect } from 'vitest'

import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaButtonToggle from '../VaButtonToggle.vue'

import type { VueWrapper } from '@vue/test-utils'

describe('VaButtonToggle', () => {
  const options = [{ name: 'one', value: 1 }, { name: false, value: 0 }]

  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaButtonToggle, {
      attrs: {
        options,
      },
    })
    expect(wrapper.exists()).toBeTruthy()
  })

  const entries = [
    {
      value: options[0],
      expected: [true, 'one'],
    },
    {
      value: options[1],
      expected: [false, 'false'],
    },
  ]

  entries.forEach(({ value, expected }) => {
    it('should interpret `useSelectableProps`', () => {
      const wrapper: VueWrapper<any> = mountWithGlobalConfig(VaButtonToggle, {
        attrs: {
          options,
          textBy: 'name',
          valueBy: 'value',
          modelValue: value.value,
        },
      })

      expect(wrapper.vm.isToggled(value)).toBe(true)
      expect(wrapper.vm.getText(value)).toBe(expected[1])

      // checking if selected option is correct (relies on getTrackBy and getText)
      expect(wrapper.find('button[aria-pressed="true"]').text()).toBe(expected[1])
    })
  })
})
