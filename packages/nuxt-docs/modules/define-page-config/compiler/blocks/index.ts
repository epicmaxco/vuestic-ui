import { compileParagraphBlock } from './paragraph/index';
import { compileTitleBlock } from './title/index';
import { ParsedBlock } from '../parse';
import { compileComponentBlock } from './component'
import { compileExampleBlock } from './example'
import { compileCodeBlock } from './code'
import { compileMarkdownBlock } from './markdown'
import { compileSubtitleBlock } from './subtitle';
import { compileFileStructureBlock } from './file-structure';
import { compileAlertBlock } from './alert';
import { compileFileBlock } from './file';

export const blockCompilers = {
  component: compileComponentBlock,
  example: compileExampleBlock,
  code: compileCodeBlock,
  markdown: compileMarkdownBlock,
  title: compileTitleBlock,
  subtitle: compileSubtitleBlock,
  paragraph: compileParagraphBlock,
  fileStructure: compileFileStructureBlock,
  alert: compileAlertBlock,
  file: compileFileBlock,
}

export const compileBlocks = (code: string, parsedBlocks: ParsedBlock[], parentPath: string) => {
  const files: string[] = []

  parsedBlocks.forEach(block => {
    const compiler = blockCompilers[block.type as keyof typeof blockCompilers]

    if (!compiler) {
      throw new Error(`Block compiler for type "${block.type}" not found`)
    }

    const { code: newCode, files: newFiles } = compiler(code, block, parentPath)

    code = newCode

    if (newFiles) {
      files.push(...newFiles)
    }
  })
  return {
    code,
    files,
  }
}

export * from './types'
