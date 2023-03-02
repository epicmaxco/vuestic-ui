import { defineConfig, presetIcons, presetUno } from 'unocss'
import presetTheme from 'unocss-preset-theme'
import { colorsPreset, thresholdsPreset } from 'vuestic-ui'

import type { Theme } from 'unocss/preset-uno'

const convertNumbersToCssUnits = (obj: Record<string, unknown>, unit = 'px') =>
  Object.entries(obj).reduce((acc, [key, value]) => ({
    ...acc,
    [key]: `${value}${unit}`,
  }), {})

export default defineConfig<Theme>({
  theme: {
    colors: colorsPreset.light,
    breakpoints: convertNumbersToCssUnits(thresholdsPreset),
  },
  presets: [
    presetUno({
      dark: 'media',
    }),
    presetIcons(),
    presetTheme<Theme>({
      theme: {
        dark: {
          colors: colorsPreset.dark,
        },
      },
    }),
  ],
})
