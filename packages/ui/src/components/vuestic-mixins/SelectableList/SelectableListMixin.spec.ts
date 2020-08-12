// @ts-nocheck
import { shallowMount } from '@vue/test-utils'
import { SelectableListMixin } from './SelectableListMixin'
import { testIsContextableComponent } from '../../context-test/context-provide/testIsContextableComponent'

describe('SelectableListMixin', () => {
  const baseComponentOptions = {
    render: () => '',
    mixins: [SelectableListMixin],
    props: {},
  }

  const prepareWrapper = (data) => {
    return shallowMount(baseComponentOptions, { propsData: data })
  }

  it('should mount without errors', () => {
    expect(() => testIsContextableComponent(baseComponentOptions, {}, {})).not.toThrow()
  })

  describe('getValue', () => {
    it('should work with a string', () => {
      const wrapper = prepareWrapper({ valueBy: 'testValue' })
      const expectedValue = 'VALUE'
      const actualValue = wrapper.vm.getValue({ testValue: expectedValue })

      expect(actualValue).toEqual(expectedValue)
    })

    it('should work with a nested props', () => {
      const wrapper = prepareWrapper({ valueBy: 'test.value.test' })
      const expectedValue = 'VALUE'
      const actualValue = wrapper.vm.getValue({
        test: {
          value: {
            test: expectedValue,
          },
        },
      })

      expect(actualValue).toEqual(expectedValue)
    })

    it('should work with a function', () => {
      const wrapper = prepareWrapper({ valueBy: opt => opt.test })
      const expectedValue = 'VALUE'
      const actualValue = wrapper.vm.getValue({ test: expectedValue })

      expect(actualValue).toEqual(expectedValue)
    })
  })

  describe('getText', () => {
    it('should work with a string', () => {
      const wrapper = prepareWrapper({ textBy: 'testValue' })
      const expectedValue = 'VALUE'
      const actualValue = wrapper.vm.getText({ testValue: expectedValue })

      expect(actualValue).toEqual(expectedValue)
    })

    it('should work with a nested props', () => {
      const wrapper = prepareWrapper({ textBy: 'test.value.test' })
      const expectedValue = 'VALUE'
      const actualValue = wrapper.vm.getText({
        test: {
          value: {
            test: expectedValue,
          },
        },
      })

      expect(actualValue).toEqual(expectedValue)
    })

    it('should work with a function', () => {
      const wrapper = prepareWrapper({ textBy: opt => opt.test })
      const expectedValue = 'VALUE'
      const actualValue = wrapper.vm.getText({ test: expectedValue })

      expect(actualValue).toEqual(expectedValue)
    })
  })
})
