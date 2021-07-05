import { ComponentOptionsBase, ExtractPropTypes, PropType, computed, ComputedRef, Prop } from 'vue'

/**
 * Accepts parent component props and return value only for child component props.
 *
 * Used to proxy child component props from parent.
 */
export const filterComponentProps = (propsValues: Record<string, any>, childProps: Record<string, any>): ComputedRef<Record<keyof typeof childProps, any>> => {
  return computed(() => Object
    .keys(childProps)
    .reduce((acc, propName) => {
      return { ...acc, [propName]: propsValues[propName] }
    }, {}),
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

/* Works only with defineComponent function */
export function extractComponentProps<T> (component: T, ignoreProps?: string[]): ExtractPropsType<T> {
  const props = (component as any).props

  if (ignoreProps) {
    return Object
      .keys((component as any).props)
      .reduce((acc, propName) => {
        if (ignoreProps.includes(propName)) { return acc }

        if (props[propName] === undefined) { return acc }

        return { ...acc, [propName]: props[propName] }
      }, {}) as ExtractPropsType<T>
  }

  return props
}
