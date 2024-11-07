import { getCurrentInstance, computed, ExtractPropTypes, ref } from 'vue'

import { useIntersectionObserver, useNumericProp, useElementTemplateRef } from '../../../composables'

export const useTableScrollProps = {
  scrollTopMargin: { type: [Number, String], default: 0 },
  scrollBottomMargin: { type: [Number, String], default: 0 },
}

export const useTableScrollEmits = ['scroll:top', 'scroll:bottom']

export const useTableScroll = (
  props: ExtractPropTypes<typeof useTableScrollProps>,
  emit: (event: 'scroll:bottom' | 'scroll:top', ...args: any[]) => void,
) => {
  // NOTE: unfortunately, this is not reactive
  // TODO: replace 'vNodeProps' with '$listeners' when it's available in vue 3
  const vNodeProps = getCurrentInstance()?.vnode.props
  const doRenderTopTrigger = vNodeProps?.['onScroll:top'] !== undefined
  const doRenderBottomTrigger = vNodeProps?.['onScroll:bottom'] !== undefined

  const scrollContainer = useElementTemplateRef(ref())
  const topTrigger = useElementTemplateRef(ref())
  const bottomTrigger = useElementTemplateRef(ref())
  const scrollTopMarginComputed = useNumericProp('scrollTopMargin')
  const scrollBottomMarginComputed = useNumericProp('scrollBottomMargin')

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
    rootMargin: `${scrollTopMarginComputed.value ?? 0}px 0px ${scrollBottomMarginComputed.value ?? 0}px 0px`,
  }))

  useIntersectionObserver(targets, intersectionHandler, options)

  return {
    scrollContainer,
    topTrigger,
    bottomTrigger,
    doRenderTopTrigger,
    doRenderBottomTrigger,
  }
}
