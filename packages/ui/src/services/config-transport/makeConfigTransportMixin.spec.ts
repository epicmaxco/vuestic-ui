import Vue, { ComponentOptions, CreateElement } from 'vue'
import { Component, Mixins } from 'vue-property-decorator'
import { createLocalVue, mount } from '@vue/test-utils'

import { makeConfigTransportMixin } from './makeConfigTransportMixin'
import GlobalConfigPlugin, { GlobalConfig, setGlobalConfig } from '../GlobalConfigPlugin'
import VaConfig from '../../components/vuestic-components/va-config/VaConfig'

function mountWithPlugin (
  component: ComponentOptions<Vue>,
  options: GlobalConfig,
) {
  const _Vue = createLocalVue()
  _Vue.use(GlobalConfigPlugin, options)

  return mount(component, {
    localVue: _Vue,
  })
}

describe('makeConfigTransportMixin', () => {
  const initialConfig = {
    all: { value: 'valueFromContext' },
    ExampleComponent: { propValue: 'propValueFromContext' },
  }

  const OneMixin = makeConfigTransportMixin({
    oneMixinValue: {
      type: String,
      default: 'oneMixinPropDefault',
    },
  })

  const LocalConfigMixin = makeConfigTransportMixin({
    value: {
      type: String,
      default: 'value',
    },
    propValue: {
      type: String,
      default: 'propValue',
    },
  })

  @Component({
    name: 'ExampleComponent',
  })
  class ExampleComponent extends Mixins(LocalConfigMixin, OneMixin) {
    render () {
      return null
    }
  }

  it('should pass the context props to the child', () => {
    const wrapper = mountWithPlugin(
      {
        render: (h: CreateElement) => h(ExampleComponent),
      },
      initialConfig,
    ).find(ExampleComponent)

    const instance = wrapper.vm

    expect((instance as any).c_value).toBe('valueFromContext')
    expect((instance as any).c_propValue).toBe('propValueFromContext')

    setGlobalConfig(config => ({
      ...config,
      all: { value: 'updateValueFromContext' },
    }))

    expect((instance as any).c_value).toBe('updateValueFromContext')

    setGlobalConfig(config => ({
      ...config,
      ExampleComponent: { propValue: 'updatePropValueFromContext' },
    }))

    expect((instance as any).c_propValue).toBe('updatePropValueFromContext')
  })

  it('should take a local prop', () => {
    const wrapper = mountWithPlugin(
      {
        render: (h: CreateElement) => h(ExampleComponent,
          {
            props: {
              value: 'local value',
            },
          },
        ),
      },
      initialConfig,
    ).find(ExampleComponent)

    const instance = wrapper.vm

    expect((instance as any).c_value).toBe('local value')

    wrapper.setProps({ value: undefined })

    expect((instance as any).c_value).toBe(undefined)
  })

  it('should take a local context prop', () => {
    const wrapper = mountWithPlugin(
      {
        render: (h: CreateElement) => h(
          VaConfig,
          {
            props: {
              config: {
                ExampleComponent: {
                  value: 'context value',
                  propValue: 'context local value',
                },
              },
            },
          },
          [h(ExampleComponent)],
        ),
      },
      initialConfig,
    ).find(ExampleComponent)

    const instance = wrapper.vm

    expect((instance as any).c_value).toBe('context value')
    expect((instance as any).c_propValue).toBe('context local value')

    wrapper.setProps({ propValue: undefined })

    expect((instance as any).c_propValue).toBe('context local value')
  })

  it('should combine props with other config transport mixins', () => {
    const wrapper = mountWithPlugin(
      {
        render: (h: CreateElement) => h(
          VaConfig,
          {
            props: {
              config: {
                ExampleComponent: {
                  oneMixinValue: 'context value',
                },
              },
            },
          },
          [h(ExampleComponent)],
        ),
      },
      initialConfig,
    ).find(ExampleComponent)

    const instance = wrapper.vm

    expect((instance as any).c_oneMixinValue).toBe('context value')
  })
})
