import { useStateful, useStatefulProps, StatefulProps } from '../useStateful'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { fromTable } from '../../utils/test-utils'

const TestComponent = {
  template: '<p></p>',
  props: { ...useStatefulProps },
}

describe('useStateful', () => {
  it.each(fromTable`
    props                                            | defaultValue |  expected        | setExpected
    ${{ stateful: true, modelValue: 'modelValue' }}  | ${true}      |  ${true}         | ${'newModelValue'}
    ${{ stateful: false, modelValue: 'modelValue' }} | ${true}      |  ${'modelValue'} | ${'modelValue'}
    ${{ stateful: true, modelValue: 'modelValue' }}  | ${undefined} |  ${'modelValue'} | ${'newModelValue'}
    ${{ stateful: false, modelValue: 'modelValue' }} | ${undefined} |  ${'modelValue'} | ${'modelValue'}
  `)(
    'props %s & defaultValue %s should be %s & then %s',
    async (props, defaultValue, expected, setExpected) => {
      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()
      await wrapper.setProps(props)

      const { valueComputed } = useStateful(wrapper.props() as StatefulProps<string>, wrapper.vm.$emit, defaultValue)
      expect(valueComputed.value).toBe(expected)

      valueComputed.value = setExpected
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([setExpected])
      expect(valueComputed.value).toBe(props.stateful ? setExpected : expected)
    },
  )
})
