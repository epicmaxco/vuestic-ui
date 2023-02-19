import kebabCase from 'lodash/kebabCase';
import { readFile } from 'fs/promises';
import { defineBlockTransform } from "../../compiler/define-block-transform";
import { CssVariables } from "./types";

const parseCssComment = (line: string) => 
  (line.match(/\/\/(.*)|\/\*(.*)\*\//) || []).slice(1).filter((s) => Boolean(s)).join('').trim()
const parseCssVariables = (css: string | undefined): CssVariables => {
  if (!css) { return [] }

  const lines = css.split('\n')
  const variables: CssVariables = []

  lines.forEach((line, index, lines) => {
    const variable = (line.match(/(--va-.*)?:(.*)?;/) || []).slice(1)

    if (variable.length) {
      const comment = parseCssComment(lines[index - 1] || '')
      if (!variable[0] || !variable[1]) { return }
      variables.push([variable[0], variable[1], comment])
    }
  })
  
  return variables
}

const readCssVariables = async (path: string | undefined) => {
  if (!path) { return '' }
  return (await readFile(path, 'utf-8')).toString()
}

export default defineBlockTransform(async function (block) {
  if (block.type !== 'api') { return }

  const importName = block.args[0].slice(1, -1)
  const importPath = (await this.importer.resolveAbsolutePath('vuestic-ui'))!
  const importComponent = this.importer.importNamed(importName, importPath)

  const cssVariablesPath = await this.importer.resolveAbsolutePath(`vuestic-ui/src/components/${kebabCase(importName)}/_variables.scss`)
  const cssVariablesFile = await readCssVariables(cssVariablesPath)
  const cssVariables = JSON.stringify(parseCssVariables(cssVariablesFile))

  return block.replaceArgCode(0, `'${importName}', ${importComponent}, ${cssVariables}`)
})
