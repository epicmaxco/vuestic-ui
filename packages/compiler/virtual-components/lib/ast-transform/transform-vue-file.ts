import { MagicString, parse as parseVue } from '@vue/compiler-sfc'
import { VirtualComponent } from "../create-virtual-component";
import { walkTags } from '../../compiler/walk'
import { transformAstNode } from './transform-node';
import { renderTemplateAst } from './render/render-template-ast';
import { getNodeIndent, addIndent} from './render/indent'

export const transformVue = (source: string, virtualComponents: VirtualComponent[]) => {
  const templateAst = parseVue(source).descriptor.template?.ast

  if (!templateAst) {
    throw new Error('No template found in component while transforming vue file')
  }

  let sourceString = new MagicString(source)

  walkTags(templateAst, (node) => {
    const componentName = node.tag
    const component = virtualComponents.find((c) => c.name === componentName)

    if (!component) { return }

    const intend = getNodeIndent(node, source)

    const newTemplate = transformAstNode(node, component)
    const newTemplateString = addIndent(renderTemplateAst(newTemplate), intend)

    sourceString.overwrite(
      node.loc.start.offset,
      node.loc.end.offset,
      newTemplateString
    )
  })

  return sourceString
}
