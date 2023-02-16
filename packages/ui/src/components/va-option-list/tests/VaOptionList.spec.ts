import { describe, it, expect, beforeEach } from 'vitest'
import { mountWithGlobalConfig, shallowMountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaOptionList from '../VaOptionList.vue'

describe('VaOptionList', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaOptionList)
    expect(wrapper.exists()).toBeTruthy()
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
