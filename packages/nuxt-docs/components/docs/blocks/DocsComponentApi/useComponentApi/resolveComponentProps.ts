import { ComponentOptionsWithProps, ObjectProp } from "./types";
import { isArray, isObject, isFunction } from '@vue/shared'
import { ComponentOptions } from "nuxt3/dist/app/compat/capi";

function getPropDefault(prop: any, propTypes: string[]) {
  if (propTypes.includes('Function')) { return prop.default }

  return isFunction(prop.default) ? prop.default() : prop.default
}

const propsToObjectProps = (props: any): Record<string, ObjectProp> => {
  if (isArray(props)) {
    return props
      .reduce((acc: Record<string, ObjectProp>, prop: string) => ({ ...acc, [prop]: {
        type: [undefined],
        default: undefined,
        required: false
      } }), {})
  }

  if (isObject(props)) {
    return Object.keys(props)
      .reduce((acc: Record<string, ObjectProp>, propName: string) => {
        const prop = props[propName]

        if (!isObject(prop)) { 
          acc[propName] = {
            type: [prop], default: undefined, required: false
          }
        } else {
          const type = isArray(prop.type) ? prop.type : [prop.type]
          
          acc[propName] = {
            type,
            default: getPropDefault(prop, type),
            required: Boolean(prop.required)
          }          
        }

        return acc
      }, {})
  }
  
  return {}
}

const getProps = (options: ComponentOptions): Record<string, ObjectProp> => {
  const { mixins, extends: extendOptions } = options

  const props = options.props ? propsToObjectProps(options.props) : {}

  const extendProps = extendOptions && getProps(extendOptions)
  const mixinProps = mixins && mixins.reduce((acc, m) => ({ ...acc, ...getProps(m)}), {})

  return { ...props, ...extendProps, ...mixinProps }
}

export const resolveComponentProps = (options: ComponentOptions) => {
  const props = getProps(options)

  return props
}