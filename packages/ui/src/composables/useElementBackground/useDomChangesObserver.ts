import { onBeforeUnmount, onMounted, Ref } from 'vue'

type Handler<K = any, V = any> = { cb: ((cache: Map<K, V>) => void), el: Ref<HTMLElement | undefined> }

let observer: MutationObserver | null
let callbacks: Handler[] = []

const createMutationObserver = () => {
  if (!observer) {
    const runCallbacks = (mutations: MutationRecord[]) => {
      const cache = new Map()

      for (let i = 0; i < callbacks.length; i++) {
        if (mutations.some((m) => m.target.contains(callbacks[i].el.value || null))) {
          callbacks[i].cb(cache)
        }
      }
    }

    observer = new MutationObserver((mutations) => {
      runCallbacks(mutations)
    })
    observer.observe(document.documentElement, {
      attributeFilter: ['style', 'class'],
      subtree: true,
      attributes: true,
    })
  }
}

const destroyMutationObserver = () => {
  if (!observer) { return }

  if (callbacks.length > 0) { return }
  observer.disconnect()
  observer = null
}

/** Creates on global watched for dom changes */
export const useDomChangesObserver = <K, V>(cb: Handler<K, V>['cb'], el: Ref<HTMLElement | undefined>) => {
  onMounted(() => {
    createMutationObserver()
    callbacks.push({ cb, el })
  })

  onBeforeUnmount(() => {
    callbacks = callbacks.filter((c) => c.cb !== cb)
    destroyMutationObserver()
  })
}
