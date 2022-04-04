import { ComponentOptionsBase, PropType, computed, ComputedRef, Prop, DefineComponent } from 'vue'
import { getComponentProps } from './resolve-class-component-props'

/**
 * Accepts parent component props and return value only for child component props.
 *
 * Used to proxy child component props from parent.
 */
export const filterComponentProps = <T extends Record<string, unknown>, K extends Record<keyof T, unknown>>(propsValues: K, childProps: T) => {
  return computed(() => {
    return Object
      .keys(childProps)
      .reduce((acc, propName: keyof T) => {
        acc[propName] = propsValues[propName]
        return acc
      }, {} as { [K in keyof T]: typeof propsValues[K] })
  })
}

// Define component
declare type DefineComponentOptions = ComponentOptionsBase<any, any, any, any, any, any, any, any>

// ExtractOptionProp taken from Vue3 source code
declare type ExtractDefineComponentOptionProp<T> = T extends ComponentOptionsBase<infer P, any, any, any, any, any, any, any> ? unknown extends P ? {} : P : {};
// Remove useless readonly and nullable key here:
// -readonly removes readonly
// -? removes undefined from key, so we can be sure that prop exists and should have type.
declare type ExtractDefineComponentPropsType<T> = {
  -readonly [K in keyof ExtractDefineComponentOptionProp<T>]-?: {
    type: PropType<ExtractDefineComponentOptionProp<T>[K]>,
    required: undefined extends ExtractDefineComponentOptionProp<T>[K] ? false: true,
  }
}

// Class component
declare type ClassComponent = { prototype: { $props: unknown }}

declare type ExtractClassComponentOptionProp<T extends ClassComponent> = T['prototype']['$props']

declare type ExtractClassComponentPropsType<T extends ClassComponent> = {
  -readonly [K in keyof ExtractClassComponentOptionProp<T>]-?: {
    type: PropType<ExtractClassComponentOptionProp<T>[K]>,
    required: undefined extends ExtractClassComponentOptionProp<T>[K] ? false: true,
  }
}

declare type ExtractComponentProps<T extends ClassComponent | DefineComponentOptions> = T extends DefineComponentOptions ? ExtractDefineComponentPropsType<T> :
  T extends ClassComponent ? ExtractClassComponentPropsType<T> : never

/**
 * Works only with defineComponent function.
 * @notion Be aware that `withConfigTransport` you will lose prop types
 */
export function extractComponentProps<T> (component: T, ignoreProps?: string[]): ExtractComponentProps<T> {
  const props: any = getComponentProps(component as any)

  if (ignoreProps) {
    return Object
      .keys(props)
      .reduce<Record<string, unknown>>((acc, propName) => {
        if (ignoreProps.includes(propName)) { return acc }

        if (props[propName] === undefined) { return acc }

        acc[propName] = typeof props[propName] === 'string' ? {} : props[propName]

        return acc
      }, {}) as ExtractComponentProps<T>
  }

  return props
}

declare type ExtractEmitsType<T> = T extends ComponentOptionsBase<any, any, any, any, any, any, any, infer E> ? E: []

export function extractComponentEmits<T> (component: T): ExtractEmitsType<T> {
  return [...new Set((component as any).emits)] as any
}
