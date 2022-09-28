import { onBeforeUnmount, ref, Ref, unref, watch, WatchStopHandle } from 'vue'

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

  let unwatchOptions: WatchStopHandle

  const watchOptions = () => {
    unwatchOptions = watch(options, () => {
      disconnectObserver()
      initObserver()
      observeAll(targetsList)
    }, { immediate: true })
  }

  watch(targetsList, (newList, oldList) => {
    if (!newList.length) {
      disconnectObserver()
      unwatchOptions?.()
      return
    }

    if (oldList?.length) {
      disconnectObserver()
      observeAll(newList)
      return
    }

    watchOptions()
  }, { immediate: true })

  onBeforeUnmount(disconnectObserver)

  return observer
}
