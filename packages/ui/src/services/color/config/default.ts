import type { ColorConfig } from '../types'
import { presets } from '../presets'
import { makeColorsConfig } from './make-config'

export const getColorDefaultConfig = (): ColorConfig => makeColorsConfig({
  threshold: 150,
  presets: {
    light: presets.light,
    dark: presets.dark,
  },
  currentPresetName: 'light',
})
