import { mount, shallowMount } from '@vue/test-utils'

import { testHasStatefulMixin } from '../../../vuestic-mixins/StatefulMixin/testHasStatefulMixin'
import { StatefulMixin } from '../../../vuestic-mixins/StatefulMixin/StatefulMixin'
import VaExpandGroup from '../VaExpandGroup.vue'

describe('VaExpandGroup', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaExpandGroup)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  // FIXME
  xit('has StatefulMixin', () => {
    expect(() =>
      testHasStatefulMixin((VaExpandGroup as unknown) as StatefulMixin),
    ).not.toThrow()
  })

  it('should emit `input`', async () => {
    const wrapper: any = shallowMount(VaExpandGroup)
    await wrapper.vm.onChildChange()
    expect(wrapper.emitted().input.length).toBe(1)
  })
})
