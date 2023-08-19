import { ExtractPropTypes, PropType } from 'vue'

// Unwrap type, e.g.: removes name from type alias and returns the type
type UnwrapType<T> = true extends boolean ? T : never

type AreaConfig = UnwrapType<{
  absolute?: boolean,
  order?: number,
  fixed?: boolean,
}>

export const useLayoutProps = {
  top: {
    type: Object as PropType<AreaConfig>,
    default: () => ({}),
  },
  right: {
    type: Object as PropType<AreaConfig>,
    default: () => ({}),
  },
  left: {
    type: Object as PropType<AreaConfig>,
    default: () => ({}),
  },
  bottom: {
    type: Object as PropType<AreaConfig>,
    default: () => ({}),
  },
}

export type LayoutProps = ExtractPropTypes<typeof useLayoutProps>
