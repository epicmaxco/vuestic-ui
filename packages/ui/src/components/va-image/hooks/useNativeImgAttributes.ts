import { computed, type ExtractPropTypes, type PropType } from 'vue'
import { pick } from '../../../utils/pick'

export const useNativeImgAttributesProps = {
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  title: { type: String, default: '' },
  sizes: { type: String, default: '' },
  srcset: { type: String, default: '' },
  draggable: { type: Boolean, default: true },
  loading: {
    type: String as PropType<'lazy' | 'eager'>,
  },
  crossorigin: {
    type: String as PropType<'anonymous' | 'use-credentials'>,
  },
  decoding: {
    type: String as PropType<'auto' | 'sync' | 'async'>,
  },
  fetchpriority: {
    type: String as PropType<'auto' | 'high' | 'low'>,
    default: 'auto',
  },
  referrerpolicy: {
    type: String as PropType<'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'>,
  },
}

export const useNativeImgAttributes = (props: ExtractPropTypes<typeof useNativeImgAttributesProps>) => {
  return computed(() =>
    pick(props, ['src', 'alt', 'title', 'sizes', 'srcset', 'loading', 'referrerpolicy', 'fetchpriority', 'decoding', 'crossorigin', 'draggable']),
  )
}
