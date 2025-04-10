import { SFCDescriptor } from "@vue/compiler-sfc"
import { VirtualComponentBinding } from "./script-render-function/create-script-bindings"

export type VirtualComponent = {
  name: string,
  bindings: Record<string, VirtualComponentBinding>,
  sfcDescriptor: SFCDescriptor,
  renderTemplate: (ctx: any) => string,
  renderScript: (ctx: any) => string
}

export type EmptyVirtualComponent = Partial<VirtualComponent> & Pick<VirtualComponent, 'name' | 'sfcDescriptor'>
