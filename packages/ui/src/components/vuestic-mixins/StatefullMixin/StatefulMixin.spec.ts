import { shallowMount } from '@vue/test-utils'
import { StatefulMixin } from './StatefulMixin'
import { sleep } from '../../../services/utils'
import Component, { mixins } from 'vue-class-component'

// TODO Should probably have better typing. A bit rushed.
@Component
export default class ExampleComponent extends mixins(StatefulMixin) {
  render () {
  }
}

describe('StatefulMixin', () => {
  it('stateless', async () => {
    const wrapper = shallowMount(
      ExampleComponent,
      { propsData: { value: 'one' } } as any,
    )
    expect(wrapper.vm.valueComputed).toBe('one')
    // Component can't modify value
    wrapper.vm.valueComputed = 'two'
    expect(wrapper.vm.valueComputed).toBe('one')
    // But parent can
    wrapper.setProps({value: 'three'})
    expect(wrapper.vm.valueComputed).toBe('three')
  })
  it('stateful', async () => {
    const wrapper = shallowMount(
      ExampleComponent,
      {
        propsData: { stateful: true }
      } as any,
    )
    expect(wrapper.vm.valueComputed).toBe(undefined)
    // Component can modify value
    wrapper.vm.valueComputed = 'one'
    expect(wrapper.vm.valueComputed).toBe('one')
    // Parent can modify value as well
    wrapper.setProps({value: 'three', stateful: true})
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.valueComputed).toBe('three')
  })
})
