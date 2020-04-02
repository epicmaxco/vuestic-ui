import { shallowMount } from '@vue/test-utils'
import { FormComponentMixin } from './FormComponentMixin'
import { sleep } from '../../../services/utils'

const componentOptions = {
  render: () => '',
  mixins: [FormComponentMixin],
  props: {
    value: {},
  },
}

describe('FormElementMixin', () => {
  it('sets selfValidatesOnBlur on first interaction', async () => {
    const wrapper = shallowMount(componentOptions)
    expect(wrapper.vm.shouldValidateOnBlur).toBe(false)
    wrapper.vm.isFocused = true
    await sleep() // Waiting for watcher to trigger.
    expect(wrapper.vm.shouldValidateOnBlur).toBe(true)
  })
})
