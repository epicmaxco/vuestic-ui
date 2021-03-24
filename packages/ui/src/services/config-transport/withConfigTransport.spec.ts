import { h } from 'vue'
import { Options, Vue, setup, prop, mixins } from 'vue-class-component'
import { mount, config } from '@vue/test-utils'

import withConfigTransport, { getComponentOptions, resolveProps } from './withConfigTransport'
import { GlobalConfig, useGlobalConfig, GlobalConfigPlugin } from '../GlobalConfigPlugin'
import VaConfig from '../../components/vuestic-components/va-config/VaConfig'

const initialConfig = {
  all: { value: 'valueFromContext' },
  ExampleComponent: { propValue: 'propValueFromContext' },
}

config.global.plugins.push([GlobalConfigPlugin, initialConfig])

class MixinProps {
  value = prop<number>({ type: Number, default: 42 })
  anotherProp = prop<object>({ type: Object, default: {} })
}

const Mixin = Vue.with(MixinProps)

class Props {
  value = prop<string>({
    default: 'value',
  })

  propValue = prop<string>({
    default: 'propValue',
  })
}

@Options({
  emits: ['update:modelSomething'],
})
class EmitterMixin extends Vue {
  handleSomething () {
    this.$emit('update:modelSomething', 'some value')
  }
}

@Options<ExampleComponent>({
  name: 'ExampleComponent',
  methods: {
    optionsMethod: function () {
      return this.value
    },
  },
  emits: ['update:modelValue'],
})
class ExampleComponent extends mixins(Mixin, Vue.with(Props), EmitterMixin) {
  globalConfig = setup(() => {
    return useGlobalConfig()
  })

  testMethod () {
    this.$emit('update:modelValue', this.value)
    this.handleSomething()

    return `${this.value} ${this.propValue}`
  }

  render () {
    return h(
      'div',
      {
        class: 'example-component',
      },
    )
  }
}

describe('withConfigTransport', () => {
  it('should pass the context props to the child', (done) => {
    const wrapper = mount(
      {
        render: () => h(
          withConfigTransport(ExampleComponent),
        ),
      })

    const instance = wrapper.findComponent({ name: 'ExampleComponent' }).vm

    expect((instance as any).propValue).toBe('propValueFromContext')

    expect((instance as any).value).toBe('valueFromContext')

    ;(instance as any).globalConfig.setGlobalConfig((config: GlobalConfig) => ({
      ...config,
      all: { value: 'updateValueFromContext' },
    }))

    instance.$nextTick(() => {
      expect((instance as any).value).toBe('updateValueFromContext')
      done()
    })

    ;(instance as any).globalConfig.setGlobalConfig((config: GlobalConfig) => ({
      ...config,
      ExampleComponent: { propValue: 'updatePropValueFromContext' },
    }))

    expect((instance as any).propValue).toBe('propValueFromContext')

    instance.$nextTick(() => {
      expect((instance as any).propValue).toBe('updatePropValueFromContext')
      done()
    })
  })

  it('should take a local prop', async () => {
    const wrapper = mount(
      {
        render: () => h(
          withConfigTransport(ExampleComponent),
          {
            value: 'local value',
          },
        ),
      })

    let instance = wrapper.findComponent({ name: 'ExampleComponent' }).vm

    expect((instance as any).value).toBe('local value')

    await wrapper.setProps({ value: undefined })

    instance = wrapper.findComponent({ name: 'ExampleComponent' }).vm

    expect((instance as any).value).toBe('valueFromContext')
  })

  it('should take a local context prop', async () => {
    const WithConfigTransportExampleComponent = withConfigTransport(ExampleComponent)

    const root = mount(
      {
        render () {
          return h(
            VaConfig,
            {
              config: {
                ExampleComponent: {
                  value: 'local context value',
                  propValue: 'local context propValue',
                },
              },
            },
            [h(WithConfigTransportExampleComponent)],
          )
        },
      })

    const wrapper = root.findComponent({ name: 'ExampleComponent' })

    const instance = wrapper.vm

    expect((instance as any).value).toBe('local context value')
    expect((instance as any).propValue).toBe('local context propValue')
  })

  it("should work with child's methods", () => {
    const wrapper = mount(
      {
        render: () => h(
          withConfigTransport(ExampleComponent),
          {
            ref: 'example',
          },
        ),
      })

    const instance = wrapper.findComponent({ ref: 'example' }).vm

    expect((instance as any).testMethod()).toBe('valueFromContext propValueFromContext')
    expect((instance as any).optionsMethod()).toBe('valueFromContext')
  })

  it("should work with child's emits", () => {
    const handleClick = jest.fn()
    const handleSomething = jest.fn()

    const wrapper = mount(
      {
        render: () => h(
          withConfigTransport(ExampleComponent),
          {
            ref: 'example',
            'onUpdate:modelValue': handleClick,
            'onUpdate:modelSomething': handleSomething,
          },
        ),
      })

    const instance = wrapper.findComponent({ ref: 'example' }).vm
    ;(instance as any).testMethod()

    expect(handleClick).toHaveBeenCalledWith('valueFromContext')
    expect(handleSomething).toHaveBeenCalledWith('some value')
  })

  it('should merge props from mixins and extends', () => {
    const E = {
      props: {
        base: null,
        m2: {
          default: 'm2',
        },
      },
    }
    const M1 = {
      props: ['m1'],
    }
    const M2 = {
      props: { m2: null, self: { type: Number, default: 1 } },
    }
    const Comp = {
      props: {
        self: {
          type: String,
          default: 'self',
        },
      },
      mixins: [M1, M2],
      extends: E,
    }

    const props = {
      self: {
        type: String,
        default: 'self',
      },
      base: null,
      m1: null,
      m2: null,
    }

    const options = getComponentOptions(Comp as any)

    expect(resolveProps(options)).toMatchObject(props)
  })
})
