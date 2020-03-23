import { shallowMount } from '@vue/test-utils'
import { SelectableListMixin } from './SelectableListMixin'

describe('SelectableListMixin', () => {
  let baseComponentOptions

  const prepareWrapper = (prop, value) => {
    baseComponentOptions.propsData[prop] = value
    return shallowMount({}, baseComponentOptions)
  }

  beforeEach(() => {
    baseComponentOptions = {
      render: () => '',
      mixins: [SelectableListMixin],
      propsData: {},
    }
  })

  it('should mount without erros', () => {
    const wrapper = shallowMount({}, baseComponentOptions)
    expect(wrapper).toBeDefined()
    expect(wrapper.props().options).toEqual([])
    expect(wrapper.props().textBy).toEqual('text')
    expect(wrapper.props().valueBy).toEqual('value')
    expect(wrapper.props().trackBy).toEqual('value')
    expect(wrapper.props().disabledBy).toEqual('disabled')
    expect(wrapper.props().outputObject).toBeFalsy()
  })

  describe('getValue', () => {
    it('should work with a string', () => {
      const wrapper = prepareWrapper('valueBy', 'testValue')
      const expectedValue = 'VALUE'
      const actuallValue = wrapper.vm.getValue({ testValue: expectedValue })

      expect(actuallValue).toEqual(expectedValue)
    })

    it('should work with a nested props', () => {
      const wrapper = prepareWrapper('valueBy', 'test.value.test')
      const expectedValue = 'VALUE'
      const actuallValue = wrapper.vm.getValue({
        test: {
          value: {
            test: expectedValue,
          },
        },
      })

      expect(actuallValue).toEqual(expectedValue)
    })

    it('should work with a function', () => {
      const wrapper = prepareWrapper('valueBy', opt => opt.test)
      const expectedValue = 'VALUE'
      const actuallValue = wrapper.vm.getValue({ test: expectedValue })

      expect(actuallValue).toEqual(expectedValue)
    })
  })

  describe('getText', () => {
    it('should work with a string', () => {
      const wrapper = prepareWrapper('textBy', 'testValue')
      const expectedValue = 'VALUE'
      const actuallValue = wrapper.vm.getText({ testValue: expectedValue })

      expect(actuallValue).toEqual(expectedValue)
    })

    it('should work with a nested props', () => {
      const wrapper = prepareWrapper('textBy', 'test.value.test')
      const expectedValue = 'VALUE'
      const actuallValue = wrapper.vm.getText({
        test: {
          value: {
            test: expectedValue,
          },
        },
      })

      expect(actuallValue).toEqual(expectedValue)
    })

    it('should work with a function', () => {
      const wrapper = prepareWrapper('textBy', opt => opt.test)
      const expectedValue = 'VALUE'
      const actuallValue = wrapper.vm.getText({ test: expectedValue })

      expect(actuallValue).toEqual(expectedValue)
    })
  })
})
