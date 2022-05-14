import { getCurrentInstance } from 'vue'
import { TypedComposableContext, PropOptions, TypedComposable } from './types'
import { __DEV__ } from '../../utils/global-utils'

type ExtractArguments<First, T extends (context: First) => any> = T extends (context: First, ...args: infer P) => any ? P : never

/**
 * This function allows you to create composable and define it required props and emits.
 *
 * @example
 * ```ts
 * const useTextColor = defineComposable(({ props, emit }, background: string) => {
 *    emit('initBg', background)
 *
 *    return computed(() => props.textColor ? getColor(props.textColor) : getTextColor(background))
 * }, { props: { textColor: String }, emits: ['initBg'] })
 *
 * export default defineComponent({
 *   props: {
 *      ...useTextColor.$props,
 *   },
 *   emit: [...useTextColor.$emits],
 *   setup() {
 *     return { ...useTextColor() }
 *   }
 * })
 * ```
 */
export const defineComposable = <
  Props extends PropOptions | undefined = undefined,
  Emits extends string | undefined = undefined,
  Context = TypedComposableContext<Props, Emits>,
  Composable extends (context: Context, ...args: any[]) => any = (context: Context, ...args: any[]) => any,
  ARGS extends unknown[] = ExtractArguments<Context, Composable>,
  R = TypedComposable<(...args: ARGS) => ReturnType<Composable>, Props, Emits>
>(
    composable: Composable,
    options?: {
      props?: Props,
      emits?: Emits[],
    },
  ) => {
  const wrapper = (...args: ARGS) => {
    const context = getCurrentInstance()!

    if (__DEV__) {
      const emits = options?.emits?.every((emit) => context.type.emits.includes(emit))
      const contextPropNames = Object.keys(context.props)
      const props = Object.keys(options?.props || {})?.every((prop) => contextPropNames.includes(prop))

      if (!props) {
        throw new Error('Component missing props from composable')
      }

      if (!emits) {
        throw new Error('Component missing emits from composable')
      }
    }

    return composable(context as unknown as Context, ...args)
  }

  if (options?.props) {
    wrapper.$props = options?.props
  }

  if (options?.emits) {
    wrapper.$emits = options?.emits
  }

  return wrapper as any as R
}
