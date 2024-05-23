import { watch } from 'vue'

import { warn } from '../../../utils/console'

interface useCounterPropsValidationProps {
  modelValue: string | number,
  min?: number | string | undefined,
  max?: number | string | undefined,
  step: number | string,
}

export default function useCounterPropsValidation (props: useCounterPropsValidationProps) {
  const validateCounterProps = () => {
    const val = Number(props.modelValue)
    const max = Number(props.max)
    const min = Number(props.min)
    const step = Number(props.step)

    if (Number.isNaN(val)) {
      warn('The value is not a number or cannot be reduced to a number.')
      return
    }

    if (min && max && min > max) {
      warn(`The maximum value (${max}) can not be less than the minimum value (${min}).`)
    }

    if (min && val < min) {
      warn(`The value of the counter (${val}) can not be less than the minimum value (${min}).`)
    }

    if (max && val > max) {
      warn(`The value of the counter (${val}) can not be greater than the maximum value (${max}).`)
    }

    if (min && max && step > (max - min)) {
      warn(`The value of the step (${step}) can not be greater than the difference (${max - min}) between maximum value (${max}) and minimum value (${min}).`)
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
