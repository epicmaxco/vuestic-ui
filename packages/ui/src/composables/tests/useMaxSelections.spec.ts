import { useMaxSelections, useMaxSelectionsProps } from '../useMaxSelections'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { describe, it, expect } from 'vitest'

const TestComponent = {
  template: '<p></p>',
  props: { ...useMaxSelectionsProps },
}

describe('useMaxSelections', () => {
  it(
    'addOption should add (emit) new item in selections list, exceedsMaxSelections should return true, if maxSelections value is reached',
    async () => {
      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()
      await wrapper.setProps({ maxSelections: 1 })

      const selections = ref([] as number[])
      const { addOption, exceedsMaxSelections } = useMaxSelections(selections, ref(wrapper.props().maxSelections), wrapper.vm.$emit)

      expect(exceedsMaxSelections()).toBe(false)

      addOption(1)
      selections.value.push(...((wrapper.emitted()['update:modelValue'] as Array<Array<Array<number>>>)[0][0]))

      expect(selections.value[0]).toBe(1)
      expect(exceedsMaxSelections()).toBe(true)
    },
  )
})
