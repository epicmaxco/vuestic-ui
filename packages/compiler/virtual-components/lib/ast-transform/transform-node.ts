import { NodeTypes, RootNode,type ElementNode } from "@vue/compiler-core";
import { type VirtualComponent } from "../create-virtual-component";
import { createNodeContext, CompilerNodeContext, CompilerRenderResult } from "../create-compilation-context/create-node-context";
import {  walk, } from './walk'
import { isNodeElement, isNodeHasChildren, isNodeInterpolation, isNodeSlot, isNodeTemplateSlot, isPropDirective } from "./ast-helpers";
import { transformSlotNode } from "./transformers/transform-slot-node";
import { mergeDuplicate, transformPropBind } from "./transformers/transform-prop-bind";
import { transformInterpolation } from "./transformers/transform-interpolation";
import { transformRootNodeAttrs } from './transformers/transform-root-node-attrs'
import { CompilerSourceFileContext } from '../create-compilation-context/create-source-file-context'
import { VirtualComponentError } from "../errors";
import { markNodeAstVisited, isNodeAstVisited } from './node-marker'
import { CompilerVirtualComponentVariable } from "../create-virtual-component/build-script-setup";

const transformWithVFor = <T extends RootNode>(node: T, ctx: CompilerNodeContext) => {
  const nodes = [] as RootNode[]

  if (ctx.directives.length > 0 && !!0) {
    const forDirective = ctx.directives.find((d) => d.name === 'for')

    if (!forDirective) {
      return transformAstWithContext(node, ctx)
    }

    if (!forDirective?.forParseResult) {
      throw new VirtualComponentError('Unexpected Error: unable to parse v-for directive')
    }

    const forSource = forDirective?.forParseResult?.source.loc.source

    // TODO: Accept numbers and try to execute here

    if (forSource && forSource in ctx.sourceFileCtx.variables) {
      const forSourceValue = ctx.sourceFileCtx.variables[forSource]

      if (!Array.isArray(forSourceValue)) {
        throw new Error('Unexpected Error: v-for directive only accepts arrays')
      }

      const forVariable = forDirective.forParseResult.value?.type === NodeTypes.SIMPLE_EXPRESSION ? forDirective.forParseResult.value.content : undefined

      if (!forVariable) {
        throw new Error('Unexpected Error: v-for directive requires a variable')
      }

      ctx.directives = ctx.directives.filter((d) => d !== forDirective)

      for (let i = 0; i < forSourceValue.length; i++) {
        const clone = (node)
        const scope = {
          static: {
            [forVariable]: forSourceValue[i]
          }
        }
        ctx.execute.addScope(scope)
        const transformed = transformAstWithContext(clone, ctx)
        ctx.execute.removeScope(scope)
        nodes.push(transformed)
      }
    }
  } else {
    return transformAstWithContext(node, ctx)
  }

  return nodes
}

export const transformAstWithContext = <T extends ElementNode | RootNode>(node: T, ctx: CompilerNodeContext) => {
  if (isNodeAstVisited(node)) {
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

      node.props = mergeDuplicate(node.props)
    }

    if (isNodeInterpolation(node)) {
      return transformInterpolation(node, ctx)
    }
  })

  if (ctx.staticAttrs.length > 0 || ctx.dynamicAttrs.length > 0 || ctx.directives.length > 0) {
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

  markNodeAstVisited(node)

  return node
}

/** Apply virtual component to AST Node */
export const transformAstNode = (node: ElementNode, component: VirtualComponent, sourceContext: CompilerSourceFileContext) => {
  const ctx = createNodeContext(node, component, sourceContext)
  const newAst = structuredClone(component.templateAst)

  const ast = transformWithVFor(newAst, ctx)

  if (ctx.component.script.scriptSetup?.variables) {
    Object.keys(ctx.component.script.scriptSetup.variables).forEach((variableName) => {
      const variable = ctx.component.script.scriptSetup!.variables[variableName]

      if (!ctx.usedKeys.has(variableName)) {
        return
      }

      if (variable.type === CompilerVirtualComponentVariable.Dynamic || variable.type === CompilerVirtualComponentVariable.MaybeDynamic) {
        ctx.renderResult = CompilerRenderResult.Runtime
      }
    })
  }

  if (component.name === 'VcButton') {
    ctx.imports.push('getColor')
  }

  return {
    ast: transformWithVFor(newAst, ctx),
    imports: ctx.imports,
    renderResult: ctx.renderResult
  }
}
