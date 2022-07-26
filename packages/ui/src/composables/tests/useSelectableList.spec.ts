import { useSelectableList, useSelectableListProps } from '../useSelectableList'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

const TestComponent = {
  template: '<p></p>',
  props: { ...useSelectableListProps },
}

// TODO Test broken. Getting error.
describe.skip('useSelectableList', () => {
  it.each([
    /* eslint-disable */
//   option                                                                 | props                                                                           | expected
    [1                                                                   , {}                                                                           , { getGroupBy: 1, getOptionByValue: 1, getText: 1, getTrackBy: 1, getValue: 1, getDisabled: 1 }                                                                                                         ],
    ['two'                                                               , {}                                                                           , { getGroupBy: 'two', getOptionByValue: 'two', getText: 'two', getTrackBy: 'two', getValue: 'two', getDisabled: 'two' }                                                                                 ],
    [{ text: 'textValue', disabled: false }                              , {}                                                                           , { getGroupBy: undefined, getOptionByValue: { text: 'textValue', disabled: false }, getText: 'textValue', getTrackBy: undefined, getValue: { text: 'textValue', disabled: false }, getDisabled: false } ],
    [{ id: 'uniqueId', product: 'goodThing', cost: 1, inStock: true }    , { trackBy: 'id', valueBy: 'cost', textBy: 'product', disabledBy: 'inStock' } , { getOptionByValue: { id: 'uniqueId', product: 'goodThing', cost: 1, inStock: true }, getValue: 1, getText: 'goodThing', getTrackBy: 'uniqueId', getGroupBy: undefined, getDisabled: true }            ],
    /* eslint-enable */
  ])('option %s & props %s should be %s', async (option, props, expected) => {
    // TODO 2nd test is broken for some reason.

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
      // TODO Can we get rid of any?
    } = useSelectableList(wrapper.props() as any)

    const result = {
      getOptionByValue: getOptionByValue(option),
      getValue: getValue(option),
      getText: getText(option),
      getTrackBy: getTrackBy(option),
      getGroupBy: getGroupBy(option),
      getDisabled: getDisabled(option),
    }
    expect(result).toMatchObject(expected)
  })
})
