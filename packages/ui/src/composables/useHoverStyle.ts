import { PropType } from 'vue'

export const useHoverStyleProps = {
  hoverBehavior: {
    type: String as PropType<'opacity' | 'mask' | 'none'>,
    default: 'none',
    validator: (value: string) => ['opacity', 'mask', 'none'].includes(value),
  },
  hoverOpacity: { type: Number, default: 0.15 },
  hoverMaskColor: { type: String, default: 'textInverted' },
}
