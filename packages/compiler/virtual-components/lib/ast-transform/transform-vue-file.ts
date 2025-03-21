import { MagicString, parse as parseVue } from '@vue/compiler-sfc'
import { VirtualComponent } from "../create-virtual-component";
import { walkTags } from './walk'
import { transformAstNode } from './transform-node';
import { renderTemplateAst } from './render/render-template-ast';
import { getNodeIndent, addIndent} from './render/indent'

const transformNestedComponents = (source: string, virtualComponents: VirtualComponent[]) => {
  let sourceString = new MagicString(`<template>${source}</template>`)

  const templateAst = parseVue(sourceString.toString()).descriptor.template?.ast

  if (!templateAst) {
    throw new Error('No template found in component while transforming nested virtual components')
  }

  const globalImports = [] as string[]

  walkTags(templateAst, (node) => {
    const componentName = node.tag
    const component = virtualComponents.find((c) => c.name === componentName)

    if (!component) { return }

    const intend = getNodeIndent(node, sourceString.toString())

    const { ast, imports } = transformAstNode(node, component)
    const newTemplateString = addIndent(renderTemplateAst(ast), intend)

    const { code, imports: nestedImports } = transformNestedComponents(newTemplateString, virtualComponents)

    sourceString.overwrite(
      node.loc.start.offset,
      node.loc.end.offset,
      code.toString()
    )

    globalImports.push(imports.map((i) => `import { ${i} } from 'virtual-components:${component.name}'`).join('\n'))
    globalImports.push(...nestedImports)
  })

  return {
    code:  sourceString.toString().slice('<template>'.length, -'</template>'.length),
    imports: globalImports
  }
}

export const transformVue = (source: string, virtualComponents: VirtualComponent[]) => {
  const sfcParseResult = parseVue(source)
  const templateAst = sfcParseResult.descriptor.template?.ast

  if (!templateAst) {
    throw new Error('No template found in component while transforming vue file')
  }

  let sourceString = new MagicString(source)
  let fileImports = [] as string[]

  walkTags(templateAst, (node) => {
    const componentName = node.tag
    const component = virtualComponents.find((c) => c.name === componentName)

    if (!component) { return }

    const intend = getNodeIndent(node, source)

    try {
      const { ast, imports } = transformAstNode(node, component)
      const newTemplateString = addIndent(renderTemplateAst(ast), intend)

      const { code, imports: nestedImports } = transformNestedComponents(newTemplateString, virtualComponents)

      sourceString.overwrite(
        node.loc.start.offset,
        node.loc.end.offset,
        code.toString()
      )

      fileImports.push(imports.map((i) => `import { ${i} } from 'virtual-components:${component.name}'`).join('\n'))
      fileImports.push(...nestedImports)
    } catch (e) {
      throw new Error(`Error transforming component ${component.name}: ${e}`)
    }
  })

  fileImports = fileImports.filter((i) => i.length > 0)
  fileImports = [...new Set(fileImports)]

  if (fileImports.length > 0) {
    if (sfcParseResult.descriptor.script) {
      const start = sfcParseResult.descriptor.script.loc.start.offset

      sourceString.appendLeft(start, fileImports.join('\n') + '\n')
    } else {
      const lang = sfcParseResult.descriptor.scriptSetup?.lang ? `lang="${sfcParseResult.descriptor.scriptSetup.lang}"` : ''
      sourceString.prepend(`<script ${lang}>\n${fileImports.join('\n') + '\n'}</script>\n\n`)
    }
  }

  return sourceString
}
