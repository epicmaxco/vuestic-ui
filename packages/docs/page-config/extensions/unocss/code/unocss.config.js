// unocss.config.*
import { defineConfig, presetUno } from 'unocss'
import presetTheme from 'unocss-preset-theme'
import { colorsPreset, thresholdsPreset } from 'vuestic-ui'

const convertNumbersToCssUnits = (obj, unit = 'px') =>
  Object.entries(obj).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: `${value}${unit}`,
  }), {})

export default defineConfig({
  theme: {
    colors: colorsPreset.light,
    breakpoints: convertNumbersToCssUnits(thresholdsPreset),
  },
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetTheme({
      theme: {
        dark: {
          colors: colorsPreset.dark,
        },
      },
    }),
  ],
})
