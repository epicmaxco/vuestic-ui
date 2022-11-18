import { computed, ExtractPropTypes, getCurrentInstance } from 'vue'

/**
 * Filter current component props to much `childProps` param
 *
 * Used to proxy child component props from parent.
 *
 * @param childProps - child component props declaration
 */
export const filterComponentProps = <
  ChildProps extends Record<string, unknown>,
>(childProps: ChildProps) => {
  const { props } = getCurrentInstance()!

  return computed(() => {
    return Object
      .keys(childProps)
      .reduce((acc, propName: string) => {
        (acc as any)[propName] = props[propName]
        return acc
      }, {} as ExtractPropTypes<ChildProps>)
  })
}
