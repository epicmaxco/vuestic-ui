import { effectScope, onScopeDispose, EffectScope } from 'vue'

export const useSharedComposable = <T extends (...args: any[]) => any>(composable: T): T => {
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

    onScopeDispose(dispose)

    return state
  })
}
