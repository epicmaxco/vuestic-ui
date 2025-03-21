import { CompilerContext } from '../create-compiler-context'
import { VirtualComponent } from '../create-virtual-component'
import { execute, simplifyCode, addContext } from './execute'

type Scope = {
  static?: Record<string, any>,
  dynamic?: Record<string, any>
}

/** Execute code during compilation */
export const createInTemplateExecuter = <T = any>(ctx: {
  props: { name: string, value: string | undefined }[],
  dynamicProps: { name: string, value: string }[],
  slots: Record<string, any>,
  imports: string[],
  component: VirtualComponent
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

      if (key === '$slots') {
        return ctx.slots
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
      ${ctx.component.script.scriptSetupContent.functions.join('\n')}
      return (() => ${addContext(code, ctx.component.script.scriptSetupContent.functionNames)})()
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
    let value
    try {
      value = fn(newCtx) as T
    } catch (e) {
      if (!(e instanceof TypeError)) {
        throw e
      }
    }

    if (isDynamic) {
      return {
        value: simplifyCode(code, ctx as CompilerContext),
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
