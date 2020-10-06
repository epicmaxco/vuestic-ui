import { PropOptions } from 'vue'
import { Component, Mixins } from 'vue-property-decorator'
import { ContextPluginMixin } from '../../components/context-test/context-provide/ContextPlugin'
import createContextPropValueGetter from './createContextPropsValueGetter'
import flow from 'lodash/flow'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

const pascalCase = flow(camelCase, upperFirst)

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
export const makeContextablePropsMixin = (componentProps: Record<string, PropOptions>, prefix = 'c_') => {
  const computed: Record<string, any> = {}

  Object.entries(componentProps).forEach(([name, definition]) => {
    computed[`${prefix}${name}`] = function () {
      const componentName = pascalCase(this.$options.name)

      const getContextPropValue = createContextPropValueGetter(this, componentName)

      // We want to fallback to context in 2 cases:
      // * prop value is undefined (allows user to dynamically enter/exit context).
      // * prop value is not defined
      if (!(name in this.$options.propsData) || this.$options.propsData[name] === undefined) {
        return getContextPropValue(name, definition.default)
      }
      // In other cases we return the prop itself.
      return this[name]
    }
  })

  @Component({
    props: componentProps,
    computed,
  })
  class ContextableMixin extends Mixins(ContextPluginMixin) {
    [x: string]: any
  }

  return ContextableMixin
}
