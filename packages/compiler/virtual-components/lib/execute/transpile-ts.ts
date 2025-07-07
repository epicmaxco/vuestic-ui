import ts from 'typescript'

export const transpileTs = (code: string) => {
  return ts.transpileModule(code, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      strict: false,
    },
  })
}
