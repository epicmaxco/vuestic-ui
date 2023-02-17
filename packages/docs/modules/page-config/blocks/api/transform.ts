import { defineBlockTransform } from "../../compiler/define-block-transform";

export default defineBlockTransform(async function (block) {
  if (block.type !== 'api') { return }

  const importName = block.args[0].slice(1, -1)
  const importPath = (await this.importer.resolveAbsolutePath('vuestic-ui'))!
  const importComponent = this.importer.importNamed(importName, importPath)

  return block.replaceArgCode(0, `'${importName}', ${importComponent}`)
})
