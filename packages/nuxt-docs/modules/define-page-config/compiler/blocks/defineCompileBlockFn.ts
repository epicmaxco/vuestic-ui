import type { ParsedBlock } from "../parse"

export type CompileBlockFn<Config> = (code: string, block: ParsedBlock, parentPath: string) => {
  code: string,
  files?: string[]
}

export const defineCompileBlockFn = <T = {}>(cb: CompileBlockFn<T>) => cb

let IMPORT_STATIC_ID = 0
export const createImporter = () => {
  const imports = []

  return {
    importDefault(name: string, path: string) {
      IMPORT_STATIC_ID += 1
      imports.push(`import ${name}_${IMPORT_STATIC_ID} from '${path}';\n`)
      return `${name}_${IMPORT_STATIC_ID}`
    },
    importNamed(name: string, path: string) {
      IMPORT_STATIC_ID += 1
      imports.push(`import { ${name} } from '${path}';\n`)
      return name
    },

    get imports() {
      return imports.join('\n')
    }
  }
}
