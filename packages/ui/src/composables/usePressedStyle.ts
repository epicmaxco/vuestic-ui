import { PropType } from 'vue'

export const usePressedStyleProps = {
  pressedBehaviour: {
    type: String as PropType<'opacity' | 'mask'>,
    default: 'mask',
    validator: (value: string) => ['opacity', 'mask'].includes(value),
  },
  pressedOpacity: { type: Number, default: 0.13 },
  pressedMaskColor: { type: String, default: 'textDark' },
}
