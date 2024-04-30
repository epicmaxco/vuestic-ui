/**
 * Prevent floating numbers like 0.30000000000000004
 *
 * @example
 *
 * 0.1 + 0.2 // 0.30000000000000004
 *
 * safeFloat(0.1 + 0.2) // 0.3
 */
export const toFloat = (num: number) => {
  return Number(num.toPrecision(13))
}

/**
 * Check if the number is divisible by the step.
 * Consider the floating point error.
 */
export const isDividable = (num: number, step: number) => {
  const result = toFloat(num % step)

  return result === 0 || result === step
}
