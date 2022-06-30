import { useSelectableList, useSelectableListProps, SelectableListProps } from '../useSelectableList'
import { mount } from '@vue/test-utils'

const TestComponent = {
  template: '<p></p>',
  props: { ...useSelectableListProps },
}

describe('useSelectableList', () => {
  it.each`
    option                                                                 | props                                                                           | expected
    ${1}                                                                   | ${{}}                                                                           | ${{ getGroupBy: 1, getOptionByValue: 1, getText: 1, getTrackBy: 1, getValue: 1, getDisabled: 1 }}
    ${'two'}                                                               | ${{}}                                                                           | ${{ getGroupBy: 'two', getOptionByValue: 'two', getText: 'two', getTrackBy: 'two', getValue: 'two', getDisabled: 'two' }}
    ${{ text: 'textValue', disabled: false }}                              | ${{}}                                                                           | ${{ getGroupBy: undefined, getOptionByValue: { text: 'textValue', disabled: false }, getText: 'textValue', getTrackBy: undefined, getValue: { text: 'textValue', disabled: false }, getDisabled: false }}
    ${{ id: 'uniqueId', product: 'goodThing', cost: 1, inStock: true }}    | ${{ trackBy: 'id', valueBy: 'cost', textBy: 'product', disabledBy: 'inStock' }} | ${{ getOptionByValue: { id: 'uniqueId', product: 'goodThing', cost: 1, inStock: true }, getValue: 1, getText: 'goodThing', getTrackBy: 'uniqueId', getGroupBy: undefined, getDisabled: true }}
  `(
    'option $option & props $props should be $expected',
    async ({ option, props, expected }) => {
      const wrapper = mount(TestComponent)
      expect(wrapper.exists()).toBeTruthy()

      if (Object.keys(props).length) {
        await wrapper.setProps(props)
      }

      const {
        getOptionByValue,
        getValue,
        getText,
        getTrackBy,
        getGroupBy,
        getDisabled,
      } = useSelectableList(wrapper.props() as SelectableListProps)

      const result = {
        getOptionByValue: getOptionByValue(option),
        getValue: getValue(option),
        getText: getText(option),
        getTrackBy: getTrackBy(option),
        getGroupBy: getGroupBy(option),
        getDisabled: getDisabled(option),
      }
      expect(result).toMatchObject(expected)
    },
  )
})
