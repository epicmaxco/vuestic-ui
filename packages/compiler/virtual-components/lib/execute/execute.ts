import { MagicString } from '@vue/compiler-sfc'
import { parse, Node, Statement, ModuleDeclaration, MemberExpression, TemplateLiteral} from 'acorn'

export const execute = (code: string) => {
  try {
    return (0, eval)(code)
  } catch (e) {
    // throw new Error(`Failed to execute code: ${code}`)
  }
}

const walk = (node: Node | Statement | ModuleDeclaration, cb: (node: Node) => void) => {
  cb(node)
  if ('expression' in node && node.type === 'ExpressionStatement') {
    walk(node.expression, cb)
  }
  if ('left' in node) {
    walk(node.left, cb)
  }
  if ('right' in node) {
    walk(node.right, cb)
  }
  if ('object' in node) {
    walk(node.object, cb)
  }
  if (node.type === 'MemberExpression') {
    walk((node as MemberExpression).property, cb)
  }
  if (node.type === 'TemplateLiteral' && 'expressions' in node) {
    for (const expression of (node as TemplateLiteral).expressions) {
      walk(expression, cb)
    }
  }
}

const stringifyValue = (value: unknown) => {
  // if (value === undefined) {
  //   return 'undefined'
  // }

  return JSON.stringify(value)
}

/** Add _ctx to Identifier if it is not in property access */
const add_ctx = (node: any, codeString: MagicString) => {
  if (node.type === 'PropertyAccessExpression') {
    codeString.appendLeft(node.start, '_ctx.')
    return
  }
  if (node.type === 'Identifier') {
    codeString.appendLeft(node.start, '_ctx.')
  }

  if ('children' in node) {
    for (const child of node.children) {
      add_ctx(child, codeString)
    }
  }

  if ('expressions' in node) {
    for (const expression of node.expressions) {
      add_ctx(expression, codeString)
    }
  }

  if ('expression' in node) {
    add_ctx(node.expression, codeString)
  }

  if ('left' in node) {
    add_ctx(node.left, codeString)
  }

  if ('right' in node) {
    add_ctx(node.right, codeString)
  }

  if ('object' in node) {
    add_ctx(node.object, codeString)
  }
}

/** Add _ctx to all variables used */
export const addContext = (code: string) => {
  const codeString = new MagicString(code)
  const ast = parse(code, { ecmaVersion: 2020 })

  add_ctx(ast.body[0], codeString)

  return codeString.toString()
}

export const simplifyCode = (code: string, ctx: {
  props: { name: string, value: string | undefined }[],
  dynamicProps: { name: string, value: string }[]
}) => {
  const codeString = new MagicString(code)
  const ast = parse(code, { ecmaVersion: 2020 })

  walk(ast.body[0], (node) => {
    if (node.type === 'Identifier') {
      if (!('name' in node) || typeof node.name !== 'string') {
        console.warn('Unable to parse expression', code, 'Invalid node', node)
        return
      }

      if (node.name === '$props') {
        codeString.overwrite(node.start, node.end + 1, '')
        return
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
    }
  })

  return codeString.toString()
}
