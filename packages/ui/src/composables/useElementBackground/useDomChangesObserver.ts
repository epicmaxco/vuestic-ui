import { nextTick, onBeforeUnmount, onMounted, Ref } from 'vue'
import debounce from 'lodash/debounce.js'

type Handler = { cb: (() => void), el: () => HTMLElement }

let observer: MutationObserver
let callbacks: Handler[] = []

const createMutationObserver = () => {
  if (observer) { return }

  observer = new MutationObserver((mutations: MutationRecord[]) => {
    for (let i = 0; i < callbacks.length; i++) {
      if (mutations.some((m) => m.target.contains(callbacks[i].el()))) {
        callbacks[i].cb()
      }
    }
  })

  observer.observe(window.document, {
    attributeFilter: ['style', 'class'],
    subtree: true,
    attributes: true,
  })
}

const destroyMutatuinObserver = () => {
  if (!observer) { return }

  if (callbacks.length > 0) { return }
  observer.disconnect()
}

/** Creates on globa watched for dom changes */
export const useDomChangesObserver = (cb: () => void, el: () => HTMLElement) => {
  onMounted(() => {
    createMutationObserver()
    callbacks.push({ cb, el })
  })

  onBeforeUnmount(() => {
    callbacks = callbacks.filter((c) => c.cb !== cb)
    destroyMutatuinObserver()
  })
}
