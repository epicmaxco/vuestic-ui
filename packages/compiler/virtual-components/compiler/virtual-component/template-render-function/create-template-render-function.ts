import { RootNode, type ElementNode } from "@vue/compiler-core";
import { CompilerNodeContext } from "../../../lib/create-compilation-context/create-node-context";
import { SFCDescriptor } from "@vue/compiler-sfc";
import { EmptyVirtualComponent } from "../types";

const transformNode = (node: RootNode | RootNode, ctx: CompilerNodeContext) => {

}

export const createTemplateRenderFunction = (component: EmptyVirtualComponent) => {
  const sfc = component.sfcDescriptor

  const render = (ctx: CompilerNodeContext) => {
    const ast = sfc.template?.ast

    if (!ast) {
      throw new Error('No template found in component while transforming vue file')
    }

    return ''
  }

  return render
}
