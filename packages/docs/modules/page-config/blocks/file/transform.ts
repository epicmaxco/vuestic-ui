import { defineBlockTransform } from "../../compiler/define-block-transform";
import { extname } from 'pathe'
import { readFile } from 'fs/promises'

export default defineBlockTransform(async function (block) {
  if (block.type !== 'file') { return }

  const importName = block.args[0].slice(1, -1)
  const importPath = (await this.importer.resolveAbsolutePath(`${importName}`))

  if (!importPath) {
    throw new Error(`Cannot find file ${importName}`)
  }

  const content = (await readFile(importPath, 'utf-8')).toString()
  const contentEscaped = JSON.stringify(content)
  const importExt = block.args[1] || `'${extname(importPath).slice(1)}'`

  return block.replaceArgCode(0, `${contentEscaped}, ${importExt}`)
})
