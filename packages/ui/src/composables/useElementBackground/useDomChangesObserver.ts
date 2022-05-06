import { onBeforeUnmount, onMounted } from 'vue'
import debounce from 'lodash/debounce.js'

let observer: MutationObserver
let callbacks: (() => void)[] = []

const createMutationObserver = () => {
  if (observer) { return }

  observer = new MutationObserver(debounce(() => {
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i]()
    }
  }, 0))

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
export const useDomChangesObserver = (cb: () => void) => {
  onMounted(() => {
    createMutationObserver()
    callbacks.push(cb)
  })

  onBeforeUnmount(() => {
    callbacks = callbacks.filter((c) => c !== cb)
    destroyMutatuinObserver()
  })
}
