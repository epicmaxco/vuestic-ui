import { PropType, ref, Ref, onMounted } from 'vue'

import { useHTMLElement, useEvent } from './'

export const useHoverStyleProps = {
  hoverBehaviour: {
    type: String as PropType<'opacity' | 'mask'>,
    default: 'mask',
    validator: (value: string) => ['opacity', 'mask'].includes(value),
  },
  hoverOpacity: { type: Number, default: 0.15 },
  hoverMaskColor: { type: String, default: 'textLight' },
}
