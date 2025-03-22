import { ElementNode, DirectiveNode, NodeTypes } from "@vue/compiler-core"
import { VirtualComponent } from "../../create-virtual-component"
import { VirtualComponentError } from "../../errors"
import { isPropAttribute, toCamelCase, isPropDirective } from "../../utils"

export type NodeContextProps = { name: string, rawName: string, value: string | undefined }[]
export type NodeContextAttrs = { name: string, value: string }[]
export type NodeContextDirectives = DirectiveNode[]

export const createNodeContextProps = (node: ElementNode, component: VirtualComponent) => {
  const staticProps = [] as NodeContextProps
  const dynamicProps = [] as NodeContextProps
  const staticAttrs = [] as NodeContextAttrs
  const dynamicAttrs = [] as NodeContextAttrs

  const definedProps = component.script.scriptSetup?.props ?? {}
  const definedPropsNames = Object.keys(definedProps)

  const directives = [] as NodeContextDirectives

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
          const value = prop.exp.content

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
