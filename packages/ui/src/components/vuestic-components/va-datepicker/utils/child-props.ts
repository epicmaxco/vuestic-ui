import { ComponentOptionsBase, PropType, computed, ComputedRef } from 'vue'

/**
 * Accepts parent component props and return value only for child component props.
 *
 * Used to proxy child component props from parent.
 */
export const filterComponentProps = (propsValues: Record<string, any>, childProps: Record<string, any>): ComputedRef<Record<keyof typeof childProps, any>> => {
  return computed(() => Object
    .keys(childProps)
    .reduce((acc, propName) => ({ ...acc, [propName]: propsValues[propName] }), {}),
  )
}

export type Props<T> = { [K in keyof T]: { type: PropType<T[K]> } }

/* Works only with defineComponent function */
export function extractComponentProps<T extends ComponentOptionsBase<any, any, any, any, any, any, any, any, any>> (component: T): Props<Parameters<NonNullable<T['setup']>>[0]> {
  return (component as any).props
}
