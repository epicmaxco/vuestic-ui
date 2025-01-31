import { Ref } from 'vue'
import { warn } from './console'

// TODO: Maybe it is better to tweak useStateful
/**
 * Do not watches for effect, but looking for computed ref setter triggered.
 * Used to track when component tries to update computed ref.
 *
 * @notice you likely want to watch when value is changed, not setter is called.
 */
export const watchSetter = <T>(ref: Ref<T>, cb: (newValue: T) => void) => {
  let key: 'setter' | '_setter'

  if ('_setter' in ref) {
    key = '_setter' as const
  } else if ('setter' in ref) {
    key = 'setter' as const
  } else {
    warn('watchSetter', 'Ref does not have setter', ref)
    return
  }

  const originalSetter = (ref as any)[key]

  ;(ref as any)[key] = (newValue: T) => {
    cb(newValue)
    originalSetter(newValue)
  }
}
