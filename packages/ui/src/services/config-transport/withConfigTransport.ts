import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import {
  DefineComponent,
  ComponentOptions,
  h,
  computed,
  SetupContext,
} from 'vue'
import { Props } from '../component-config/component-config'

import { useLocalConfig } from '../../components/va-config/VaConfig'
import { useGlobalConfig } from '../global-config/global-config'

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
      return props.reduce((acc: Record<string, unknown>, prop: string) => ({
        ...acc,
        [prop]: null,
      }), {})
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

  const propsOptions: Props = { ...props }
  const methods: { [key: string]: (...args: any[]) => any } = { ...options.methods }
  const optionsWithoutDefaults = Object.keys(propsOptions)

  const vueClassComponent = component.__vccOpts
  const componentName = upperFirst(camelCase(vueClassComponent ? vueClassComponent.name : component.name))

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
    setup (props: Props, context: SetupContext) {
      const localConfig = useLocalConfig()
      const { getGlobalConfig } = useGlobalConfig()

      const computedProps = computed(() => {
        const propsFromGlobalConfig: Props = { ...getGlobalConfig().componentsAll, ...getGlobalConfig().components?.[componentName] }
        const propsFromLocalConfig: Props = localConfig.value
          .reduce((finalConfig, config) =>
            config[componentName] ? { ...finalConfig, ...config[componentName] } : finalConfig
          , {})
        const propsFromConfigs: Props = { ...propsFromGlobalConfig, ...propsFromLocalConfig }

        const getPropValue = (name: string, defaultValue: any) => {
          if (props[name] !== undefined) { return props[name] }
          if (propsFromConfigs[name] !== undefined) { return propsFromConfigs[name] }

          return typeof defaultValue === 'function' ? defaultValue() : defaultValue
        }

        return Object.entries(propsOptions).reduce((finalProps: Props, [name, definition]) => {
          finalProps[name] = getPropValue(name, definition.default)

          return finalProps
        }, {})
      })

      const proxiedEmits = emits.reduce((acc, emit) => ({
        ...acc,
        [`on${formatEmitString(emit)}`]: (...args: any[]) => context.emit(emit, ...args),
      }), {})

      return () => h(
        component,
        {
          ...computedProps.value,
          ...proxiedEmits,
          ref: 'innerRef',
        },
        context.slots,
      )
    },
  }
}

export default withConfigTransport
