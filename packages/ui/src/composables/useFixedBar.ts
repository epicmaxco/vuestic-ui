import { unwrapEl } from './../utils/unwrapEl'
import { computed, ExtractPropTypes, onBeforeUnmount, onMounted, ref, Ref, shallowRef, StyleValue } from 'vue'
import { TemplateRef } from '../utils/unwrapEl'
import { getWindow } from '../utils/ssr'
import { useEvent } from './std'

export const useFixedBarProps = {
  hideOnScroll: { type: Boolean, default: false },
  fixed: { type: Boolean, default: false },
  bottom: { type: Boolean, default: false },
}
export function useScrolledDown (target: Ref<HTMLElement | Window | undefined>) {
  const isScrolledDown = ref(false)
  let prevScrollPosition = 0

  const onScroll = (e: Event) => {
    const target = e.target as HTMLElement | Window
    const scrollValue = target instanceof Window ? target.scrollY : target.scrollTop

    isScrolledDown.value = prevScrollPosition < scrollValue
    prevScrollPosition = scrollValue
  }

  useEvent('scroll', onScroll, target)

  return isScrolledDown
}

export function useFixedBar (props: ExtractPropTypes<typeof useFixedBarProps>, rootElement: Ref<TemplateRef>) {
  const target = computed(() => props.fixed ? getWindow() : unwrapEl(rootElement.value))

  const isScrolledDown = useScrolledDown(target)

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

  return { fixedBarStyleComputed, isScrolledDown }
}
