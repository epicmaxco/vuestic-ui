type VuesticColorsList = Record<string, string>

/**
 * @param colors tailwind css colors options
 * @returns vuestic ui colors options
 */
export const convertColors = (colors: Record<string, string | Record<string, string>>): VuesticColorsList => {
  // system and deprecated by tailwind
  const ignoredColors = ['inherit', 'current', 'transparent', 'coolGray', 'blueGray', 'trueGray', 'warmGray', 'lightBlue']
  const result = {} as VuesticColorsList

  for (const prop in colors) {
    if (!ignoredColors.includes(prop)) {
      const propValue = colors[prop]
      if (typeof propValue === 'object') {
        for (const nestedProp in (colors[prop] as Record<string, string>)) {
          result[`${prop}-${nestedProp}`] = propValue[nestedProp]
        }
      } else {
        result[prop] = <string>colors[prop]
      }
    }
  }

  return result
}

/**
 * @param tailwindConfig users or default tailwind config
 * @returns vuestic colors config
 */
export const proceedColors = (tailwindConfig?: Record<string, any>): VuesticColorsList => {
  let tailwindColors

  if (tailwindConfig) {
    const tailwindColorsConfig = tailwindConfig.theme?.colors || tailwindConfig.theme?.extend?.colors
    if (tailwindColorsConfig) { tailwindColors = convertColors(tailwindColorsConfig) }
  }

  const isTailwindColorsConfigOverwritten = !!Object.keys(tailwindConfig?.theme?.colors || {}).length
  const tailwindDefaultColors = require('tailwindcss/colors')
  const tailwindDefaultColorsConverted = convertColors(tailwindDefaultColors)

  if (!tailwindColors) {
    tailwindColors = tailwindDefaultColorsConverted
  } else if (tailwindColors && !isTailwindColorsConfigOverwritten) {
    tailwindColors = { ...tailwindDefaultColorsConverted, ...tailwindColors, }
  }

  return tailwindColors
}
