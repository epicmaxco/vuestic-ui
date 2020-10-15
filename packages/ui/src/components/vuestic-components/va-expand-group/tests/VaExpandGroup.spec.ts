import { mount, shallowMount } from '@vue/test-utils'

import { testHasStatefulMixin } from '../../../vuestic-mixins/StatefulMixin/testHasStatefulMixin'
import { testIsConfigProvidedComponent } from '../../../../services/config-transport/testIsConfigProvidedComponent'
import { StatefulMixin } from '../../../vuestic-mixins/StatefulMixin/StatefulMixin'
import VaExpandGroup from '../VaExpandGroup.vue'

describe('VaExpandGroup', () => {
  it('should render without an error', () => {
    const wrapper = mount(VaExpandGroup)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('has StatefulMixin', () => {
    expect(() =>
      testHasStatefulMixin((VaExpandGroup as unknown) as StatefulMixin),
    ).not.toThrow()
  })

  it('is contextable', () => {
    const props = {
      value: [],
      multiply: false,
      inset: false,
      popout: false,
    }
    expect(() => testIsConfigProvidedComponent(VaExpandGroup, props)).not.toThrow()
  })

  it('should emit `input`', async () => {
    const wrapper: any = shallowMount(VaExpandGroup)
    await wrapper.vm.onChildChange()
    expect(wrapper.emitted().input.length).toBe(1)
  })
})
