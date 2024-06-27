import { describe, it, expect } from 'vitest'

import { mountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSelect from '../VaSelect.vue'
import VaDropdownContent from '../../va-dropdown/components/VaDropdownContent/VaDropdownContent.vue'

import type { VueWrapper } from '@vue/test-utils'

describe('VaSelect', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSelect)
    expect(wrapper.exists()).toBeTruthy()
  })

  const options = [
    { id: 1, label: 'one', value: 0, disabled: true, group: '1' },
    { id: 0, label: false, value: 1, disabled: false, group: 1 },
    { id: 0, label: false, value: 1, disabled: false, group: 1 },
  ]

  it('should compare options correctly', async () => {
    const wrapper: VueWrapper<any> = mountWithGlobalConfig(VaSelect, {
      attrs: {
        options,
        valueBy: 'value',
        textBy: 'label',
        modelValue: 1,
      },
    })

    expect(wrapper.vm.compareOptions(options[0], options[1])).toBe(false)
    expect(wrapper.vm.compareOptions(options[0], options[0])).toBe(true)
    expect(wrapper.vm.compareOptions(options[1], options[2])).toBe(true)

    // checking if selected option in the options list is correct (relies on getTrackBy and getText)
    wrapper.vm.showDropdownContentComputed = true
    await wrapper.vm.$nextTick()
    const dropdownContent = wrapper.getComponent(VaDropdownContent)
    expect(dropdownContent.find('.va-select-option--selected').text()).toBe(`${options[1].label}  check`)
    expect(wrapper.find('.va-input-wrapper__text').text()).toBe(String(options[1].label))
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
      const wrapper: VueWrapper<any> = mountWithGlobalConfig(VaSelect, {
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
      expect(wrapper.vm.getOptionByValue(value)).toEqual(options[value])

      // checking if selected option output is correct (relies on getText and getValue)
      expect(wrapper.find('.va-input-wrapper__text').text()).toBe(expected[0])
    })
  })

  it('should interpret `useSelectableProps`', () => {
    const wrapper: VueWrapper<any> = mountWithGlobalConfig(VaSelect, {
      attrs: {
        options: ['Text1', 'Text2'],
        textBy: 'label',
        modelValue: 'Text1',
      },
    })

    expect(wrapper.find('.va-input-wrapper__text').text()).toBe('Text1')
  })

  it('should interpret `useSelectableProps`', () => {
    const wrapper: VueWrapper<any> = mountWithGlobalConfig(VaSelect, {
      attrs: {
        options,
        textBy: 'label',
        modelValue: 'Not a object',
      },
    })

    expect(wrapper.find('.va-input-wrapper__text').text()).toBe('Not a object')
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
