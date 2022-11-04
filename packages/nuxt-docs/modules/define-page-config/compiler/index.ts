import { parseCode } from './parse'
import { compileBlocks } from './blocks'

const removeDefinePageConfig = (code: string) => {
  return code.replace(/definePageConfig\(([\w|\W]*)\)/, '$1')
}

export const transformPageConfig = (code: string, id: string) => {
  code = removeDefinePageConfig(code)

  return compileBlocks(code, parseCode(code), id)
}