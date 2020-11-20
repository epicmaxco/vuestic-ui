import { Component as VueComponent, ComponentOptions } from 'vue'
import { h, computed, PropOptions } from '@vue/composition-api'
import { useLocalConfig } from '../../mixins/LocalConfigMixin'
import { useGlobalConfig, GlobalConfig } from '../GlobalConfigPlugin'
import { getLocalConfigWithComponentProp } from './createConfigValueGetter'

export type Props = {
  [key: string]: PropOptions;
}

/**
 * name that signifies config should be applied to all components
 */
const ALL_COMPONENTS = 'all'

const createConfigValueGetter = (
  globalConfig: GlobalConfig,
  configChain: GlobalConfig[],
  componentName = '',
) => (
  prop: string,
  defaultValue: any,
) => {
  // We have to pass context here as this method will be mainly used in prop default,
  // and methods are not accessible there.
  const configs = globalConfig ? [globalConfig, ...configChain] : configChain

  const componentConfig = getLocalConfigWithComponentProp(configs, componentName, prop)
  if (componentConfig) {
    return componentConfig[componentName][prop]
  }

  const allConfig = getLocalConfigWithComponentProp(configs, ALL_COMPONENTS, prop)
  if (allConfig) {
    return allConfig[ALL_COMPONENTS][prop]
  }

  return typeof defaultValue === 'function' ? defaultValue() : defaultValue
}

function getOptionsFromComponent (type: string, component: any) {
  switch (true) {
    case Boolean(component[type]):
      return component[type]
    case Boolean(component.options):
      return component.options[type] || {}
    default:
      return {}
  }
}

const withConfigTransport = (component: VueComponent): ComponentOptions<any> => {
  const options: { [key: string]: PropOptions } = getOptionsFromComponent('props', component)
  const methods: { [key: string]: (...args: any[]) => any } = getOptionsFromComponent('methods', component)
  const optionsWithoutDefaults = Object.keys(options)

  return {
    name: `WithConfigTransport${component.name || 'Component'}`,
    props: optionsWithoutDefaults,
    methods: Object.keys(methods).reduce((acc, name) => ({
      ...acc,
      [name]: function () {
        return (this as any).$refs.innerRef[name]()
      },
    }), {}),
    setup (props, context) {
      const configChain = useLocalConfig()

      const { getGlobalConfig } = useGlobalConfig()

      const computedProps = computed(() => {
        const getConfigValue = createConfigValueGetter(getGlobalConfig ? getGlobalConfig() : {}, configChain, component.name)

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

        return Object.entries(options).reduce((computed, [name, definition]) => ({
          ...computed,
          [name]: getValue(name, definition.default),
        }), {})
      })

      const slots = Object.entries(context.slots)

      return () => h(
        component,
        {
          ref: 'innerRef',
          props: computedProps.value,
          on: context.listeners,
          scopedSlots: context.slots,
        },
        slots.map(([name, slot]) => h(
          'template',
          { slot: name },
          slot(),
        )))
    },
  }
}

export default withConfigTransport
