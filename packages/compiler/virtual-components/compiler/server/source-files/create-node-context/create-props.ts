import { ElementNode, DirectiveNode, NodeTypes } from "@vue/compiler-core"
import { isPropAttribute, isPropDirective } from "../../../ultis/ast-helpers"
import { camelize } from 'vue'
import { VirtualComponent } from "../../../virtual-component/types"
import { VirtualComponentBinding, VirtualComponentBindingSource } from "../../../virtual-component/script-render-function/create-script-bindings"

export type NodeContextProps = { name: string, rawName: string, value: string | undefined }[]
export type NodeContextAttrs = { name: string, value: string }[]
export type NodeContextDirectives = DirectiveNode[]

export const createNodeContextProps = (node: ElementNode, component: VirtualComponent) => {
  const staticProps = [] as NodeContextProps
  const dynamicProps = [] as NodeContextProps
  const staticAttrs = [] as NodeContextAttrs
  const dynamicAttrs = [] as NodeContextAttrs

  const definedProps = Object.keys(component.bindings).reduce((acc, key) => {
    const bind = component.bindings[key]

    if (bind.source === VirtualComponentBindingSource.Prop) {
      acc[key] = bind
    }

    return acc
  }, {} as Record<string, VirtualComponentBinding>)
  const definedPropsNames = Object.keys(definedProps)

  const directives = [] as NodeContextDirectives

  node.props.forEach((prop) => {
    if (isPropAttribute(prop)) {
      if (definedProps[prop.name]) {
        staticProps.push({
          name: camelize(prop.name),
          rawName: prop.name,
          value: prop.value?.content ?? definedProps[prop.name].default
        })
      } else {
        staticAttrs.push({
          name: camelize(prop.name),
          value: prop.value?.content ?? 'true'
        })
      }
    }

    if (isPropDirective(prop)) {
      if (prop.name === 'bind' && prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION && prop.exp?.type === NodeTypes.SIMPLE_EXPRESSION) {
        const name = camelize(prop.arg.content)

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
        throw new Error('Unable to create props. Unsupported directive ' + prop.name + ' in ' + node.loc.source)
      }
    }
  })

  definedPropsNames.forEach((propName) => {
    const exists = staticProps.find((prop) => prop.name === propName)

    if (!exists) {
      staticProps.push({
        name: camelize(propName),
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
