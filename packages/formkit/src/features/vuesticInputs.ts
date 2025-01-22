import type { FormKitNode } from '@formkit/core'
import { computed } from 'vue';

export function vuesticInputs(node: FormKitNode): void {
  node.addProps(['loading'])

  node.on('created', () => {
    const errorMessages = computed(() =>
      node.context!.fns.arrayMessages(node.context!.messages)
    )
    const error = computed(() =>
      node.context!.defaultMessagePlacement && Boolean(node.context!.fns.length(node.context!.messages))
    )

    node.context!.fns.arrayMessages = (obj: Record<PropertyKey, any>) =>
      Object.values(obj)
        .filter(m => m.visible)
        .map(m => m.value)

    node.context!.errorMessages = errorMessages
    node.context!.error = error
  })
}
