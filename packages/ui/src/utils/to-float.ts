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
  return Number(num.toPrecision(15))
}
