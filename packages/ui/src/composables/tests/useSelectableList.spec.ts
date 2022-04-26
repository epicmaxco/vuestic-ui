import { useSelectableList, useSelectableListProps, SelectableListProps } from '../useSelectableList'
import { mount } from '@vue/test-utils'

const TestComponent = {
  template: '<p></p>',
  props: { ...useSelectableListProps },
}

describe('useSelectableList', () => {
  it.each`
    option                                       | expected
    ${1}                                         | ${{ getGroupBy: 1, getOptionByValue: 1, getText: 1, getTrackBy: 1, getValue: 1 }}
    ${'two'}                                     | ${{ getGroupBy: 'two', getOptionByValue: 'two', getText: 'two', getTrackBy: 'two', getValue: 'two' }}
    ${{ text: 'textValue', disabled: false }}    | ${{ getGroupBy: undefined, getOptionByValue: { text: 'textValue', disabled: false }, getText: 'textValue', getTrackBy: undefined, getValue: { text: 'textValue', disabled: false } }}
  `(
    'option $option should be $expected',
    ({ option, expected }) => {
      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()

      const { getOptionByValue, getValue, getText, getTrackBy, getGroupBy } = useSelectableList(wrapper.props() as SelectableListProps)

      const result = {
        getOptionByValue: getOptionByValue(option),
        getValue: getValue(option),
        getText: getText(option),
        getTrackBy: getTrackBy(option),
        getGroupBy: getGroupBy(option),
      }
      expect(result).toMatchObject(expected)
    },
  )
})
