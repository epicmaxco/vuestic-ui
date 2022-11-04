import type { ParsedBlock } from "../parse"

type CompileBlockFn = (code: string, block: ParsedBlock, parentPath: string) => {
  code: string,
  files?: string[]
}

export const defineCompileBlockFn = (cb: CompileBlockFn) => cb