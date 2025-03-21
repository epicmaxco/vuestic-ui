import { NodeTypes, type TemplateChildNode, type ElementNode, DirectiveNode } from "@vue/compiler-core";
import { isNodeTemplateSlot, isPropAttribute, isPropDirective, toCamelCase } from "./utils";
import { type VirtualComponent } from "./create-virtual-component";
import { createInTemplateExecuter } from "./execute/print-rendering-context";
import { VirtualComponentError } from './errors'

const findSlotName = (child: ElementNode) => {
  for (const prop of child.props) {
    if (prop.type === NodeTypes.DIRECTIVE) {
      if (prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION) {
        return prop.arg.content
      }
    }
  }

  return null
}

const createCompilerContextSlots = (node: ElementNode) => {
  const directives = node.props.filter((prop) => prop.type === NodeTypes.DIRECTIVE)

  const templateSlots = node.children
    .filter(isNodeTemplateSlot)

  const defaultSlotNodes = node.children
    .filter((child) => !isNodeTemplateSlot(child))

  const slots = {} as Record<string, { name: string, children: TemplateChildNode[] }>
  templateSlots.forEach((child) => {
    const slotName = findSlotName(child)

    if (!slotName) {
      return
    }

    slots[slotName] = {
      name: slotName,
      children: child.children
    }
  })

  if (defaultSlotNodes.length) {
    const slotDirective = directives.find((dir) => dir.name === 'slot')

    if (slotDirective && slotDirective.arg) {
      const slotName = 'content' in slotDirective.arg ? slotDirective.arg.content : 'default'

      directives.splice(directives.indexOf(slotDirective), 1)

      slots[slotName] = {
        name: slotName,
        children: defaultSlotNodes
      }
    } else {
      slots.default = {
        name: 'default',
        children: defaultSlotNodes
      }
    }
  }

  return slots
}

const createProps = (node: ElementNode, component: VirtualComponent) => {
  const staticProps = [] as { name: string, rawName: string, value: string | undefined }[]
  const dynamicProps = [] as { name: string, rawName: string, value: string }[]
  const staticAttrs = [] as { name: string, value: string }[]
  const dynamicAttrs = [] as { name: string, value: string }[]

  const definedProps = component.script.scriptSetup?.props ?? {}
  const definedPropsNames = Object.keys(definedProps)

  const directives = [] as DirectiveNode[]

  node.props.forEach((prop) => {
    if (isPropAttribute(prop)) {
      if (definedProps[prop.name]) {
        staticProps.push({
          name: toCamelCase(prop.name),
          rawName: prop.name,
          value: prop.value?.content ?? definedProps[prop.name].default
        })
      } else {
        staticAttrs.push({
          name: toCamelCase(prop.name),
          value: prop.value?.content ?? 'true'
        })
      }
    }

    if (isPropDirective(prop)) {
      if (prop.name === 'bind' && prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION && prop.exp?.type === NodeTypes.SIMPLE_EXPRESSION) {
        const name = toCamelCase(prop.arg.content)

        if (definedPropsNames.includes(name)) {
          dynamicProps.push({
            name,
            rawName: prop.arg.content,
            value: prop.exp.content
          })
        } else {
          dynamicAttrs.push({
            name,
            value: prop.exp.content
          })
        }
      } else if (['if', 'for'].includes(prop.name)) {
        directives.push(prop)
      } else if (prop.name === 'slot') {
        // ignore
      } else {
        throw new VirtualComponentError('Unable to create props. Unsupported directive ' + prop.name + ' in ' + node.loc.source)
      }
    }
  })

  definedPropsNames.forEach((propName) => {
    const exists = staticProps.find((prop) => prop.name === propName)

    if (!exists) {
      staticProps.push({
        name: toCamelCase(propName),
        rawName: propName,
        value: definedProps[propName].default ?? undefined
      })
    }
  })

  return {
    directives,
    staticProps,
    dynamicProps,
    staticAttrs,
    dynamicAttrs
  }
}

export const createCompilerContext = (node: ElementNode, component: VirtualComponent) => {
  const { tag } = node

  const {
    staticProps,
    dynamicProps,
    staticAttrs,
    dynamicAttrs,
    directives
  } = createProps(node, component)

  const slots = createCompilerContextSlots(node)

  const imports = [] as string[]

  const ctx = {
    name: tag.replace(/^Vc/g, ''),
    tag,
    component,
    props: staticProps,
    attrs: staticAttrs,
    dynamicProps,
    dynamicAttrs,
    directives,
    slots,
    imports,
  } as CompilerContext

  ctx.execute = createInTemplateExecuter(ctx as CompilerContext)

  return ctx satisfies CompilerContext
}

export type CompilerContext = {
  name: string,
  tag: string,
  component: VirtualComponent,
  props: { name: string, rawName: string, value: string | undefined }[],
  attrs: { name: string, value: string }[],
  dynamicProps: { name: string, rawName: string, value: string }[],
  dynamicAttrs: { name: string, value: string }[],
  directives: DirectiveNode[],
  slots: Record<string, { name: string, children: TemplateChildNode[] }>,
  imports: string[],
  execute: ReturnType<typeof createInTemplateExecuter>
}
