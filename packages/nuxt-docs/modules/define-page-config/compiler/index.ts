import { parseCode } from './parse'
import { compileBlocks } from './blocks'

const removeDefinePageConfig = (code: string) => {
  return code.replace(/definePageConfig\(([\w|\W]*)\)/, '$1')
}

export async function transformPageConfig(this: any, code: string, id: string) {
  code = removeDefinePageConfig(code)

  return await compileBlocks.call(this, code, parseCode(code), id)
}
