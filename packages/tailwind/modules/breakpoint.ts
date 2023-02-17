import { thresholdsPreset } from 'vuestic-ui'

type VuesticThresholdsList = Record<string, number>
type TailwindScreensConfig = Record<string, string>

/**
 * @param thresholds tailwind css screens settings
 * @returns vuestic ui thresholds settings
 */
const convertTailwindThresholds = (thresholds: TailwindScreensConfig): VuesticThresholdsList => {
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
 * @param tailwindConfig users or default tailwind css config
 * @returns vuestic ui breakpoint config
 */
export const tailwindThresholdsSync = (tailwindConfig?: Record<string, any>): VuesticThresholdsList => {
  let tailwindThresholds

  if (tailwindConfig) {
    const tailwindThresholdsConfig = tailwindConfig.theme?.screens || tailwindConfig.theme?.extend?.screens
    if (tailwindThresholdsConfig) { tailwindThresholds = convertTailwindThresholds(tailwindThresholdsConfig) }
  }

  const isTailwindScreensConfigOverwritten = !!Object.keys(tailwindConfig?.theme?.screens || {}).length
  const defaultTailwindConfig = require('tailwindcss/defaultTheme')
  const tailwindDefaultScreensConverted = convertTailwindThresholds(defaultTailwindConfig.screens)

  if (!tailwindThresholds) {
    tailwindThresholds = tailwindDefaultScreensConverted
  } else if (tailwindThresholds && !isTailwindScreensConfigOverwritten) {
    tailwindThresholds = { ...tailwindDefaultScreensConverted, ...tailwindThresholds }
  }

  return tailwindThresholds
}

/**
 * @returns tailwind ui thresholds settings
 */
export const convertVuesticThresholds = (current: Record<string, any>): TailwindScreensConfig => {
  const currentThresholdsConfig = { ...(current.theme.extend.screens || {}) }

  if (!thresholdsPreset) {
    console.warn("Vuestic UI default thresholds preset wasn't found!")
    return currentThresholdsConfig
  }

  const vuesticThresholdsConverted = Object.entries(thresholdsPreset)
    .reduce((acc, [key, value]) => {
      acc[key] = `${value}px`
      return acc
    }, {} as TailwindScreensConfig)

  return { ...currentThresholdsConfig, ...vuesticThresholdsConverted }
}
