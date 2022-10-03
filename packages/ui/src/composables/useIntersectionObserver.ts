import { onBeforeUnmount, ref, Ref, unref, watch } from 'vue'

type MaybeRef<T> = T | Ref<T>

export const useIntersectionObserver = <T extends HTMLElement | undefined>(
  cb: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void,
  options: MaybeRef<IntersectionObserverInit> = {},
  targetsList: Ref<MaybeRef<T>[]> = ref([]),
) => {
  const observer = ref<IntersectionObserver>()

  const disconnectObserver = () => {
    observer.value?.disconnect()
  }

  const observeTarget = (target: MaybeRef<T>) => {
    const disclosedTarget = unref(target)
    disclosedTarget && observer.value?.observe(disclosedTarget)
  }

  const observeAll = (targets: MaybeRef<MaybeRef<T>[]>) => {
    const disclosedTargets = unref(targets)
    disclosedTargets.forEach(observeTarget)
  }

  const initObserver = () => {
    observer.value = new IntersectionObserver(cb, unref(options))
  }

  watch([targetsList, options], ([newList, newOptions], [oldList, oldOptions]) => {
    disconnectObserver()

    if (newOptions !== oldOptions) {
      if (newList.length) {
        initObserver()
        observeAll(newList)
      }

      return
    }

    if (newList.length) {
      if (!observer.value) {
        initObserver()
      }

      observeAll(newList)
    }
  }, { immediate: true })

  onBeforeUnmount(disconnectObserver)

  return observer
}
