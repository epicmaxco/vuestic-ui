import { MagicString } from "@vue/compiler-sfc"
import { parse } from "acorn"
import { CompilerContext } from "../create-compiler-context"
import { onAccess } from './js-ast'

const stringifyValue = (value: unknown) => {
  const str =  JSON.stringify(value)

  if (str.startsWith('"') && str.endsWith('"')) {
    return `'${str.slice(1, -1).replace(/'/g, "\\'")}'`
  }

  return
}

/** Simplify code is a compile-time optimization if component can not be fully compiled. It will optimize code used in template and replace static values if possible */
export const simplifyCode = (code: string, ctx: CompilerContext) => {
  const codeString = new MagicString(code)
  const ast = parse(code, { ecmaVersion: 2020 })

  onAccess(ast.body[0], codeString, (node, parent) => {
    if (!('name' in node) || typeof node.name !== 'string') {
      console.warn('Unable to parse expression', code, 'Invalid node', node)
      return
    }

    if (parent && parent.type === 'CallExpression') {
      ctx.imports.push(node.name)
    }

    if (node.name === '$props') {
      codeString.overwrite(node.start, node.end + 1, '')

      if (parent.type === 'MemberExpression') {
        node = parent.property
      } else {
        return
      }
    }

    const dynamicProp = ctx.dynamicProps.find((p) => p.name === node.name)

    if (dynamicProp) {
      codeString.overwrite(node.start, node.end, dynamicProp.value)
      return
    }

    const staticProp = ctx.props.find((p) => p.name === node.name)
    if (staticProp) {
      // Do not render quotes around in ${} in template literals
      if (codeString.original[node.start - 2] === '$' && codeString.original[node.start - 1] === '{' && codeString.original[node.end] === '}') {
        codeString.overwrite(node.start - 2, node.end + 1, staticProp.value!)
        return
      }

      const value = stringifyValue(staticProp.value)

      if (!value) {
        // TODO: Maybe prop is required
        console.warn('Unable to find prop value', staticProp, value)
        return
      }

      codeString.overwrite(node.start, node.end, value)
      return
    }

    const name = node.name

    if (name in ctx.component.script.scriptSetupMeta.variables) {
      const simplified = simplifyCode(ctx.component.script.scriptSetupMeta.variables[name], ctx)

      codeString.overwrite(node.start, node.end, simplified)
    }
  })

  return codeString.toString()
}
