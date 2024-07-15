import type { HTMLRootNode, HTMLElementNode, HTMLContentNode } from "./parseSource";

export const printSource = (source: HTMLRootNode | HTMLElementNode | HTMLContentNode) => {
  let tabSize = 0

  const printTabs = () => ' '.repeat(tabSize)

  const print = (node: HTMLRootNode | HTMLElementNode) => {
    let result = ''

    for (const child of node.children) {
      if ('text' in child) {
        result += child.text.split('\n').filter((line) => line.trim() !== '').map((line) => printTabs() + line.trim()).join('\n') + '\n'
      } else {
        result += printTabs() + `<${child.tag}`

        const attributesCount = Object.keys(child.attributes).length

        if (attributesCount === 1) {
          const [key, value] = Object.entries(child.attributes)[0]

          if (value === null) {
            result += ` ${key}`
          } else {
            result += ` ${key}="${value}"`
          }
        } else if (attributesCount > 1) {
          result += '\n'
          tabSize += 2
          for (const [key, value] of Object.entries(child.attributes)) {
            if (value === null) {
              result += printTabs() + ` ${key}`
            } else {
              result += printTabs() + ` ${key}="${value}"`
            }
            result += '\n'
          }
          tabSize -= 2
          result += printTabs()
        }

        if (child.children.length === 0) {
          if (attributesCount <= 1) {
            result += ' '
          }
          result += '/>\n'
          continue
        }

        result += '>\n'

        tabSize += 2
        result += printTabs() + print(child).trim()
        tabSize -= 2
        result += '\n' + printTabs() + `</${child.tag}>\n`
      }
    }

    return result
  }

  if (source.type === 'content') {
    return source.text
  }

  return print(source)
}
