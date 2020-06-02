import { shallowMount } from '@vue/test-utils'
import { SelectableMixin } from './SelectableMixin'
import { StatefulMixin } from '../StatefullMixin/StatefulMixin'
import Component, { mixins } from 'vue-class-component'

// TODO Should probably have better typing. A  bit rushed.
@Component
export default class ExampleComponent extends mixins(SelectableMixin, StatefulMixin) {
  render () {
    return ''
  }
}

describe('SelectableMixin', () => {
  it('checked flag should change', async () => {
    const wrapper = shallowMount(
      ExampleComponent,
      { propsData: { value: 'test-value', trueValue: 'test-value-2' } } as any,
    )
    expect(wrapper.vm.isChecked).toBe(false)
    wrapper.setProps({ trueValue: 'test-value' })
    expect(wrapper.vm.isChecked).toBe(true)
  })
})
