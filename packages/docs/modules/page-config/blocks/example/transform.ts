import { defineBlockTransform } from "../../compiler/define-block-transform";

export default defineBlockTransform(async function (block) {
  if (block.type !== 'example') { return }

  const importName = block.args[0].slice(1, -1)
  const importPath = (await this.importer.resolveRelativePath(`./examples/${importName}`))!
  const importComponent = this.importer.importDefault(importName, importPath)
  const importSource = this.importer.importDefault(importName, `${importPath}?raw`)
  const path = /page-config\/.*$/.exec(importPath)?.[0]

  return block.replaceArgCode(0, `${importComponent}, ${importSource}, "${path}"`)
})
