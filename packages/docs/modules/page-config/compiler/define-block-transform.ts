import { ParsedBlock } from "./parse"
import { createImporter } from './create-importer'

type BlockTransformFnContext = {
  importer: ReturnType<typeof createImporter>
}

type BlockTransformFn = (this: BlockTransformFnContext, block: ParsedBlock) => Promise<string | void | undefined> | string | void | undefined

export const defineBlockTransform = (cb: BlockTransformFn) => cb
