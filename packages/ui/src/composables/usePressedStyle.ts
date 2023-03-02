import { PropType } from 'vue'

export const usePressedStyleProps = {
  pressedBehavior: {
    type: String as PropType<'opacity' | 'mask' | 'none'>,
    default: 'none',
    validator: (value: string) => ['opacity', 'mask', 'none'].includes(value),
  },
  pressedOpacity: { type: Number, default: 0.13 },
  pressedMaskColor: { type: String, default: 'textPrimary' },
}
