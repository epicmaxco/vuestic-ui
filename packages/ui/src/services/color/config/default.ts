import type { ColorConfig } from '../types'
import { presets } from '../presets'

export const getColorDefaultConfig = (): ColorConfig => ({
  get variables () {
    return this.presets[this.currentPresetName]
  },
  set variables (value) {
    this.presets[this.currentPresetName] = value
  },
  threshold: 150,
  presets: {
    light: presets.light,
    dark: presets.dark,
  },
  currentPresetName: 'light',
})
