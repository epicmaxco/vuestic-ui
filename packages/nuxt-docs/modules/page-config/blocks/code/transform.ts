import { defineBlockTransform } from '../../compiler/define-block-transform';
import escodegen from 'escodegen'
import { ObjectExpression, Property, Literal } from 'estree'

const isObjectExpression = (node: any): node is ObjectExpression => node.type === 'ObjectExpression'

export default defineBlockTransform(async function (block) {
  if (block.type !== 'code') { return }

  // If it is a string, try to resolve relative path and change the first argument to resolved path
  if (block.argNodes[0].type === 'Literal') {
    const importName = block.args[0].slice(1, -1)
    const importPath = (await this.importer.resolveRelativePath(`./code/${importName}`))

    if (importPath) {
      const importedVariable = this.importer.importDefault(importName, `${importPath}?raw`)

      return block.replaceArgCode(0, `${importedVariable}`)
    }
  }

  // If it is an object, go trough it properties and change their each value to import identifier
  if (isObjectExpression(block.argNodes[0])) {
    for (const prop of block.argNodes[0].properties as Property[]) {
      const importName = (prop.value as Literal).value as string
      const importPath = (await this.importer.resolveRelativePath(`./code/${importName}`))

      if (importPath) {
        const importedVariable = this.importer.importDefault(importName, `${importPath}?raw`)

        ;(prop as Property).value = { name: importedVariable, type: 'Identifier' }
      }
    }

    return block.replaceArgCode(0, escodegen.generate(block.argNodes[0]))
  }
})
