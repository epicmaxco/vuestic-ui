import { ComponentOptionsBase, PropType, computed, ComputedRef, Prop } from 'vue'
import { getComponentProps } from './resolve-class-component-props'

/**
 * Accepts parent component props and return value only for child component props.
 *
 * Used to proxy child component props from parent.
 */
export const filterComponentProps = (propsValues: Record<string, any>, childProps: Record<string, any> | string[]): ComputedRef<Record<keyof typeof childProps, any>> => {
  return computed(() => {
    if (Array.isArray(childProps)) {
      return childProps
        .map((propName) => propsValues[propName])
    } else {
      return Object
        .keys(childProps)
        .reduce<Record<string, unknown>>((acc, propName) => {
          acc[propName] = propsValues[propName]
          return acc
        }, {})
    }
  },
  )
}

// ExtractOptionProp taken from Vue3 source code
declare type ExtractOptionProp<T> = T extends ComponentOptionsBase<infer P, any, any, any, any, any, any, any> ? unknown extends P ? {} : P : {};
// Remove useless readonly and nullable key here:
// -readonly removes readonly
// -? removes undefined from key, so we can be sure that prop exists and should have type.
declare type ExtractPropsType<T> = {
  -readonly [K in keyof ExtractOptionProp<T>]-?: {
    type: PropType<ExtractOptionProp<T>[K]>,
    required: undefined extends ExtractOptionProp<T>[K] ? false: true,
  }
}

/**
 * Works only with defineComponent function.
 * @notion Be aware that `withConfigTransport` you will lose prop types
 */
export function extractComponentProps<T> (component: T, ignoreProps?: string[]): ExtractPropsType<T> {
  const props: any = getComponentProps(component as any)

  if (ignoreProps) {
    return Object
      .keys(props)
      .reduce<Record<string, unknown>>((acc, propName) => {
        if (ignoreProps.includes(propName)) { return acc }

        if (props[propName] === undefined) { return acc }

        acc[propName] = typeof props[propName] === 'string' ? {} : props[propName]

        return acc
      }, {}) as ExtractPropsType<T>
  }

  return props
}

declare type ExtractEmitsType<T> = T extends ComponentOptionsBase<any, any, any, any, any, any, any, infer E> ? E: []

export function extractComponentEmits<T> (component: T): ExtractEmitsType<T> {
  return (component as any).emits
}
