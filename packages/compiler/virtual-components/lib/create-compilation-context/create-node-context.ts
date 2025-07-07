import { ElementNode } from "@vue/compiler-core";
import { VirtualComponent } from "../create-virtual-component";
import { CompilerSourceFileContext } from "./create-source-file-context";
import { createNodeContextProps } from "./create-node-context/create-props";
import { createNodeContextSlots } from "./create-node-context/create-slots";
import { createInTemplateExecuter } from './create-node-context/create-executer'

const VIRTUAL_COMPONENT_PREFIX_REGEX = /^Vc/

export enum CompilerRenderResult {
  None = -1,
  /** Fully static: can be inlined */
  Static = 0,
  /** Has dynamic props: can be inlined */
  Dynamic = 1,
  /** Has runtime code to render: must be separate component */
  Runtime = 2
}

export const createNodeContext = (node: ElementNode, component: VirtualComponent, sourceFileCtx: CompilerSourceFileContext) => {
  const { tag } = node

  const name = tag.replace(VIRTUAL_COMPONENT_PREFIX_REGEX, '')

  const {
    staticProps,
    dynamicProps,
    staticAttrs,
    dynamicAttrs,
    directives
  } = createNodeContextProps(node, component)

  const slots = createNodeContextSlots(node)

  const imports = [] as string[]

  const ctx = {
    name,
    tag,
    component,
    staticProps,
    staticAttrs,
    dynamicProps,
    dynamicAttrs,
    directives,
    sourceFileCtx,
    slots,
    imports,
    execute: null as unknown as ReturnType<typeof createInTemplateExecuter>,
    renderResult: CompilerRenderResult.None,
    usedKeys: new Set<string>()
  }

  const executer = createInTemplateExecuter(ctx)

  ctx.execute = executer

  return ctx
}

export type CompilerNodeContext = ReturnType<typeof createNodeContext>
