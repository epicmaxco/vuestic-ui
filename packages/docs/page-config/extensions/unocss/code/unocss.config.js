// unocss.config.*
import { defineConfig, presetIcons, presetUno } from 'unocss'
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
    presetIcons(),
    presetTheme({
      theme: {
        dark: {
          colors: colorsPreset.dark,
        },
      },
    }),
  ],
})
