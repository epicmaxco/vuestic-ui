import { MagicString, parse as parseVue } from '@vue/compiler-sfc'
import { VirtualComponent } from "../create-virtual-component";
import { walkTags } from './walk'
import { transformAstNode } from './transform-node';
import { renderTemplateAst } from './render/render-template-ast';
import { getNodeIndent, addIndent} from './render/indent'
import { VirtualComponentError } from '../errors'
import { createSourceFileContext, CompilerSourceFileContext } from '../create-compilation-context/create-source-file-context'

const transformNestedComponents = (source: string, virtualComponents: VirtualComponent[], ctx: CompilerSourceFileContext) => {
  let sourceString = new MagicString(`<template>${source}</template>`)

  const parseResult = parseVue(sourceString.toString())
  const templateAst = parseResult.descriptor.template?.ast

  if (!templateAst) {
    throw new VirtualComponentError('No template found in component while transforming nested virtual components')
  }

  const globalImports = [] as string[]

  walkTags(templateAst, (node) => {
    const componentName = node.tag
    const component = virtualComponents.find((c) => c.name === componentName)

    if (!component) { return }

    const intend = getNodeIndent(node, sourceString.toString())

    const { ast, imports } = transformAstNode(node, component, ctx)
    const newTemplateString = addIndent(renderTemplateAst(ast), intend)

    const { code, imports: nestedImports } = transformNestedComponents(newTemplateString, virtualComponents, ctx)

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
    throw new VirtualComponentError('No template found in component while transforming vue file')
  }

  if (sfcParseResult.errors.length > 0) {
    throw new VirtualComponentError(sfcParseResult.errors.map((e) => e.toString()).join('\n'))
  }

  let sourceString = new MagicString(source)
  let fileImports = [] as string[]

  const ctx = createSourceFileContext(sfcParseResult.descriptor)

  walkTags(templateAst, (node) => {
    const componentName = node.tag
    const component = virtualComponents.find((c) => c.name === componentName)

    if (!component) { return }

    const intend = getNodeIndent(node, source)

    try {
      const { ast, imports } = transformAstNode(node, component, ctx)
      const newTemplateString = addIndent(renderTemplateAst(ast), intend)

      const { code, imports: nestedImports } = transformNestedComponents(newTemplateString, virtualComponents, ctx)

      sourceString.overwrite(
        node.loc.start.offset,
        node.loc.end.offset,
        code.toString()
      )

      fileImports.push(imports.map((i) => `import { ${i} } from 'virtual-components:${component.name}'`).join('\n'))
      fileImports.push(...nestedImports)
    } catch (e) {
      throw new VirtualComponentError(`Error while using ${componentName}: ${typeof e === 'object' && e !== null && 'message' in e ? e.message : e}`)
    }
  })

  fileImports = fileImports.filter((i) => i.length > 0)
  fileImports = [...new Set(fileImports)]

  if (fileImports.length > 0) {
    if (sfcParseResult.descriptor.script) {
      const start = sfcParseResult.descriptor.script.loc.start.offset

      sourceString.appendLeft(start, fileImports.join('\n') + '\n')
    } else {
      const lang = sfcParseResult.descriptor.scriptSetup?.lang ? ` lang="${sfcParseResult.descriptor.scriptSetup.lang}"` : ''
      sourceString.prepend(`<script${lang}>\n${fileImports.join('\n') + '\n'}</script>\n\n`)
    }
  }

  return sourceString
}
