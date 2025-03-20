import { NodeTypes, type TemplateChildNode, type ElementNode, DirectiveNode } from "@vue/compiler-core";
import { isNodeTemplateSlot, isPropAttribute, isPropDirective, toCamelCase } from "./utils";
import { type VirtualComponent } from "./create-virtual-component";
import { createInTemplateExecuter } from "./execute/print-rendering-context";

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

  const definedProps = component.script.props
  const defaultProps = component.script.propsDefaults

  node.props.forEach((prop) => {
    if (isPropAttribute(prop)) {
      if (definedProps.includes(prop.name)) {
        staticProps.push({
          name: toCamelCase(prop.name),
          rawName: prop.name,
          value: prop.value?.content ?? defaultProps[prop.name]
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

        if (definedProps.includes(name)) {
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
      }
    }
  })

  definedProps.forEach((propName) => {
    const exists = staticProps.find((prop) => prop.name === propName)

    if (!exists) {
      staticProps.push({
        name: toCamelCase(propName),
        rawName: propName,
        value: defaultProps[propName] ?? undefined
      })
    }
  })

  return {
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
    dynamicAttrs
  } = createProps(node, component)

  const slots = createCompilerContextSlots(node)

  return {
    name: tag.replace(/^Vc/g, ''),
    tag,
    props: staticProps,
    attrs: staticAttrs,
    dynamicProps,
    dynamicAttrs,
    slots,
    methods: component.script.scriptSetupContent.functions,
    execute: createInTemplateExecuter({
      props: staticProps,
      dynamicProps,
      slots,
      methods: component.script.scriptSetupContent.functions
    })
  }
}

export type CompilerContext = ReturnType<typeof createCompilerContext>
