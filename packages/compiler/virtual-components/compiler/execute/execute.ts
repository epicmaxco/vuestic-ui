import { MagicString } from '@vue/compiler-sfc'
import { parse, Node, Statement, ModuleDeclaration, MemberExpression, TemplateLiteral} from 'acorn'
import { onAccess } from './js-ast'

export const execute = (code: string) => {
  return (0, eval)(code)
}
/** Add _ctx to Identifier if it is not in property access */
const add_ctx = (node: any, codeString: MagicString, ignore: string[]) => {
  onAccess(node, codeString, (node) => {
    if (node.type === 'Identifier' && ignore.includes(node.name)) {
      return
    }

    if (node.type === 'PropertyAccessExpression' && node.object.type === 'Identifier' && ignore.includes(node.object.name)) {
      return
    }

    codeString.appendLeft(node.start, '_ctx.')
  })
}

/** Add _ctx to all variables used */
export const addContext = (code: string, ignore: string[] = []) => {
  const codeString = new MagicString(code)
  const ast = parse(code, { ecmaVersion: 2020 })

  add_ctx(ast.body[0], codeString, ignore)

  return codeString.toString()
}

export const executeWithContext = (code: string, ctx: any) => {
  const fnCode = `((_ctx) => {
    return (() => ${addContext(code)})()
  })
  `

  const fn = execute(fnCode) as (_ctx: any) => any

  return fn(ctx)
}

