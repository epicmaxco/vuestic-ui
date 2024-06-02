import { PropType, ExtractPropTypes } from 'vue'

export type PresetPropValue = string | string[];

export const useComponentPresetProp = {
  preset: {
    type: [String, Array] as PropType<PresetPropValue>,
    default: undefined,
  },
}

export type ComponentPresetProp = ExtractPropTypes<typeof useComponentPresetProp>
