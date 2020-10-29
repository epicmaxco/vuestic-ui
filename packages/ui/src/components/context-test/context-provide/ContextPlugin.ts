import { App } from 'vue';
import flow from 'lodash/flow'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { Options, mixins, Vue, VueMixin, VueConstructor, MixedVueBase, VueBase } from 'vue-class-component'

import { hasOwnProperty } from '../../../services/utils'
import { reactive } from 'vue'
import { Inject } from 'vue-property-decorator';
// declare module 'vue/types/vue' {
//   interface Vue {
//     $vaContextConfig?: ContextConfig;
//   }
// }

const pascalCase = flow(camelCase, upperFirst)
/**
 * name that signifies config should be applied to all components
 */
const ALL_COMPONENTS = 'all'

/**
 * Key for communication inject/provide
 */
export const ContextProviderKey = 'va-context-provider'

/**
 * Plugin provide global config to Vue component through prototype
 */
export const ContextPlugin = {
  install(app: App, options: ContextConfig = {}) {
    app.config.globalProperties.$vaContextConfig = reactive(options)
  },
}

/**
 * Mixin provide local configs to Vue component through injecting
 * All list of local configs contain in this._$configs
 */

export class ContextPluginMixin extends Vue {
  @Inject({
    from: ContextProviderKey,
    default: () => [],
  }) readonly _$configs!: ContextConfig[]
}

/**
 * Attempt to find a prop value from config chain.
 *
 * @category String
 * @param configs [object] config chain.
 * @param componentName [string]
 * @param propName [string] property name (pascal-case)
 *
 * @returns {any} config object if found undefined means not found.
 */
export const getLocalConfigWithComponentProp = (configs: any[], componentName: string, propName: any) => {
  // Find prop value in config chain.
  return configs.reverse().find(config => {
    const componentConfig = config[componentName]
    return componentConfig && hasOwnProperty(componentConfig, propName)
  })
}

/**
 * Calc value of property from component, local and global config
 *
 * @category String
 * @param context [object] this of the vue component.
 * @param prop [string=''] The string of property name.
 * @param defaultValue [any] The default property value.
 * This value takes when each local or global config and component do not contain property.
 * @returns {any} Returns property value.
 * @deprecated
 */
export const getContextPropValue = (
  context: Record<string, any> & ContextPluginMixin,
  prop: string,
  defaultValue: () => any,
) => {
  // We have to pass context here as this method will be mainly used in prop default,
  // and methods are not accessible there.

  // Local prop takes priority even when empty.
  // if (hasOwnProperty(context, prop)) {
  //   return context[prop]
  // }

  const componentName = pascalCase(context.$options.name)

  if (!context._$configs) {
    throw new Error(`'getContextPropValue' working only together with 'ContextPluginMixin'. Please, use 'ContextPluginMixin' for ${componentName} component`)
  }

  const configs = context.$vaContextConfig ? [context.$vaContextConfig, ...context._$configs] : context._$configs

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

// Allows to completely overwrite global context config.
export const overrideContextConfig = (
  context: { $vaContextConfig: object },
  options: { [x: string]: any },
) => {
  context.$vaContextConfig = reactive(options)
  // for (const key in { ...options, ...context.$vaContextConfig }) {
  //   if (!(key in options)) {
  //     Vue.delete(context.$vaContextConfig, key)
  //     continue
  //   }
  //   Vue.set(context.$vaContextConfig, key, options[key])
  // }
}

/**
 * Get prop value provided in the parent component
 *
 * @param key - [string] the prop name.
 * @param context - [object] this of the vue component.
 * @returns {any} Returns property value.
 */
export function getOriginalPropValue(
  key: string,
  context: {
    $options: {
      propsData: Record<string, any>;
    };
  },
) {
  if (!(key in context.$options.propsData)) {
    return undefined
  }

  return context.$options.propsData[key]
}

export type ContextConfig = Record<string, Record<string, any>>

// Just 2 levels deep merge. B has priority.
export const mergeConfigs = (
  configA: ContextConfig,
  configB: ContextConfig,
) => {
  const result: Record<string, any> = {}
  // A or A + B
  for (const key in configA) {
    result[key] = { ...configA[key], ...configB[key] }
  }
  // B
  for (const key in configB) {
    if (!result[key]) {
      result[key] = { ...configB[key] }
    }
  }
  return result
}

/**
 * Instead of getting component props from one config, we're getting props and computed.
 * So, for name "color" it will be:
 * * prop `color` - just standard prop
 * * computed `c_color` - computed (context-bound prop)
 *
 * @param componentProps Object - vue component object props
 *```
 * {
 *    prop1: { type: Boolean, default: false },
 *    prop2: { type: String, default: '' }
 *
 * }
 * ```
 * @param prefix - that prefix goes to contexted prop (that's intended for userland usage)
 * @returns object - vue mixin with props and computed
 */
export const makeContextablePropsMixin = (componentProps: any, prefix = 'c_') => {
  const computed: any = {}

  Object.entries(componentProps).forEach(([name, definition]) => {
    
    computed[`${prefix}${name}`] = function () {
      
      // We want to fallback to context in 2 cases:
      // * prop value is undefined (allows user to dynamically enter/exit context).
      // * prop value is not defined
      
      if (typeof (definition as any).default === "function") {
        if ((definition as any).default() === this.$props[name]) {
          return getContextPropValue(this, name, (definition as any).default)
        }
      } else if ((definition as any).default === this.$props[name]) {
        return getContextPropValue(this, name, (definition as any).default)
      } else {
        return this[name]
      }

      // if (!(name in this.$options.propsData) || this.$options.propsData[name] === undefined) {
      // if (!hasOwnProperty(this.$props, name) || this.$props[name] === undefined) {
      //   return getContextPropValue(this, name, (definition as any).default)
      // }
      // // In other cases we return the prop itself.
      // return this[name]
    }
  })

  @Options({
    computed: computed,
    props: componentProps
  })
  class ContextableMixin extends mixins(ContextPluginMixin) {
    [x: string]: any
  }

  return ContextableMixin

}
