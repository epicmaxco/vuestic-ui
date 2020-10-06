import { Component as VueComponent } from 'vue/types/options'
import { CreateElement, PropOptions, VNode } from 'vue'
import { Component, Mixins } from 'vue-property-decorator'
import ContextMixin from '../../mixins/ContextMixin'
import createContextPropValueGetter from './createContextPropsValueGetter'

const withContextProps = (component: VueComponent): VueComponent => {
  const props: Record<string, PropOptions> = (component as any).options.props

  @Component({
    name: `WithContextProps${component.name || 'Component'}`,
    props,
  })
  class WithContextProps extends Mixins(ContextMixin) {
    get computedProps () {
      const { propsData } = this.$options
      const getContextPropValue = createContextPropValueGetter(this, component.name)

      const getValue = (name: string, definition: PropOptions) => {
        // We want to fallback to context in 2 cases:
        // * prop value is undefined (allows user to dynamically enter/exit context).
        // * prop value is not defined
        if (propsData && (!(name in propsData) || (propsData as any)[name] === undefined)) {
          return getContextPropValue(name, definition.default)
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

  return WithContextProps
}

export default withContextProps
