import { effectScope, getCurrentScope, Ref, watch } from 'vue'

export const useReactiveCondition = <T>(enabled: Ref<boolean>, composable: () => T) => {
  // save current setup context

  const effect = effectScope()

  let run = false

  watch(enabled, () => {
    if (enabled.value) {
      if (run) {
        effect?.resume()
        return
      }
      effect?.run(() => {
        run = true
        composable()
      })
    } else {
      effect?.pause()
    }
  })
}
