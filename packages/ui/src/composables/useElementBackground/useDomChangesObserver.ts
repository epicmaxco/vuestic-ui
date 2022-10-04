import { onBeforeUnmount, onMounted, Ref } from 'vue'

type Handler = { cb: (() => void), el: Ref<HTMLElement | undefined> }

let observer: MutationObserver | null
let callbacks: Handler[] = []

const createMutationObserver = () => {
  const runCallbacks = (mutations: MutationRecord[]) => {
    for (let i = 0; i < callbacks.length; i++) {
      if (mutations.some((m) => m.target.contains(callbacks[i].el.value || null))) {
        callbacks[i].cb()
      }
    }
  }

  if (!observer) {
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
export const useDomChangesObserver = (cb: () => void, el: Ref<HTMLElement | undefined>) => {
  onMounted(() => {
    createMutationObserver()
    callbacks.push({ cb, el })
  })

  onBeforeUnmount(() => {
    callbacks = callbacks.filter((c) => c.cb !== cb)
    destroyMutationObserver()
  })
}
