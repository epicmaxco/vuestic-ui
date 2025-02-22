import { ElementNode, ElementTypes, NodeTypes, RootNode, TemplateChildNode } from "@vue/compiler-core";

function tab(size: number): string {
  return ' '.repeat(size)
}

function renderTag(node: ElementNode): string {
  if (node.props.length === 0) {
    return `${node.tag}`
  }

  const props = node.props
    .filter((prop) => {
      return !prop.name.startsWith('$v-if')
    })
    .map((prop) => {
      if (prop.type === NodeTypes.DIRECTIVE) {
        if (prop.name === 'bind' && prop.exp?.type === NodeTypes.SIMPLE_EXPRESSION && prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION) {
          return `:${prop.arg?.content}="${prop.exp.content}"`
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

  if (node.loc.source) {
    return tab(tabsize) + node.loc.source
  }

  throw new Error(`unhandled node type: ${node.type}`)
}

export const renderTemplate = (templateAst: RootNode) => {
  let template = ''

  templateAst.children.forEach((node) => {
    template += renderElement(node)
  })

  return template
}
