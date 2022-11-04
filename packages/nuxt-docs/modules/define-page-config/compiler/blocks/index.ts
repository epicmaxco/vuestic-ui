import { ParsedBlock } from '../parse';
import { compileComponentBlock } from './component'
import { compileExampleBlock } from './example'

export const blockCompilers = {
  component: compileComponentBlock,
  example: compileExampleBlock,
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