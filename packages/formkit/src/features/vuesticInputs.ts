import type { FormKitNode } from "@formkit/core";

export function vuesticInputs(node: FormKitNode): void {
  node.addProps(['loading'])
}
