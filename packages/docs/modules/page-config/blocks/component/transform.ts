import { defineBlockTransform } from "../../compiler/define-block-transform";

export default defineBlockTransform(async function (block) {
  if (block.type !== 'component') { return }

  const importName = block.args[0].slice(1, -1)
  const importPath = (await this.importer.resolveRelativePath(`./components/${importName}`))!
  const importComponent = this.importer.importDefault(importName, importPath)

  return block.replaceArgCode(0, importComponent)
})
