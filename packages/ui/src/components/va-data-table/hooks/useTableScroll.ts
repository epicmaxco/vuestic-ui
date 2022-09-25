import { shallowRef, onMounted, computed, onBeforeUnmount, watch, nextTick } from 'vue'

import { useHTMLElement } from '../../../composables'

interface useTableScrollProps {
  stickyHeader: boolean
  stickyFooter: boolean
  height: string | number | undefined
  scrollTopMargin: number | undefined
  scrollBottomMargin: number | undefined
}

export default function useTableScroll (
  props: useTableScrollProps,
  emit: (event: 'scroll:bottom' | 'scroll:top', ...args: any[]) => void,
) {
  let observer: IntersectionObserver

  const scrollContainer = shallowRef<HTMLDivElement>()
  const scrollContainerHTML = useHTMLElement(scrollContainer)

  const topTrigger = shallowRef<HTMLDivElement>()
  const topTriggerHTML = useHTMLElement(topTrigger)

  const bottomTrigger = shallowRef<HTMLDivElement>()
  const bottomTriggerHTML = useHTMLElement(bottomTrigger)

  const isScrollable = computed(() => !!(props.height))
  const isTriggers = computed(
    () => !!(props.scrollTopMargin !== undefined || props.scrollBottomMargin !== undefined),
  )
  const isObservable = computed(() => isScrollable.value && isTriggers.value)

  const margins = computed(
    () => `${props.scrollTopMargin ?? 0}px 0px ${props.scrollBottomMargin ?? 0}px 0px`,
  )

  const intersectionHandler = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target === topTriggerHTML.value
          ? emit('scroll:top')
          : emit('scroll:bottom')
      }
    })
  }

  const disconnectObserver = () => {
    observer && observer.disconnect()
  }

  const observeTarget = (target: HTMLElement | undefined) => {
    target && observer.observe(target)
  }

  const unObserveTarget = (target: HTMLElement | undefined) => {
    target && observer.unobserve(target)
  }

  const initObserver = () => {
    observer = new IntersectionObserver(intersectionHandler, {
      root: scrollContainerHTML.value,
      rootMargin: margins.value,
    })

    props.scrollTopMargin !== undefined && observeTarget(topTriggerHTML.value)
    props.scrollBottomMargin !== undefined && observeTarget(bottomTriggerHTML.value)
  }

  watch(isObservable, (newValue) => {
    newValue
      ? nextTick(initObserver)
      : disconnectObserver()
  })

  watch(() => props.scrollTopMargin, (newValue) => {
    if (isObservable.value) {
      newValue !== undefined
        ? nextTick(() => observeTarget(topTriggerHTML.value))
        : unObserveTarget(topTriggerHTML.value)
    }
  })

  watch(() => props.scrollBottomMargin, (newValue) => {
    if (isObservable.value) {
      newValue !== undefined
        ? nextTick(() => observeTarget(bottomTriggerHTML.value))
        : unObserveTarget(bottomTriggerHTML.value)
    }
  })

  onMounted(() => isObservable.value && initObserver())

  onBeforeUnmount(disconnectObserver)

  return {
    scrollContainer,
    topTrigger,
    bottomTrigger,
  }
}
