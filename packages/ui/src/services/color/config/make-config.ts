import { ColorConfig } from '../types'

export const makeColorsConfig = (values: Omit<ColorConfig, 'variables'>): ColorConfig => ({
  get variables () {
    return this.presets[this.currentPresetName]
  },
  set variables (value) {
    this.presets[this.currentPresetName] = value
  },
  ...values,
})
