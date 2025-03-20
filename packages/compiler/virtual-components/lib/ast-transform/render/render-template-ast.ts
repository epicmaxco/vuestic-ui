import { ElementNode, NodeTypes, RootNode, TemplateChildNode } from "@vue/compiler-core";

function tab(size: number): string {
  return ' '.repeat(size)
}

function renderTag(node: ElementNode): string {
  if (node.props.length === 0) {
    return `${node.tag}`
  }

  const props = node.props
    .map((prop) => {
      if (prop.type === NodeTypes.DIRECTIVE) {
        if (prop.name === 'bind' && prop.exp?.type === NodeTypes.SIMPLE_EXPRESSION && prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION) {
          return `:${prop.arg?.content}="${prop.exp.content}"`
        }

        if (prop.name === 'if' && prop.exp?.type === NodeTypes.SIMPLE_EXPRESSION) {
          return `${prop.rawName}="${prop.exp.content}"`
        }

        return prop.loc.source
      }

      if (!prop.value) {
        return `${prop.name}`
      }

      return `${prop.name}="${prop.value.content}"`
    })

  return `${node.tag} ${props.join(' ')}`
}

function renderElement(node: TemplateChildNode, tabsize = 0): string {
  if (node.type === NodeTypes.ELEMENT) {
    if (node.children.length === 0) {
      return tab(tabsize) + `<${renderTag(node)} />`
    }

    return tab(tabsize) + `<${renderTag(node)}>\n`
      + node.children.map((c) => {
        return renderElement(c, tabsize + 2) + '\n'
      }).join('')
      + tab(tabsize) + `</${node.tag}>`
  }

  if (node.type === NodeTypes.TEXT) {
    return tab(tabsize) + node.content.trim()
  }

  if (node.loc.source) {
    return tab(tabsize) + node.loc.source
  }

  throw new Error(`unhandled node type: ${node.type}`)
}

export const renderTemplateAst = (templateAst: RootNode) => {
  let template = ''

  templateAst.children.forEach((node) => {
    template += renderElement(node)
  })

  return template
}
