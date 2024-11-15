import { effectScope, onScopeDispose, getCurrentScope, EffectScope } from 'vue'

/** Used to store state once per app */
export const makeSharedComposable = <T extends (...args: any[]) => any>(composable: T): T => {
  let subscribers = 0
  let state: ReturnType<T> | null = null
  let scope: EffectScope | null = null

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      state = scope = null
    }
  }

  return <T>((...args: any[]) => {
    subscribers++

    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }

    if (getCurrentScope()) {
      onScopeDispose(dispose)
    }

    return state
  })
}
