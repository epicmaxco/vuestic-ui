// @ts-nocheck
import withConfigTransport from '../../../services/config-transport/withConfigTransport'

import ColorDotBase from './ColorDot.vue'
import VaAdvancedColorPickerBase from './VaAdvancedColorPicker.vue'
import VaColorInputBase from './VaColorInput.vue'
import VaColorPicker from './VaColorPicker.vue'
import VaColorPickerInputBase from './VaColorPickerInput.vue'
import VaColorSquareBase from './VaColorSquare.vue'
import VaPaletteCustomBase from './VaPaletteCustom.vue'
import VaSimplePalettePickerBase from './VaSimplePalettePicker.vue'
import VaSliderColorPickerBase from './VaSliderColorPicker.vue'

export const ColorDot = withConfigTransport(ColorDotBase)
export const VaAdvancedColorPicker = withConfigTransport(VaAdvancedColorPickerBase)
export const VaColorInput = withConfigTransport(VaColorInputBase)
export const VaColorPickerInput = withConfigTransport(VaColorPickerInputBase)
export const VaColorSquare = withConfigTransport(VaColorSquareBase)
export const VaPaletteCustom = withConfigTransport(VaPaletteCustomBase)
export const VaSimplePalettePicker = withConfigTransport(VaSimplePalettePickerBase)
export const VaSliderColorPicker = withConfigTransport(VaSliderColorPickerBase)

export default withConfigTransport(VaColorPicker)
