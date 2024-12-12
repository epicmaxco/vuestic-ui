import type { FormKitNode } from "@formkit/core";

export function vuesticInputs(node: FormKitNode): void {
  node.on('created', () => {
    node.addProps([
      'errorMessages',
      'error',
      'dirty',
      'messages',
      'label',
      'loading'
    ])

    node.on('message-added', ({ payload }) => {
      if (['validation', 'error'].includes(payload.type) && payload.visible) {
        node.props.errorMessages = payload.value
      }
    })

    node.on('message-updated', ({ payload }) => {
      if (['validation', 'error'].includes(payload.type) && payload.visible) {
        node.props.errorMessages = payload.value
      }
    })

    node.on('message-removed', ({ payload }) => {
      if (['validation', 'error'].includes(payload.type) && payload.visible) {
        node.props.errorMessages = ''
      }
    })
  })
}
