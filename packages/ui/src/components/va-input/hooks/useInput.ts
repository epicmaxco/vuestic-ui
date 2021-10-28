import { useValidation } from 'src/composables/useValidation'
import { useColors } from '../../../composables/useColor'
import { computed } from 'vue'

export const useInput = (props: any, emit: any) => {
  const { getColor } = useColors()

  const {
    isFocused,
    listeners: validationListeners,
    computedError,
    computedErrorMessages,
  } = useValidation(props, emit, () => {
    console.log('a')
  })

  const canBeCleared = computed(() => {
    return props.clearable && ![null, undefined, ''].includes(props.modelValue as any)
  })

  const showIcon = computed(() => {
    return props.success || computedError.value || canBeCleared.value || props.loading
  })

  const computedBorderColorStyle = computed(() => ({
    borderColor: isFocused.value ? props.color : '',
  }))

  const labelStyle = computed(() => ({
    color: getColor(props.color),
  }))
}
