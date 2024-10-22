import { Ref, watch } from 'vue'
import { watchSetter } from '../../../utils/watch-setter'
import { useVModelStateful } from '../../std/internal/useVModelStateful'

export const useDirty = (
  value: Ref<any>,
  props: { dirty: boolean},
  emit: (event: 'update:dirty', ...args: any[]) => void,
) => {
  const isDirty = useVModelStateful(props, 'dirty', emit)

  watchSetter(value, () => {
    isDirty.value = true
  })

  watch(value, (newValue, oldValue) => {
    // Watch only if object keys changed, not the object itself
    if (newValue === oldValue) {
      isDirty.value = true
    }
  }, { deep: true })

  return isDirty
}
