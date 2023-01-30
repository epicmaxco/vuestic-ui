import { ref, unref, computed, watch, onBeforeUnmount, type Ref } from 'vue'

import { extractHTMLElement } from './useHTMLElement'

type MaybeRef<T> = T | Ref<T>

export const useIntersectionObserver = <T extends HTMLElement | undefined>(
  cb: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void,
  options: Ref<IntersectionObserverInit> = ref({}),
  target: Ref<MaybeRef<T>[] | T> = ref([]),
  enabled = true,
) => {
  const observer = ref<IntersectionObserver>()

  const disconnectObserver = () => {
    observer.value?.disconnect()
  }

  const observeTarget = (target: MaybeRef<T>) => {
    const disclosedTarget = extractHTMLElement(unref(target))
    disclosedTarget && observer.value?.observe(disclosedTarget)
  }

  const observeAll = (targets: MaybeRef<T>[]) => {
    targets.forEach(observeTarget)
  }

  const initObserver = () => {
    observer.value = new IntersectionObserver(cb, options.value)
  }

  const isIntersectionDisabled = computed(() => !enabled || !(typeof window !== 'undefined' && 'IntersectionObserver' in window))

  watch([target, options], ([newTarget]) => {
    if (isIntersectionDisabled.value) { return }

    disconnectObserver()

    if (!newTarget) { return }

    initObserver()

    Array.isArray(newTarget) ? observeAll(newTarget) : observeTarget(newTarget)
  }, { immediate: true })

  onBeforeUnmount(disconnectObserver)

  return { isIntersectionDisabled }
}
