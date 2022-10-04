import { computed, ExtractPropTypes, Ref, StyleValue } from 'vue'

export const useFixedBarProps = {
  hideOnScroll: { type: Boolean, default: false },
  fixed: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false },
}

export function useFixedBar (props: ExtractPropTypes<typeof useFixedBarProps>, isScrolledDown: Ref<boolean>) {
  const isHiddenComputed = computed(() => isScrolledDown.value ? !!props.hideOnScroll : false)

  const transformComputed = computed(() => {
    if (!props.bottom && !isHiddenComputed.value) { return }
    if (props.bottom && isHiddenComputed.value) { return 'translateY(100%)' }
    if (props.bottom) { return props.fixed ? 'translateY(-100%)' : 'translateY(0)' }
    return 'translateY(-100%)'
  })

  const positionComputed = computed(() => {
    if (props.fixed) { return 'fixed' }
    return isHiddenComputed.value ? 'absolute' : undefined
  })

  const fixedBarStyleComputed = computed(() => {
    const result = {
      top: props.bottom && (isHiddenComputed.value || props.fixed) ? '100%' : undefined,
      transform: props.hideOnScroll || props.fixed ? transformComputed.value : undefined,
    }

    positionComputed.value && Object.assign(result, { position: positionComputed.value })

    return result
  })

  return { fixedBarStyleComputed }
}
