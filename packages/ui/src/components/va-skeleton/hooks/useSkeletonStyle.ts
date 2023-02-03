import { computed, ExtractPropTypes } from 'vue'

const useSkeletonStyleProps = {
  rounded: { type: Boolean, default: false },
  circle: { type: Boolean, default: false },
}

export const useSkeletonStyle = (props: ExtractPropTypes<typeof useSkeletonStyleProps>) => {
  return computed(() => ({
    'border-radius': props.circle ? '50%' : props.rounded ? '4px' : '0px',
  }))
}
