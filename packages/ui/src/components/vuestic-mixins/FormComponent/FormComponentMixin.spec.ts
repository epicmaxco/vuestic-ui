import { shallowMount } from '@vue/test-utils'
import { FormComponentMixin } from './FormComponentMixin'
import { sleep } from '../../../services/utils'
import { Mixins, Prop } from 'vue-property-decorator'
import { h } from 'vue'

export default class ExampleComponent extends Mixins(FormComponentMixin) {
  render () {
    return h('')
  }

  @Prop({}) value: any
}

describe('FormElementMixin', () => {
  it('sets selfValidatesOnBlur on first interaction', async () => {
    const wrapper = shallowMount(ExampleComponent)
    expect(wrapper.vm.shouldValidateOnBlur).toBe(false)
    wrapper.vm.isFocused = true
    await sleep() // Waiting for watcher to trigger.
    expect(wrapper.vm.shouldValidateOnBlur).toBe(true)
  })
})
