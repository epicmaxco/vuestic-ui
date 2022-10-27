import type { ColorConfig } from '../types'
import { presets } from '../presets'

export const getColorDefaultConfig = (): ColorConfig => ({
  variables: presets.light,
  threshold: 150,
  presets: {
    light: presets.light,
    dark: presets.dark,
  },
  currentPresetName: 'light',
})
