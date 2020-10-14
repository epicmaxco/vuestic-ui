import OurVue, { ComponentOptions, CreateElement } from 'vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { createLocalVue, mount } from '@vue/test-utils'

import withConfigTransport from './withConfigTransport'
import GlobalConfigPlugin, { GlobalConfig, setGlobalConfig } from '../GlobalConfigPlugin'
import VaConfig from '../../components/vuestic-components/va-config/VaConfig'

function mountWithPlugin (
  component: ComponentOptions<OurVue>,
  options: GlobalConfig,
) {
  const _Vue = createLocalVue()
  _Vue.use(GlobalConfigPlugin, options)

  return mount(component, {
    localVue: _Vue,
  })
}

describe('withConfigTransport', () => {
  const initialConfig = {
    all: { value: 'valueFromContext' },
    ExampleComponent: { propValue: 'propValueFromContext' },
  }

  @Component({
    name: 'ExampleComponent',
  })
  class ExampleComponent extends Vue {
    @Prop({
      type: String,
      default: 'value',
    })
    value?: string

    @Prop({
      type: String,
      default: 'propValue',
    })
    propValue?: string

    render () {
      return null
    }
  }

  it('should pass the context props to the child', (done) => {
    const wrapper = mountWithPlugin(
      {
        render: (h: CreateElement) => h(
          withConfigTransport(ExampleComponent),
        ),
      },
      initialConfig,
    ).find(ExampleComponent)

    const instance = wrapper.vm

    expect((instance as any).value).toBe('valueFromContext')

    setGlobalConfig(config => ({
      ...config,
      all: { value: 'updateValueFromContext' },
    }))

    instance.$nextTick(() => {
      expect((instance as any).value).toBe('updateValueFromContext')
      done()
    })

    setGlobalConfig(config => ({
      ...config,
      ExampleComponent: { propValue: 'updatePropValueFromContext' },
    }))

    expect((instance as any).propValue).toBe('propValueFromContext')

    instance.$nextTick(() => {
      expect((instance as any).propValue).toBe('updatePropValueFromContext')
      done()
    })
  })

  it('should take a local prop', () => {
    const wrapper = mountWithPlugin(
      {
        render: (h: CreateElement) => h(
          withConfigTransport(ExampleComponent),
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

    expect((instance as any).value).toBe('local value')

    wrapper.setProps({ value: undefined })

    expect((instance as any).value).toBe(undefined)
  })

  it('should take a local context prop', () => {
    const WithConfigTransportExampleComponent = withConfigTransport(ExampleComponent)

    const root = mountWithPlugin(
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
          [h(WithConfigTransportExampleComponent)],
        ),
      },
      initialConfig,
    )

    const wrapper = root.find(ExampleComponent)

    const instance = wrapper.vm

    expect((instance as any).value).toBe('context value')
    expect((instance as any).propValue).toBe('context local value')

    root.find(WithConfigTransportExampleComponent as any).setProps({ propValue: undefined })

    expect((instance as any).propValue).toBe('context local value')
  })
})
