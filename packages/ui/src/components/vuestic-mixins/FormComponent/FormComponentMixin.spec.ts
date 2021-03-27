import { shallowMount } from '@vue/test-utils'
import { FormComponentMixin } from './FormComponentMixin'
import { sleep } from '../../../services/utils'
import { Vue, Options, prop } from 'vue-class-component'
import { h } from 'vue'

class ExampleComponentProp {
  value = prop<any>({})
}

@Options({
  mixins: [FormComponentMixin],
})
export default class ExampleComponent extends Vue.with(ExampleComponentProp) {
  render () {
    return h('')
  }
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
