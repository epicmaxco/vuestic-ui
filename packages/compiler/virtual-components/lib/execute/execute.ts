import { MagicString } from '@vue/compiler-sfc'
import { parse, Node, Statement, ModuleDeclaration, MemberExpression, TemplateLiteral} from 'acorn'
import { CompilerContext } from '../create-compiler-context'

export const execute = (code: string) => {
  try {
    return (0, eval)(code)
  } catch (e) {
    return null
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

  const str =  JSON.stringify(value)

  if (str.startsWith('"') && str.endsWith('"')) {
    return `'${str.slice(1, -1)}'`
  }

  return
}

const onAccess = (node: any, codeString: MagicString, cb: (node: any) => void) => {
  if (node.type === 'PropertyAccessExpression') {
    return cb(node)
  }
  if (node.type === 'Identifier') {
    return cb(node)
  }

  if (node.type === 'CallExpression') {
    node.arguments.forEach((arg: any) => {
      onAccess(arg, codeString, cb)
    })
    return onAccess(node.callee, codeString, cb)
  }

  if ('children' in node) {
    for (const child of node.children) {
      onAccess(child, codeString, cb)
    }
  }

  if ('expressions' in node) {
    for (const expression of node.expressions) {
      onAccess(expression, codeString, cb)
    }
  }

  if ('expression' in node) {
    onAccess(node.expression, codeString, cb)
  }

  if ('left' in node) {
    onAccess(node.left, codeString, cb)
  }

  if ('right' in node) {
    onAccess(node.right, codeString, cb)
  }

  if ('object' in node) {
    onAccess(node.object, codeString, cb)
  }

  if ('elements' in node) {
    for (const element of node.elements) {
      onAccess(element, codeString, cb)
    }
  }
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

export const simplifyCode = (code: string, ctx: CompilerContext) => {
  const codeString = new MagicString(code)
  const ast = parse(code, { ecmaVersion: 2020 })

  onAccess(ast.body[0], codeString, (node) => {
    // if (ctx.component.script.scriptSetupContent.functionNames.includes(node.name)) {
    //   ctx.imports.push(node.name)
    // }

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
  })

  return codeString.toString()
}
