import { shallowMount } from '@vue/test-utils'
import { SelectableMixin } from './SelectableMixin'
import { StatefulMixin } from '../StatefulMixin/StatefulMixin'
import { mixins } from 'vue-class-component'
import { testHasColorThemeMixin } from '../../../services/testHasColorThemeMixin'
import { ColorMixin } from '../../../services/color-config/ColorMixin'
import { h } from 'vue'
// TODO Should probably have better typing. A  bit rushed.
export default class ExampleComponent extends mixins(SelectableMixin, StatefulMixin) {
  render () {
    return h('')
  }
}

describe('SelectableMixin', () => {
  describe('isChecked', () => {
    it('true and false', async () => {
      const wrapper = shallowMount(ExampleComponent)
      expect(wrapper.vm.isChecked).toBe(false)
      wrapper.setProps({ value: true })
      expect(wrapper.vm.isChecked).toBe(true)
    })
    it('with preset values', async () => {
      const wrapper = shallowMount(
        ExampleComponent,
        // Swap true and false.
        { propsData: { value: true, trueValue: false, falseValue: true } },
      )
      expect(wrapper.vm.isChecked).toBe(false)
      wrapper.setProps({ value: false })
      expect(wrapper.vm.isChecked).toBe(true)
    })
    it('with indeterminate', async () => {
      const wrapper = shallowMount(
        ExampleComponent,
        { propsData: { value: null, indeterminate: true } },
      )
      expect(wrapper.vm.isChecked).toBe(false)
      expect(wrapper.vm.isIndeterminate).toBe(true)
      wrapper.setProps({ value: false })
      expect(wrapper.vm.isChecked).toBe(false)
      expect(wrapper.vm.isIndeterminate).toBe(false)
      wrapper.setProps({ value: true })
      expect(wrapper.vm.isChecked).toBe(true)
      expect(wrapper.vm.isIndeterminate).toBe(false)
    })
  })
  it('has ColorThemeMixin', () => {
    expect(() =>
      testHasColorThemeMixin((ExampleComponent as unknown) as ColorThemeMixin),
    ).not.toThrow()
  })
})
