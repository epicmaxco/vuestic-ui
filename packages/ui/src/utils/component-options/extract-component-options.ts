import type { ExtractComponentEmits, ExtractComponentProps, DefineComponentOptions } from './types'
import { getComponentProps } from './resolve-component-props'

/**
 * Returns component props options.
 *
 *
 * @param ignoreProps - deprecated - prefer using lodash omit instead
 *
 * @returns object that looks like this:
 * ```ts
 * {
 *   modelValue: { type: String, required: true },
 *   options: { type: Array, default: [] },
 *   size: { type: String as PropType<'small' | 'medium' | 'large'>, default: 'medium' }
 * }
 * ```
 */
export function extractComponentProps<T, IgnoreProps extends string = ''> (component: T, ignoreProps?: IgnoreProps[]): Omit<ExtractComponentProps<T>, IgnoreProps> {
  const props: any = getComponentProps(component as any)

  // TODO: Not sure if it is a good idea to handle ignore props here
  // Looks like it is not type safe. Need a separated filter object function
  if (ignoreProps) {
    return Object
      .keys(props)
      .reduce<any>((acc, propName) => {
        if (ignoreProps.includes(propName as unknown as IgnoreProps)) { return acc }

        if (props[propName] === undefined) { return acc }

        acc[propName] = typeof props[propName] === 'string' ? {} : props[propName]

        return acc
      }, {})
  }

  return props
}

/** Returns component emits option */
export function extractComponentEmits<T> (component: T): ExtractComponentEmits<T> {
  return [...new Set((component as any).emits)] as any
}
