import { execute, simplifyCode, addContext } from './execute'

const jsKeywords = [
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
  'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for',
  'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface', 'let',
]

const filterJSKeywords = (key: string) => {
  return !jsKeywords.includes(key)
}

type Scope = {
  static?: Record<string, any>,
  dynamic?: Record<string, any>
}

/** Execute code during compilation */
export const createInTemplateExecuter = <T = any>(ctx: {
  props: { name: string, value: string | undefined }[],
  dynamicProps: { name: string, value: string }[],
  slots: Record<string, any>,
  methods: string[]
}) => {
  // If dynamic props are used, we need to return the code instead of the value
  let isDynamic = false
  const _ctxObj = new Proxy({} as any, {
    get(target, key: string) {
      const dynamicProp = ctx.dynamicProps.find((prop) => prop.name === key)

      if (dynamicProp) {
        isDynamic = true
        return `${dynamicProp.value}`
      }

      const staticProp = ctx.props.find((prop) => prop.name === key)

      if (staticProp) {
        return staticProp.value
      }

      if (key in ctx.slots) {
        return '$slots.' + key
      }

      if (key === '$props') {
        return _ctxObj
      }
    }
  })

  let scopeStack = [] as Scope[]

  const codeRunner = (code: string) => {
    const scope = scopeStack.reduce((acc, scope) => {
      return {
        static: { ...acc.static, ...scope.static },
        dynamic: { ...acc.dynamic, ...scope.dynamic }
      }
    }, {})
    const fnCode = `((_ctx) => {
      ${ctx.methods.join('\n')}
      return (() => ${addContext(code)})()
    })
    `

    const newCtx = new Proxy(_ctxObj, {
      get(target, key: string) {
        if (scope.dynamic && key in scope.dynamic) {
          isDynamic = true
          return scope.dynamic[key]
        }

        if (scope.static && key in scope.static) {
          return scope.static[key]
        }

        return _ctxObj[key]
      }
    })

    isDynamic = false

    const fn = execute(fnCode) as (_ctx: any) => T
    const value = fn(newCtx) as T

    if (isDynamic) {
      return {
        value: simplifyCode(code, ctx),
        isDynamic: true as const
      }
    }

    return {
      value,
      isDynamic: false as const
    }
  }

  codeRunner.addScope = (scope: Scope) => {
    scopeStack.push(scope)
  }

  codeRunner.removeScope = (scope: Scope) => {
    scopeStack = scopeStack.filter((s) => s !== scope)
  }

  codeRunner.tryGetValue = (code: string) => {
    try {
      return execute(`(() => ${code})()`)
    } catch (e) {
      return null
    }
  }

  return codeRunner
}

export const printValueInTemplate = <T>(result: { value: T, isDynamic: boolean }, type: 'Interpolation' | 'Bind') => {
  if (result.isDynamic) {
    if (type === 'Bind') {
      return String(result.value)
    } else if (type === 'Interpolation') {
      return `{{ ${result.value} }}`
    } else {
      throw new Error(`Can not print value in template. Invalid type ${type}`)
    }
  }

  return String(result.value)
}
