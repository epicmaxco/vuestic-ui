import { compileScript, MagicString, SFCDescriptor } from '@vue/compiler-sfc'
import { Node, VariableDeclaration, FunctionDeclaration, Identifier } from 'acorn'
import { transpileTs } from '../execute/transpile-ts'
import { VirtualComponentError } from '../errors'
import { walkScriptAst } from '../ast-transform/walk'

export type ScriptSetupContext = {

} & Record<string, any>

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const prefixFunctionName = (name: string, prefix: string) => {
  return prefix + capitalize(name)
}

export const createScriptSetupMeta = (scriptSetup: SFCDescriptor, componentName: string) => {
  if (!scriptSetup.scriptSetup) {
    return {
      functions: [],
      variables: {},
    }
  }

  const script = compileScript(scriptSetup, { id: 'test' })

  if (!script.scriptSetupAst) {
    return {
      functions: [],
      variables: {},
    }
  }

  const source = scriptSetup.scriptSetup?.content ?? ''

  const variables = {} as Record<string, string>

  const functions = [] as {
    name: string,
    originalName: string,
    source: string,
    originalSource: string
  }[]

  const fnPrefix = 'vc' + componentName

  const addFn = (id: Identifier, node: Node) => {
    const originalName = id.name
    const name = prefixFunctionName(originalName, fnPrefix)

    const ms = new MagicString(source)
    ms.overwrite(id.start, id.end, name)

    functions.push({
      name,
      originalName,
      source: transpileTs(ms.slice(node.start, node.end)).outputText,
      originalSource: source.slice(node.start, node.end)
    })
  }

  script.scriptSetupAst.forEach((node) => {
    walkScriptAst(node as any, (node) => {
      if (node.type === 'FunctionDeclaration') {
        const id = (node as FunctionDeclaration).id
        const name = id.name

        addFn(id, node)
      }
      if (node.type === 'VariableDeclaration') {
        const dec = node as VariableDeclaration
        if (dec.declarations.length > 1) {
          throw new VirtualComponentError('Only one variable declaration is supported in virtual components')
        }

        if (dec.declarations[0].init?.type === 'ArrowFunctionExpression') {
          if (dec.declarations[0].id.type !== 'Identifier') {
            throw new VirtualComponentError('Only identifier declarations are supported. No destructuring in virtual components')
          }

          const id = dec.declarations[0].id

          addFn(id, node)
        } else if (node) {
          if (dec.declarations[0].id.type !== 'Identifier') {
            // pass
          } else {
            const name = dec.declarations[0].id.name
            const init = dec.declarations[0].init
            if (!init) {
              return
            }
            const value = source.slice(init.start, init.end)
            variables[name] = String(value)
          }
        }
      }
    })
  })

  return {
    functions,
    variables,
  }
}
