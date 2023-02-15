import { parseCode } from './parse';
import { Importer } from './create-importer'
import api from '../blocks/api/transform'
import code from '../blocks/code/transform'
import component from '../blocks/component/transform'
import example from '../blocks/example/transform'
import file from '../blocks/file/transform'


const transformers = [
  api,
  code,
  component,
  example,
  file,
]

export const transform = async (code: string, importer: Importer) => {
  const blocks = parseCode(code)

  const ctx = {
    importer
  }

  for (const block of blocks) {
    for (const transform of transformers) {
      try {
        code = (await transform.call(ctx, block)) || code
      } catch (e: any) {
        throw new Error(`Error transforming block: ${block.type}\n${e.message}`)
      }
    }
  }

  return code
}
