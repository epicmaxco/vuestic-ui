import { computed, type ExtractPropTypes, type PropType } from 'vue'
import pick from 'lodash/pick.js'

const REFERRER_POLICY_OPTIONS = ['no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'] as const
const LOADING_OPTIONS = ['lazy', 'eager'] as const
const CROSSORIGIN_OPTIONS = ['anonymous', 'use-credentials'] as const
const DECODING_OPTIONS = ['auto', 'sync', 'async'] as const
const FETCH_PRIORITY_OPTIONS = ['auto', 'high', 'low'] as const

export const validateImgProp = (v: string, arr: Readonly<string[]>) => arr.includes(v)

export const useNativeImgAttributesProps = {
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  title: { type: String, default: '' },
  sizes: { type: String, default: '' },
  srcset: { type: String, default: '' },
  notDraggable: { type: Boolean, default: false },
  loading: {
    type: String as PropType<typeof LOADING_OPTIONS[number]>,
    validator: (v: string) => validateImgProp(v, LOADING_OPTIONS),
  },
  crossorigin: {
    type: String as PropType<typeof CROSSORIGIN_OPTIONS[number]>,
    validator: (v: string) => validateImgProp(v, CROSSORIGIN_OPTIONS),
  },
  decoding: {
    type: String as PropType<typeof DECODING_OPTIONS[number]>,
    validator: (v: string) => validateImgProp(v, DECODING_OPTIONS),
  },
  fetchpriority: {
    type: String as PropType<typeof FETCH_PRIORITY_OPTIONS[number]>,
    default: 'auto',
    validator: (v: string) => validateImgProp(v, FETCH_PRIORITY_OPTIONS),
  },
  referrerpolicy: {
    type: String as PropType<typeof REFERRER_POLICY_OPTIONS[number]>,
    validator: (v: string) => validateImgProp(v, REFERRER_POLICY_OPTIONS),
  },
}

export const useNativeImgAttributes = (props: ExtractPropTypes<typeof useNativeImgAttributesProps>) => {
  return computed(() => ({
    ...pick(props, ['src', 'alt', 'title', 'sizes', 'srcset', 'loading', 'referrerpolicy', 'fetchpriority', 'decoding', 'crossorigin']),
    draggable: !props.notDraggable,
  }))
}
