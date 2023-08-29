import { ExtractPropTypes, PropType, Ref, computed } from 'vue'
import { useComponentUuid } from '../../../composables/useComponentUuid'

const ariaProps = {
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  limit: { type: Number, default: 1 },
  color: { type: String },
  hasError: { type: Boolean, default: false },
}

export const useMessageListAria = (props: ExtractPropTypes<typeof ariaProps>) => {
  const id = useComponentUuid()

  const messageListId = `message-list-${id}`

  const messageListAttributes = computed(() => ({
    id: messageListId,
    role: 'alert',
  }))

  const doHaveMessages = computed(() => {
    if (typeof props.modelValue === 'string' && props.modelValue.length > 0) {
      return true
    }

    if (Array.isArray(props.modelValue) && props.modelValue.length > 0) {
      return true
    }

    return false
  })

  const childAttributes = computed(() => ({
    'aria-describedby': doHaveMessages.value ? messageListId : undefined,
    'aria-invalid': props.hasError,
  }))

  return {
    messageListAttributes,
    childAttributes,
  }
}
