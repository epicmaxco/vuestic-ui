type VuesticThresholdsList = Record<string, number>

/**
 * @param thresholds tailwind css screens settings
 * @returns vuestic ui thresholds settings
 */
export const convertThresholds = (thresholds: Record<string, string>): VuesticThresholdsList => {
  return Object.fromEntries(
    Object.entries(thresholds)
      .map(([key, value]) => {
        const vuesticValue = Number(value.substring(0, value.length - 2))
        return [key, vuesticValue]
      }),
  )
}

/**
 * @param tailwindConfig users or default tailwind config
 * @returns vuestic breakpoint config
 */
export const proceedBreakpoint = (tailwindConfig?: Record<string, any>): VuesticThresholdsList => {
  let tailwindThresholds

  if (tailwindConfig) {
    const tailwindThresholdsConfig = tailwindConfig.theme?.screens || tailwindConfig.theme?.extend?.screens
    if (tailwindThresholdsConfig) { tailwindThresholds = convertThresholds(tailwindThresholdsConfig) }
  }

  const isTailwindScreensConfigOverwritten = !!Object.keys(tailwindConfig?.theme?.screens || {}).length
  const defaultTailwindConfig = require('tailwindcss/defaultTheme')
  const tailwindDefaultScreensConverted = convertThresholds(defaultTailwindConfig.screens)

  if (!tailwindThresholds) {
    tailwindThresholds = tailwindDefaultScreensConverted
  } else if (tailwindThresholds && !isTailwindScreensConfigOverwritten) {
    tailwindThresholds = { ...tailwindDefaultScreensConverted, ...tailwindThresholds }
  }

  return tailwindThresholds
}
