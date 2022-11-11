import { watch } from 'vue'

import { warn } from '../../../utils/console'

interface useCounterPropsValidationProps {
  modelValue: string | number,
  min: number | undefined,
  max: number | undefined,
  step: number,
}

export default function useCounterPropsValidation (props: useCounterPropsValidationProps) {
  const validateCounterProps = () => {
    const val = Number(props.modelValue)

    if (Number.isNaN(val)) {
      warn('The value is not a number or cannot be reduced to a number.')
      return
    }

    if (props.min && props.max && props.min > props.max) {
      warn(`The maximum value (${props.max}) can not be less than the minimum value (${props.min}).`)
    }

    if (props.min && val < props.min) {
      warn(`The value of the counter (${val}) can not be less than the minimum value (${props.min}).`)
    }

    if (props.max && val > props.max) {
      warn(`The value of the counter (${val}) can not be greater than the maximum value (${props.max}).`)
    }

    if (props.min && props.max && props.step > (props.max - props.min)) {
      warn(`The value of the step (${props.step}) can not be greater than the difference (${props.max - props.min}) between maximum value (${props.max}) and minimum value (${props.min}).`)
    }
  }

  watch(
    [
      () => props.step,
      () => props.min,
      () => props.max,
    ],
    validateCounterProps,
    { immediate: true },
  )
}
