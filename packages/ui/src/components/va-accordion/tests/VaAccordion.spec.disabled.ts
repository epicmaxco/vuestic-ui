import { mount } from '@vue/test-utils'

import { testHasStatefulMixin } from '../../../mixins/StatefulMixin/testHasStatefulMixin'
import { StatefulMixin } from '../../../mixins/StatefulMixin/StatefulMixin'

import VaAccordion from '../VaAccordion.vue'

describe('VaAccordion', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaAccordion)
    expect(wrapper.exists()).toBeTruthy()
  })
  it('has StatefulMixin', () => {
    expect(() =>
      testHasStatefulMixin((VaAccordion as unknown) as StatefulMixin),
    ).not.toThrow()
  })

  it('should emit `input`', async () => {
    const wrapper: any = mount(VaAccordion)
    await wrapper.vm.onChildChange()
    expect(wrapper.emitted().input.length).toBe(1)
  })
})
