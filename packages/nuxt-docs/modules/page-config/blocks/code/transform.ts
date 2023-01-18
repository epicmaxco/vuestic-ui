import { defineBlockTransform } from '../../compiler/define-block-transform';
// import { Property } from 'acorn'
import generate from 'escodegen'

export default defineBlockTransform(async function (block) {
  if (block.type !== 'code') { return }

  if (block.argNodes[0].type === 'Literal') {
    const importName = block.args[0].slice(1, -1)
    const importPath = (await this.importer.resolveRelativePath(`./code/${importName}`))

    if (importPath) {
      const importedVariable = this.importer.importDefault(importName, `${importPath}?raw`)

      return block.replaceArgCode(0, `${importedVariable}`)
    }
  }

  if (block.argNodes[0].type === 'ObjectExpression') {
    let code = ''
    for (const prop of (block.argNodes[0] as any).properties) {
      const importName = (prop as any).value.value
      const importPath = (await this.importer.resolveRelativePath(`./code/${importName}`))

      if (importPath) {
        const importedVariable = this.importer.importDefault(importName, `${importPath}?raw`)

        prop.value = importedVariable
      }
    }
    return code
  }
})
