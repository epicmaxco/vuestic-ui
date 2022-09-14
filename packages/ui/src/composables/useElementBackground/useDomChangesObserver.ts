import { onBeforeUnmount, onMounted } from 'vue'

type Handler = { cb: (() => void), el: () => HTMLElement }

let observer: MutationObserver
let callbacks: Handler[] = []

const createMutationObserver = () => {
  if (observer) { return }

  const runCallbacks = (mutations: MutationRecord[]) => {
    for (let i = 0; i < callbacks.length; i++) {
      if (mutations.some((m) => m.target.contains(callbacks[i].el()))) {
        callbacks[i].cb()
      }
    }
  }

  const runAllCallbacks = () => {
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i].cb()
    }
  }

  setInterval(() => {
    runAllCallbacks()
  }, 200)

  observer = new MutationObserver((mutations) => {
    // runCallbacks(mutations)
  })

  observer.observe(window.document, {
    attributeFilter: ['style', 'class'],
    subtree: true,
    attributes: true,
  })
}

const destroyMutationObserver = () => {
  if (!observer) { return }

  if (callbacks.length > 0) { return }
  observer.disconnect()
}

/** Creates on global watched for dom changes */
export const useDomChangesObserver = (cb: () => void, el: () => HTMLElement) => {
  onMounted(() => {
    createMutationObserver()
    callbacks.push({ cb, el })
  })

  onBeforeUnmount(() => {
    callbacks = callbacks.filter((c) => c.cb !== cb)
    destroyMutationObserver()
  })
}
