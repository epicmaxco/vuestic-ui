import { computed, ExtractPropTypes, Ref } from 'vue'

export const useFixedBarProps = {
  hideOnScroll: { type: Boolean, default: false },
  fixed: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false },
}

export function useFixedBar (props: ExtractPropTypes<typeof useFixedBarProps>, isScrolledDown: Ref<boolean>) {
  const isHiddenComputed = computed(() => isScrolledDown.value ? !!props.hideOnScroll : false)

  const transformComputed = computed(() => {
    if (!props.bottom && !isHiddenComputed.value) { return '' }
    if (props.bottom && !props.fixed) { return isHiddenComputed.value ? 'translateY(100%)' : 'translateY(0)' }
    if (props.bottom && props.fixed) { return isHiddenComputed.value ? 'translateY(100%)' : 'translateY(-100%)' }
    return 'translateY(-100%)'
  })

  const positionComputed = computed(() => {
    if (props.fixed) { return 'fixed' }
    return isHiddenComputed.value ? 'absolute' : undefined
  })

  const fixedBarStyleComputed = computed(() => ({
    top: props.bottom && ((props.hideOnScroll && isHiddenComputed.value) || props.fixed) ? '100%' : undefined,
    position: positionComputed.value,
    transform: props.hideOnScroll || props.fixed ? transformComputed.value : undefined,
  }))

  return { fixedBarStyleComputed }
}
