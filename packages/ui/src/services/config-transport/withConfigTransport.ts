import { isArray, isObject, camelCase, upperFirst } from 'lodash'
import { DefineComponent, ComponentOptions, h, computed, SetupContext } from 'vue'
import { PropOptions, VueConstructor } from 'vue-class-component'

import { useLocalConfig } from '../../components/vuestic-components/va-config/VaConfig'
import { useGlobalConfig, GlobalConfig } from '../GlobalConfigPlugin'
import { getLocalConfigWithComponentProp } from './createConfigValueGetter'
import { ComponentConfig } from '../component-config/component-config'

export type Props = {
  [key: string]: PropOptions;
}

const createConfigValueGetter = (
  globalConfig: ComponentConfig,
  configChain: ComponentConfig[],
  componentName = '',
) => (
  prop: string,
  defaultValue: any,
) => {
  // We have to pass context here as this method will be mainly used in prop default,
  // and methods are not accessible there.
  const configLayers = globalConfig ? [globalConfig, ...configChain] : configChain

  const configLayer = getLocalConfigWithComponentProp(configLayers, componentName, prop)

  if (configLayer) {
    return configLayer[componentName][prop]
  }

  return typeof defaultValue === 'function' ? defaultValue() : defaultValue
}

export function getComponentOptions (component: DefineComponent): ComponentOptions {
  switch (true) {
  case Boolean(component.options):
    return component.options
  case Boolean(component.__vccOpts) || Boolean(component.__b):
    return { ...component.__b, ...component.__vccOpts }
  default:
    return component
  }
}

function normalizeProps (props: any) {
  switch (true) {
  case isArray(props):
    return props.reduce((acc: object, prop: string) => ({ ...acc, [prop]: null }), {})
  case isObject(props):
    return props
  default:
    return {}
  }
}

function mergeProps (to: Record<string, any>, from: Record<string, any>, optionsType = 'props') {
  const { mixins, extends: extendsOptions } = from

  extendsOptions && mergeProps(to, extendsOptions, optionsType)
  mixins && mixins.forEach((m: any) => mergeProps(to, m, optionsType))

  const props = normalizeProps(from[optionsType])

  for (const key in props) {
    to[key] = props[key]
  }
}

export function resolveProps (options: any, optionsType = 'props') {
  const mixins = options.mixins ?? []
  const extendsOptions = options.extends ?? []
  const result = {}

  mergeProps(result, extendsOptions, optionsType)

  for (let i = 0; i < mixins.length; i++) {
    mergeProps(result, mixins[i], optionsType)
  }

  Object.assign(result, normalizeProps(options[optionsType]))

  return result
}

const formatEmitString = (str: string): string => {
  const [beforeColon, afterColon] = str.split(':')

  if (afterColon) {
    return [upperFirst(beforeColon), camelCase(afterColon)].join(':')
  }

  return upperFirst(camelCase(beforeColon))
}


// TODO: improve typing
// (component: DefineComponent | VueConstructor): ComponentOptions<any> doesn't work here

const withConfigTransport = (component: any): any => {
  const options = getComponentOptions(component as DefineComponent)

  const props = resolveProps(options)

  // TODO: it's too generic to use resolveProps here
  // NOTE: for some reason unit tests work without this feature
  const emits = Object.keys(resolveProps(options, 'emits'))

  const propsOptions: { [key: string]: PropOptions } = { ...props }
  const methods: { [key: string]: (...args: any[]) => any } = { ...options.methods }
  const optionsWithoutDefaults = Object.keys(propsOptions)

  const componentName = upperFirst(camelCase(component.name))

  return {
    name: `WithConfigTransport${componentName || 'Component'}`,
    props: optionsWithoutDefaults,
    emits,
    methods: Object.keys(methods).reduce((acc, name) => ({
      ...acc,
      [name]: function (...args: any[]) {
        return (this as any).$refs.innerRef[name](...args)
      },
    }), {}),
    setup (props: Record<string, any>, context: SetupContext) {
      const configChain = useLocalConfig()

      const { getGlobalConfig } = useGlobalConfig()

      const computedProps = computed(() => {
        const getConfigValue = createConfigValueGetter(getGlobalConfig ? getGlobalConfig().components : {}, configChain, componentName)

        const getValue = (name: string, defaultValue: any) => {
          // We want to fallback to config in 2 cases:
          // * prop value is undefined (allows user to dynamically enter/exit config).
          // * prop value is not defined
          if (!(name in props) || (props[name] === undefined)) {
            return getConfigValue(name, defaultValue)
          }

          // In other cases we return the prop itself.
          return props[name]
        }

        return Object.entries(propsOptions).reduce((computed, [name, definition]) => ({
          ...computed,
          [name]: getValue(name, definition.default),
        }), {})
      })

      const proxiedEmits = emits.reduce((acc, emit) => ({
        ...acc,
        [`on${formatEmitString(emit)}`]: (...args: any[]) => context.emit(emit, ...args),
      }), {})

      return {
        computedProps,
        proxiedEmits,
      }
    },
    render () {
      return h(
        component,
        {
          ...this.computedProps,
          ...this.proxiedEmits,
          ref: 'innerRef',
        },
        { ...this.$slots },
      )
    },
  }
}

export default withConfigTransport
