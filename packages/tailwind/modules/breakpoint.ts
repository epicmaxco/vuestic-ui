type VuesticThresholdsList = Record<string, number>
type TailwindScreensConfig = Record<string, string>

/**
 * @param thresholds tailwind css screens settings
 * @returns vuestic ui thresholds settings
 */
export const convertThresholds = (thresholds: TailwindScreensConfig): VuesticThresholdsList => {
  return Object.entries(thresholds)
    .reduce((acc, [key, value]) => {
      const vuesticThreshold = Number(value.substring(0, value.length - 2))

      isNaN(vuesticThreshold) && console.warn(`${value} isn't correct Tailwind CSS screen!`)
      if (!isNaN(vuesticThreshold)) {
        acc[key] = vuesticThreshold
      }

      return acc
    }, {} as VuesticThresholdsList)
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
