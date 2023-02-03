import { defineBlockTransform } from "../../compiler/define-block-transform";
import { extname } from 'path'

export default defineBlockTransform(async function (block) {
  if (block.type !== 'file') { return }

  const importName = block.args[0].slice(1, -1)
  const importPath = (await this.importer.resolveAbsolutePath(`${importName}`))!
  const importComponent = this.importer.importDefault('file', `${importPath}?raw`)
  const importExt = block.args[1] || `'${extname(importPath).slice(1)}'`

  return block.replaceArgCode(0, `${importComponent}, ${importExt}`)
})
