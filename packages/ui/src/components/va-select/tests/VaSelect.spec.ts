import { describe, it, expect } from 'vitest'

import { mountWithGlobalConfig, shallowMountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSelect from '../VaSelect.vue'

import type { VueWrapper } from '@vue/test-utils'

describe('VaSelect', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSelect)
    expect(wrapper.exists()).toBeTruthy()
  })

  const options = [
    { id: 1, label: 'one', value: 0, disabled: true, group: '1' },
    { id: 0, label: false, value: 1, disabled: false, group: 1 },
  ]

  it('should compare options correctly', () => {
    const wrapper: VueWrapper<any> = shallowMountWithGlobalConfig(VaSelect, {
      attrs: {
        options,
        valueBy: 'value',
      },
    })

    // get track by / get value
    expect(wrapper.vm.compareOptions(options[0], options[1])).toBe(false)
    expect(wrapper.vm.compareOptions(options[0], options[0])).toBe(true)
  })

  const entries = [
    {
      value: 0,
      expected: ['one'],
    },
    {
      value: 1,
      expected: ['false'],
    },
  ]

  entries.forEach(({ value, expected }) => {
    it('should interpret `useSelectableProps`', () => {
      const wrapper: VueWrapper<any> = shallowMountWithGlobalConfig(VaSelect, {
        attrs: {
          options,
          textBy: 'label',
          valueBy: 'value',
          trackBy: 'id',
          groupBy: 'group',
          modelValue: value,
        },
      })

      expect(wrapper.vm.getText(options[value])).toBe(expected[0])
      // getValue
      expect(wrapper.vm.getOptionByValue(value)).toEqual(options[value])
    })
  })

  // it('reset() should clear value on single select', async () => {
  //   const wrapper: any = shallowMountWithGlobalConfig(VaSelect, {
  //     propsData: {
  //       value: 'test',
  //     },
  //   })
  //   wrapper.vm.reset()
  //   expect(wrapper.emitted().clear).toBeTruthy()
  //   expect(wrapper.emitted().input[0]).toEqual([''])
  // })

  // it('reset() should clear value on multiple select', async () => {
  //   const wrapper: any = shallowMountWithGlobalConfig(VaSelect, {
  //     propsData: {
  //       value: ['test'],
  //       multiple: true,
  //     },
  //   })
  //   wrapper.vm.reset()
  //   expect(wrapper.emitted().clear).toBeTruthy()
  //   expect(wrapper.emitted().input[0]).toEqual([[]])
  // })

  // it('reset() should clear value by clearValue prop', async () => {
  //   const newClearValue = 'new clear value'
  //   const wrapper: any = shallowMountWithGlobalConfig(VaSelect, {
  //     propsData: {
  //       value: 'test',
  //       clearValue: newClearValue,
  //     },
  //   })
  //   wrapper.vm.reset()
  //   expect(wrapper.emitted().clear).toBeTruthy()
  //   expect(wrapper.emitted().input[0]).toEqual([newClearValue])
  // })

  // it('is Form Component', () => {
  //   // TODO Reenable after fixing select.
  //   // expect(() => testIsFormComponent(VaSelect)).not.toThrow()
  // })
  // it('has loading mixin', () => {
  //   // expect(() => testIsLoadingMixin(VaSelect)).not.toThrow()
  // })
})
