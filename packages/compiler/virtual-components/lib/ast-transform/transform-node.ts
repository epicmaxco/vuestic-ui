import { RootNode,type ElementNode } from "@vue/compiler-core";
import { type VirtualComponent } from "../create-virtual-component";
import { createCompilerContext, type CompilerContext } from "../create-compiler-context";
import {  walk, } from './walk'
import { isNodeElement, isNodeHasChildren, isNodeInterpolation, isNodeSlot, isNodeTemplateSlot, isPropDirective } from "./ast-helpers";
import { transformSlotNode } from "./transformers/transform-slot-node";
import { transformPropBind } from "./transformers/transform-prop-bind";
import { transformInterpolation } from "./transformers/transform-interpolation";
import { transformRootNodeAttrs } from './transformers/transform-root-node-attrs'

export const transformAstWithContext = <T extends ElementNode | RootNode>(node: T, ctx: CompilerContext) => {
  if ('__virtualComponentTransformed' in node && node.__virtualComponentTransformed) {
    return node
  }

  walk(node, (node, parent) => {
    if (isNodeSlot(node)) {
      if (!isNodeElement(parent)) { return }

      return transformSlotNode(node, parent, ctx)
    }

    if (isNodeElement(node) && isNodeHasChildren(parent)) {
      node.props.forEach((prop) => {
        if (isPropDirective(prop) && node.props.includes(prop)) {
          transformPropBind(prop, node, parent, ctx)
        }
      })
    }

    if (isNodeInterpolation(node)) {
      return transformInterpolation(node, ctx)
    }
  })

  if (ctx.attrs.length > 0 || ctx.dynamicAttrs.length > 0) {
    if (node.children.length === 1) {
      const rootNode = node.children[0]

      if (isNodeElement(rootNode)) {
        transformRootNodeAttrs(rootNode, ctx)
      } else {
        console.warn('Unable to pass attributes. Expected virtual component root node to be Element')
      }
    } else {
      console.warn('Unable to pass attributes. Expected virtual component to have only one root node')
    }
  }

  (node as any).__virtualComponentTransformed = true

  return node
}

/** Apply virtual component to AST Node */
export const transformAstNode = (node: ElementNode, component: VirtualComponent) => {
  const ctx = createCompilerContext(node, component)
  const newAst = structuredClone(component.templateAst)

  transformAstWithContext(newAst, ctx)

  // TODO: Move to one walk
  // applySlots(newAst, node, ctx)
  // applyPropBinds(newAst, node, ctx)
  // applyTextInterpolations(newAst, node, ctx)
  // applyAttrs(newAst, node, ctx)

  return newAst
}
