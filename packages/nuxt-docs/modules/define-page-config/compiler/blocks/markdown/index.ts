import { defineCompileBlockFn, createImporter } from '../defineCompileBlockFn'
import { renderBlock } from '../../render'

export type PageConfigMarkdown = (content: string) => {
  type: 'markdown'
  content: string
}

export const compileMarkdownBlock = defineCompileBlockFn<PageConfigMarkdown>((code, block, path) => {
  const name = block.args[0].slice(1, -1)

  const importer = createImporter()

  const newBlock = renderBlock('markdown', {
    content: block.args[0],
  })

  return {
    code: importer.imports + code.replaceAll(block.code, newBlock),
  }
})
