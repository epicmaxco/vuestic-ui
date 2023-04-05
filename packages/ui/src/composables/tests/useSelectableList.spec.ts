import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import {
  useSelectableList,
  useSelectableListProps,
} from '../useSelectableList'

import type { VueWrapper } from '@vue/test-utils'

const TestComponent = {
  template: '<p></p>',
  props: { ...useSelectableListProps },
}

describe('useSelectableList', () => {
  it.each([
    [
      0,
      {},
      {
        getGroupBy: undefined,
        getText: '0',
        getTrackBy: 0,
        getValue: 0,
        getDisabled: false,
      },
    ],
    [
      false,
      {},
      {
        getGroupBy: undefined,
        getText: 'false',
        getTrackBy: false,
        getValue: false,
        getDisabled: false,
      },
    ],
    [
      'two',
      {},
      {
        getGroupBy: undefined,
        getText: 'two',
        getTrackBy: 'two',
        getValue: 'two',
        getDisabled: false,
      },
    ],
    [
      { text: 'textValue', disabled: false },
      {},
      {
        getGroupBy: undefined,
        getText: 'textValue',
        getTrackBy: { text: 'textValue', disabled: false },
        getValue: { text: 'textValue', disabled: false },
        getDisabled: false,
      },
    ],
    [
      { id: 'uniqueId', product: 'goodThing', cost: 1, inStock: true },
      {
        trackBy: 'id',
        valueBy: 'cost',
        textBy: 'product',
        disabledBy: 'inStock',
      },
      {
        getValue: 1,
        getText: 'goodThing',
        getTrackBy: 'uniqueId',
        getGroupBy: undefined,
        getDisabled: true,
      },
    ],
    [
      { status: false, productId: 0, notInStock: true, group: 'first' },
      {
        valueBy: 'status',
        textBy: 'productId',
        disabledBy: 'notInStock',
      },
      {
        getValue: false,
        getText: '0',
        getTrackBy: false,
        getGroupBy: 'first',
        getDisabled: true,
      },
    ],
  ])('option %s & props %s should be %s', async (option, props, expected) => {
    const wrapper: VueWrapper<any> = mount(TestComponent)
    expect(wrapper.exists()).toBeTruthy()

    if (Object.keys(props).length) {
      await wrapper.setProps(props)
    }

    const {
      getValue,
      getText,
      getTrackBy,
      getGroupBy,
      getDisabled,
    } = useSelectableList(wrapper.props() as any)

    const result = {
      getValue: getValue(option),
      getText: getText(option),
      getTrackBy: getTrackBy(option),
      getGroupBy: getGroupBy(option),
      getDisabled: getDisabled(option),
    }

    expect(result).toEqual(expected)
  })
})
