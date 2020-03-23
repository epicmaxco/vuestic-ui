import { shallowMount } from '@vue/test-utils'
import { SelectableListMixin } from './SelectableListMixin'

describe('SelectableListMixin', () => {
  const baseComponentOptions = {
    render: () => '',
    mixins: [SelectableListMixin],
    props: {},
  }

  const prepareWrapper = (data) => {
    return shallowMount(baseComponentOptions, { propsData: data })
  }

  it('should mount without erros', () => {
    const wrapper = shallowMount(baseComponentOptions)
    expect(wrapper).toBeDefined()
    expect(wrapper.props().options).toEqual([])
    expect(wrapper.props().textBy).toEqual('text')
    expect(wrapper.props().valueBy).toEqual('value')
    expect(wrapper.props().trackBy).toEqual('value')
    expect(wrapper.props().disabledBy).toEqual('disabled')
    expect(wrapper.props().outputObject).toBeFalsy()
  })

  it('should extend FormComponentMixin', () => {
    const wrapper = shallowMount(baseComponentOptions)
    expect(wrapper.vm.isFormComponent).toBeTruthy()
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
