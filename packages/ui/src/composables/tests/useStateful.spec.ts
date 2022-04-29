import { useStateful, useStatefulProps, StatefulProps } from '../useStateful'
import { mount } from '@vue/test-utils'

const TestComponent = {
  template: '<p></p>',
  props: { ...useStatefulProps },
}

describe('useStateful', () => {
  it.each`
    props                                            | defaultValue |  expected        | setExpected
    ${{ stateful: true, modelValue: 'modelValue' }}  | ${true}      |  ${true}         | ${'newModelValue'}
    ${{ stateful: false, modelValue: 'modelValue' }} | ${true}      |  ${'modelValue'} | ${'modelValue'}
    ${{ stateful: true, modelValue: 'modelValue' }}  | ${undefined} |  ${'modelValue'} | ${'newModelValue'}
    ${{ stateful: false, modelValue: 'modelValue' }} | ${undefined} |  ${'modelValue'} | ${'modelValue'}
  `(
    'props $props & defaultValue $defaultValue should be $expected & then $setExpected',
    async ({ props, defaultValue, expected, setExpected }) => {
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
