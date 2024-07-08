import { HTMLContentNode, HTMLElementNode } from "./parseSource";

export const getSlotName = (node: HTMLElementNode | HTMLContentNode) => {
  if (node.type === 'content') return 'default'

  const name = Object
    .keys(node.attributes)
    .find((key) => key.startsWith('#')) // TODO: Handle v-slot

  if (!name) return null

  return name
}
