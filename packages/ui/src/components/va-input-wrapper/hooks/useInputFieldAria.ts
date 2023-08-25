import { ExtractPropTypes, Ref, computed } from 'vue'
import { useComponentUuid } from '../../../composables/useComponentUuid'

export const useInputFieldAriaProps = {
  label: { type: String, default: '' },
  ariaLabel: { type: String, default: '$t:inputField' },
  ariaLabelledby: { type: String },
  ariaDescribedby: { type: String },
}

export const useInputFieldAria = (props: ExtractPropTypes<typeof useInputFieldAriaProps>) => {
  const id = useComponentUuid()

  const labelId = `input-label-${id}`
  const characterCountId = `input-character-count-${id}`

  const ariaAttributes = computed(() => ({
    'aria-label': props.label !== '' ? props.label : props.ariaLabel,
    'aria-labelledby': props.ariaLabelledby ? props.ariaLabelledby : labelId,
    'aria-describedby': props.ariaDescribedby ? props.ariaDescribedby : characterCountId,
  }))

  return {
    labelId,
    characterCountId,
    ariaAttributes,
  }
}
