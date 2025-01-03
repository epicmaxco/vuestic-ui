import type { FormKitNode } from '@formkit/core'

export function vuesticInputs(node: FormKitNode): void {
  node.addProps(['loading'])

  node.on('created', () => {
    node.context!.fns.arrayMessages = (obj: Record<PropertyKey, any>) =>
      Object.values(obj)
        .filter(m => m.visible)
        .map(m => m.value)
  })
}
