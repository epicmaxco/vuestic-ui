import { getCurrentInstance } from 'vue'
import { TypedComposable, TypedComposableThis, PropOptions } from './types'

const composableThis: TypedComposableThis<unknown, unknown> = {
  // Current instance must be available in setup function
  get props () { return getCurrentInstance()!.props },
  get emit () { return getCurrentInstance()!.emit },
}

/** This function allows you to create composable and define it required props and emits */
export const defineComposable = <
  ENames extends string,
  Props extends PropOptions | undefined = undefined,
  Emits extends ENames[] | undefined = undefined,
  Composable extends (this: TypedComposableThis<Props, Emits>, ...args: any[]) => any = (this: TypedComposableThis<Props, Emits>, ...args: any[]) => any,
>(options: {
    composable: Composable,
    props?: Props,
    emits?: Emits,
}) => {
  const s = options.composable as any

  s.$props = options?.props
  s.$emits = options?.emits

  return s.bind(composableThis) as TypedComposable<Composable, Props, Emits>
}
