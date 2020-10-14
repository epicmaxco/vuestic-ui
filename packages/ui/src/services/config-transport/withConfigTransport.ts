import { Component as VueComponent } from 'vue/types/options'
import { CreateElement, PropOptions, VNode } from 'vue'
import { Component, Mixins } from 'vue-property-decorator'
import LocalConfigMixin from '../../mixins/LocalConfigMixin'
import createConfigValueGetter from './createConfigValueGetter'

const withConfigTransport = (component: VueComponent): VueComponent => {
  const props: Record<string, PropOptions> = (component as any).options.props

  @Component({
    name: `WithConfigTransport${component.name || 'Component'}`,
    props,
  })
  class WithConfigTransport extends Mixins(LocalConfigMixin) {
    get computedProps () {
      const { propsData } = this.$options
      const getConfigValue = createConfigValueGetter(this, component.name)

      const getValue = (name: string, definition: PropOptions) => {
        // We want to fallback to config in 2 cases:
        // * prop value is undefined (allows user to dynamically enter/exit config).
        // * prop value is not defined
        if (propsData && (!(name in propsData) || (propsData as any)[name] === undefined)) {
          return getConfigValue(name, definition.default)
        }
        // In other cases we return the prop itself.
        return (this as any)[name]
      }

      return Object.entries(props).reduce((computed, [name, definition]) => ({
        ...computed,
        [name]: getValue(name, definition),
      }), {})
    }

    render (createElement: CreateElement): VNode {
      return createElement(component, {
        props: this.computedProps,
      })
    }
  }

  return WithConfigTransport
}

export default withConfigTransport
