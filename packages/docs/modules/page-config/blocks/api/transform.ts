import kebabCase from 'lodash/kebabCase';
import { readFile } from 'fs/promises';
import { defineBlockTransform } from "../../compiler/define-block-transform";
import { CssVariables } from "./types";
import { type ComponentMeta } from 'vue-component-meta';

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

const readFileSafe = async (path: string | undefined) => {
  if (!path) { return '' }
  return (await readFile(path, 'utf-8')).toString()
}

const stringifyMeta = (meta: ComponentMeta) => {
  return JSON.stringify({
    props: meta.props
      .filter((prop) => !prop.global)
      .sort((prop1, prop2) => Number(prop1.required) > Number(prop2.required) ? -1 : 1)
      .reduce((acc, prop) => ({
        ...acc,
        [kebabCase(prop.name)]: ({
          types: prop.type.replace(' | undefined', ''),
          default: prop.default,
          required: prop.required,
        })
      }), {}),
    slots: meta.slots.reduce((acc, slot) => ({
      ...acc,
      [slot.name]: ({
        types: slot.type
      })
    }), {}),
    events: meta.events.reduce((acc, event) => ({
      ...acc,
      [event.name]: ({
        types: event,
      })
    }), {}),
    methods: {},
    // TODO: We need to use exposed in components before
    // methods: meta.exposed
    //   .filter((method) => /^\(.*\)\s?=>.*$/.test(method.type))
    //   .reduce((acc, method) => ({
    //     ...acc,
    //     [method.name]: ({
    //       types: method.type,
    //     }),
    //   }), {})
  })
}

const transformChangeLog = (changeLog: string) => {
  const version = changeLog
    .trim()
    .split('#')
    .filter(Boolean)
    .map((s) => s.split('\n'))

  return version.map((v) => ({
    version: v[0].trim(),
    changes: v.slice(1).map((s) => s.trim().slice(2)),
  }))
}

export default defineBlockTransform(async function (block) {
  if (block.type !== 'api') { return }

  const importName = block.args[0].slice(1, -1)
  const importPath = (await this.importer.resolveAbsolutePath('vuestic-ui'))!
  const importComponent = this.importer.importNamed(importName, importPath)

  const cssVariablesPath = await this.importer.resolveAbsolutePath(`vuestic-ui/src/components/${kebabCase(importName)}/_variables.scss`)
  const cssVariablesFile = await readFileSafe(cssVariablesPath)
  const cssVariables = JSON.stringify(parseCssVariables(cssVariablesFile))

  const changelogPath = await this.importer.resolveAbsolutePath(`vuestic-ui/src/components/${kebabCase(importName)}/CHANGELOG.md`)
  const changelogContent = await readFileSafe(changelogPath)

  return block.replaceArgCode(0, `'${importName}', ${importComponent}, ${cssVariables}, ${JSON.stringify(transformChangeLog(changelogContent))}`)
})
