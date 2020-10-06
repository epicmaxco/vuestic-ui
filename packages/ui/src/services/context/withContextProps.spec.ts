import { Component, Mixins, Prop } from 'vue-property-decorator'
import ContextMixin from '../../mixins/ContextMixin'
import Vue, { ComponentOptions, CreateElement } from 'vue'
import withContextProps from './withContextProps'
import GlobalConfigPlugin, { ContextConfig, setGlobalConfig } from '../GlobalConfigPlugin'
import { createLocalVue, mount } from '@vue/test-utils'

function mountWithPlugin (
  component: ComponentOptions<Vue>,
  options: ContextConfig,
) {
  const _Vue = createLocalVue()
  _Vue.use(GlobalConfigPlugin, options)

  return mount(component, {
    localVue: _Vue,
  })
}

describe('withContextProps', () => {
  const initialConfig = {
    all: { value: 'valueFromContext' },
    ExampleComponent: { propValue: 'propValueFromContext' },
  }

  @Component({
    name: 'ExampleComponent',
  })
  class ExampleComponent extends Mixins(ContextMixin) {
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
          withContextProps(ExampleComponent),
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
})
