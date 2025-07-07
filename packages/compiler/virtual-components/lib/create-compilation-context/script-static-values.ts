import { SFCDescriptor, compileScript } from "@vue/compiler-sfc";

import { walkScriptAst } from "../ast-transform/walk";
import { Identifier, VariableDeclaration } from "acorn";
import { VirtualComponentError } from "../errors";
import { execute, executeWithContext } from "../execute/execute";

const isVariableDeclaration = (node: any): node is VariableDeclaration => {
  return node.type === 'VariableDeclaration'
}

const isIdentifier = (node: any): node is Identifier => {
  return node.type === 'Identifier'
}

/** Here we extract consts and methods available during compilation from parent */
export const extractScriptStaticValues = (sfcDescriptor: SFCDescriptor) => {
  if (!sfcDescriptor.scriptSetup) {
    return { variables: {} }
  }

  const script = compileScript(sfcDescriptor, { id: 'test' })

  if (!script.scriptSetupAst) {
    return { variables: {} }
  }

  const source = script.loc.source

  const variables = {} as Record<string, string>

  script.scriptSetupAst.forEach((node) => {
    walkScriptAst(node as any, (node) => {
      if (isVariableDeclaration(node) && node.kind === 'const') {
        const dec = node as VariableDeclaration
        if (dec.declarations.length > 1) {
          throw new VirtualComponentError('Only one variable declaration is supported in virtual components')
        }

        const declarator = dec.declarations[0]

        if (!declarator.init) {
          return
        }

        if (!isIdentifier(declarator.id)) {
          return
        }

        const name = declarator.id.name
        const value = source.slice(declarator.init.start, declarator.init.end)

        variables[name] = String(value)
      }
    })
  })

  const prevConsts = [] as string[]

  Object.keys(variables).forEach((key) => {
    try {
      const code = prevConsts.join('\n') + '\n' + variables[key]
      variables[key] = execute(code)
      prevConsts.push(`const ${key} = ${code}`)
    } catch (e) {
      delete variables[key]
    }
  })

  return {
    variables
  }
}
