import { warn } from '../../utils/console'

export const validateSlider = (value: number | number[], step: number, min: number, max: number, range: boolean) => {
  if (Array.isArray(value)) {
    forceMinMaxOrder(value)
    if (!range) {
      warn(
        `The type "array" of prop "model-value" does not match prop "range = ${range}".`,
      )
    }
  }

  if (range) {
    warn(
      `The type "${typeof value}" of prop "model-value" does not match prop "range = ${range}".`,
    )
  }

  if (max < min) {
    warn(`The maximum value (${max}) can not be less than the minimum value (${min}).`)
  }

  if ((max - min) % step !== 0) {
    warn(`Step ${step} is illegal. Slider is non-divisible (Min:Max-${min}:${max}).`)
  }

  const inRange = (v: number) => {
    if (v < min) {
      warn(`The value of the slider is ${v}, the minimum value is ${min}, the value of this slider can not be less than the minimum value`)
    } else if (v > max) {
      warn(`The value of the slider is ${v}, the maximum value is ${max}, the value of this slider can not be greater than the maximum value`)
    }
  }

  if (Array.isArray(value)) {
    value.map(inRange)
  } else {
    inRange(value)
  }

  return true
}

/** mutate value if provided range min value is grater than max. i.e. [70, 30] -> [30,70] */
function forceMinMaxOrder (value: number[]) {
  const [min, max] = value
  if (min > max) {
    value.sort()
  }
}
