import { ComputedRef, Ref } from 'vue'

const isComputedRef = <T>(value: Ref<T>): value is ComputedRef<any> & { _setter: (v: T) => void} => {
  return typeof value === 'object' && '_setter' in value
}

// TODO: Maybe it is better to tweak useStateful
/**
 * Do not watches for effect, but looking for computed ref setter triggered.
 * Used to track when component tries to update computed ref.
 *
 * @notice you likely want to watch when value is changed, not setter is called.
 */
export const watchSetter = <T>(ref: Ref<T>, cb: (newValue: T) => void) => {
  if (!isComputedRef(ref)) { return }
  const originalSetter = ref._setter

  ref._setter = (newValue: T) => {
    cb(newValue)
    originalSetter(newValue)
  }
}
