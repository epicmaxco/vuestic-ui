import { ref, unref, watch, onBeforeUnmount, type Ref } from 'vue'
import { unwrapEl } from '../../../../utils/unwrapEl'
import { useClientOnly } from '../../ssr/useClientOnly'

type MaybeRef<T> = T | Ref<T>

export const useIntersectionObserver = <T extends HTMLElement | undefined>(
  target: Ref<MaybeRef<T>[] | T> = ref([]),
  cb: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void,
  options: Ref<IntersectionObserverInit> = ref({}),
) => {
  // fix for tests in jsdom: double check if IntersectionObserver is available
  const observer = useClientOnly(() => typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(cb, options.value) : null)

  const observeTarget = (target: MaybeRef<T>) => {
    const disclosedTarget = unwrapEl(unref(target))
    if (!(disclosedTarget instanceof Element)) {
      console.error('Vuestic: Trying to observe non-HTMLElement', {
        target: disclosedTarget,
      })
      throw new Error('Vuestic: Unable to observe non-HTMLElement')
    }
    if (disclosedTarget) {
      observer.value?.observe(disclosedTarget)
    }
  }

  const observeAll = (targets: MaybeRef<T>[]) => {
    targets.forEach(observeTarget)
  }

  watch([target, options], ([newTarget]) => {
    observer.value?.disconnect()

    if (!newTarget) { return }

    Array.isArray(newTarget) ? observeAll(newTarget) : observeTarget(newTarget)
  }, { immediate: true })

  onBeforeUnmount(() => observer.value?.disconnect())
}
