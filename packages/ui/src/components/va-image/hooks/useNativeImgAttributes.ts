import { computed, type ExtractPropTypes, type PropType } from 'vue'
import pick from 'lodash/pick.js'

const referrerPolicyOptions = ['no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'] as const
const loadingOptions = ['lazy', 'eager'] as const
const crossoriginOptions = ['anonymous', 'use-credentials'] as const
const decodingOptions = ['auto', 'sync', 'async'] as const
const fetchpriorityOptions = ['auto', 'high', 'low'] as const

export const validateProp = (v: string, arr: Readonly<string[]>) => arr.includes(v)

export const useNativeImgAttributesProps = {
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  title: { type: String, default: '' },
  sizes: { type: String, default: '' },
  srcset: { type: String, default: '' },
  notDraggable: { type: Boolean, default: false },
  loading: {
    type: String as PropType<typeof loadingOptions[number]>,
    validator: (v: string) => validateProp(v, loadingOptions),
  },
  crossorigin: {
    type: String as PropType<typeof crossoriginOptions[number]>,
    validator: (v: string) => validateProp(v, crossoriginOptions),
  },
  decoding: {
    type: String as PropType<typeof decodingOptions[number]>,
    validator: (v: string) => validateProp(v, decodingOptions),
  },
  fetchpriority: {
    type: String as PropType<typeof fetchpriorityOptions[number]>,
    default: 'auto',
    validator: (v: string) => validateProp(v, fetchpriorityOptions),
  },
  referrerpolicy: {
    type: String as PropType<typeof referrerPolicyOptions[number]>,
    validator: (v: string) => validateProp(v, referrerPolicyOptions),
  },
}

export const useNativeImgAttributes = (props: ExtractPropTypes<typeof useNativeImgAttributesProps>) => {
  return computed(() => ({
    ...pick(props, ['src', 'alt', 'title', 'sizes', 'srcset', 'loading', 'referrerpolicy', 'fetchpriority', 'decoding', 'crossorigin']),
    draggable: !props.notDraggable,
  }))
}
