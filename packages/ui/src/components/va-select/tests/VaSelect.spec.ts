import { describe, it, expect } from 'vitest'
import { mountWithGlobalConfig, shallowMountWithGlobalConfig } from '../../../utils/unit-test-utils'

import VaSelect from '../VaSelect.vue'

describe('VaSelect', () => {
  it('should render without an error', () => {
    const wrapper = mountWithGlobalConfig(VaSelect)
    expect(wrapper.exists()).toBeTruthy()
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
