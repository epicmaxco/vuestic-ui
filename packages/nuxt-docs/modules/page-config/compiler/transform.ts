import { ParsedBlock, parseCode } from './parse';
import { Importer } from './create-importer'
import code from '../blocks/code/transform'

const transformers = [
  code,
]

export const transform = async (code: string, importer: Importer) => {
  const blocks = parseCode(code)

  const ctx = {
    importer
  }

  for (const block of blocks) {
    for (const transform of transformers) {
      code = (await transform.call(ctx, block)) || code
    }
  }

  return code
}
