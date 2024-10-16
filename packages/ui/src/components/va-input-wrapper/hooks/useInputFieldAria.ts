import { ExtractPropTypes, Ref, computed } from 'vue'
import { useComponentUuid, useTranslationProp } from '../../../composables'

export const useInputFieldAriaProps = {
  label: { type: String, default: '' },
  inputAriaLabel: useTranslationProp('$t:inputField'),
  inputAriaLabelledby: { type: String },
  inputAriaDescribedby: { type: String },
}

export const useInputFieldAria = (props: ExtractPropTypes<typeof useInputFieldAriaProps>) => {
  const id = useComponentUuid()

  const labelId = `input-label-${id}`
  const characterCountId = `input-character-count-${id}`

  const ariaAttributes = computed(() => ({
    'aria-label': props.label !== '' ? props.label : props.inputAriaLabel,
    'aria-labelledby': props.inputAriaLabelledby ? props.inputAriaLabelledby : labelId,
    'aria-describedby': props.inputAriaDescribedby ? props.inputAriaDescribedby : characterCountId,
  }))

  return {
    labelId,
    characterCountId,
    ariaAttributes,
  }
}
