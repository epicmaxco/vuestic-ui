import { getCurrentInstance, computed, ExtractPropTypes } from 'vue'

import { useIntersectionObserver, useElementRef } from '../../../composables'

export const useTableScrollProps = {
  scrollTopMargin: { type: Number, default: 0 },
  scrollBottomMargin: { type: Number, default: 0 },
}

export const useTableScrollEmits = ['scroll:top', 'scroll:bottom']

export default function useTableScroll (
  props: ExtractPropTypes<typeof useTableScrollProps>,
  emit: (event: 'scroll:bottom' | 'scroll:top', ...args: any[]) => void,
) {
  // NOTE: unfortunately, this is not reactive
  // TODO: replace 'vNodeProps' with '$listeners' when it's available in vue 3
  const vNodeProps = getCurrentInstance()?.vnode.props
  const doRenderTopTrigger = vNodeProps?.['onScroll:top'] !== undefined
  const doRenderBottomTrigger = vNodeProps?.['onScroll:bottom'] !== undefined

  const scrollContainer = useElementRef()
  const topTrigger = useElementRef()
  const bottomTrigger = useElementRef()

  const isObservable = computed(() => !!scrollContainer.value)

  const intersectionHandler = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target === topTrigger.value
          ? emit('scroll:top')
          : emit('scroll:bottom')
      }
    })
  }

  const targets = computed<HTMLElement[]>(() => {
    const list: HTMLElement[] = []

    if (isObservable.value) {
      topTrigger.value && list.push(topTrigger.value)
      bottomTrigger.value && list.push(bottomTrigger.value)
    }

    return list
  })

  const options = computed<IntersectionObserverInit>(() => ({
    root: scrollContainer.value,
    rootMargin: `${props.scrollTopMargin ?? 0}px 0px ${props.scrollBottomMargin ?? 0}px 0px`,
  }))

  useIntersectionObserver(intersectionHandler, options, targets)

  return {
    scrollContainer,
    topTrigger,
    bottomTrigger,
    doRenderTopTrigger,
    doRenderBottomTrigger,
  }
}
