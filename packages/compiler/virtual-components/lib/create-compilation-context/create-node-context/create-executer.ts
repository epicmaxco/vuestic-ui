
import { isRef } from 'vue'
import { CompilerNodeContext, CompilerRenderResult } from '../create-node-context'
import { VirtualComponent } from '../../create-virtual-component'
import { VirtualComponentError } from '../../errors'
import { execute, executeWithContext } from '../../execute/execute'
import { simplifyCode } from './create-executer/simplify-code'
import { NodeContextProps } from './create-props'

type Scope = {
  static?: Record<string, any>,
  dynamic?: Record<string, any>
}

type SimplifiedCompilerContext = {
  staticProps: NodeContextProps,
  dynamicProps: NodeContextProps,
  slots: Record<string, any>,
  imports: string[],
  component: VirtualComponent,
  renderResult: CompilerRenderResult,
  usedKeys: Set<string>
}

const createSetupContext = (ctx: SimplifiedCompilerContext, onDynamicAccess: (key: string) => void) => {
  const props = new Proxy({}, {
    get(target, key: string) {
      const dynamicProp = ctx.dynamicProps.find((prop) => prop.name === key)

      if (dynamicProp) {
        if (dynamicProp.value === undefined) {
          throw new VirtualComponentError('Unexpected undefined value in dynamic prop ' + key)
        }

        try {
          // Static
          return execute(dynamicProp.value)
        } catch (e) {
          // Dynamic
          onDynamicAccess(key)
          return undefined
        }
      }

      const staticProp = ctx.staticProps.find((prop) => prop.name === key)

      if (staticProp) {
        return staticProp.value
      }

      return undefined
    },
    has(target, key: string) {
      const dynamicProp = ctx.dynamicProps.find((prop) => prop.name === key)

      if (dynamicProp) {
        return true
      }

      const staticProp = ctx.staticProps.find((prop) => prop.name === key)

      if (staticProp) {
        return true
      }

      return false
    },
    set() {
      throw new VirtualComponentError('Props are readonly in virtual components')
    },
    ownKeys() {
      return [...ctx.staticProps.map((prop) => prop.name), ...ctx.dynamicProps.map((prop) => prop.name)]
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true,
      }
    },

  }) as Record<string, any>

  const setupCtx = {
    expose: () => void 0,
    slots: {} as Record<string, any> // TODO: Manage slots
  } as { slots: Record<string, boolean>, expose: () => void }

  return [props, setupCtx] as const
}

const createRenderingContext = (ctx: SimplifiedCompilerContext, setupContext: ReturnType<typeof createSetupContext>, onDynamicAccess: (key: string) => void) => {
  const setup = ctx.component.script.scriptSetup?.setup ?? (() => ({} as Record<string, any>))

  const [props, setupCtx] = setupContext
  const setupState = setup(props, setupCtx) as Record<string, any>

  const _ctx = new Proxy(setupState, {
    get(target, key: string) {
      if (key in ctx.component.script.scriptSetupMeta.variables) {
        try {
          const result = executeWithContext(ctx.component.script.scriptSetupMeta.variables[key], _ctx)
          return result
        } catch (e) {

        }
      }

      if (key in target) {
        const value = target[key]

        if (isRef(value)) {
          throw new VirtualComponentError('Refs can not be used in virtual components template')
        }

        return target[key]
      }

      if (key in ctx.slots) {
        return ctx.slots[key]
      }

      if (key === '$props') {
        return props
      }

      if (key === '$slots') {
        return ctx.slots
      }

      if (key in props) {
        return props[key]
      }
    },
    ownKeys(target) {
      return [...Object.getOwnPropertyNames(target), ...Object.keys(ctx.slots), '$props', '$slots']
    },
  })

  return _ctx
}

const createRenderingContextWithScope = (ctx: ReturnType<typeof createRenderingContext>, scope: Scope, onDynamicAccess: (key: string) => void, compilerContext: SimplifiedCompilerContext) => {
  return new Proxy(ctx, {
    get(target, key: string) {
      compilerContext.usedKeys.add(key)

      if (scope.dynamic && key in scope.dynamic) {
        onDynamicAccess(key)
        return scope.dynamic[key]
      }

      if (scope.static && key in scope.static) {
        return scope.static[key]
      }

      return target[key]
    },
    ownKeys(target) {
      return [...Object.keys(target), ...Object.keys(scope.dynamic ?? {}), ...Object.keys(scope.static ?? {})]
    },
  })
}

/** Execute code during compilation */
export const createInTemplateExecuter = (ctx: SimplifiedCompilerContext) => {
  // If dynamic props are used, we need to return the code instead of the value
  let isDynamic = false
  const dynamicVariables = new Set<string>()

  const setupContext = createSetupContext(ctx, (key) => {
    dynamicVariables.add(key)
    isDynamic = true
  })

  const renderingContext = createRenderingContext(ctx, setupContext, () => {

  })

  let scopeStack = [] as Scope[]

  const codeRunner = <T = any> (code: string) => {
    const scope = scopeStack.reduce((acc, scope) => {
      return {
        static: { ...acc.static, ...scope.static },
        dynamic: { ...acc.dynamic, ...scope.dynamic }
      }
    }, {})


    isDynamic = false

    const _ctx = createRenderingContextWithScope(renderingContext, scope, (key) => {
      dynamicVariables.add(key)
      isDynamic = true
    }, ctx)

    let value

    try {
      value = executeWithContext(code, _ctx) as T
    } catch (e) {
      if (!(e instanceof TypeError)) {
        throw e
      }
    }

    if (isDynamic) {
      if (ctx.renderResult < CompilerRenderResult.Dynamic) {
        ctx.renderResult = CompilerRenderResult.Dynamic
      }
      return {
        value: simplifyCode(code, ctx as CompilerNodeContext),
        isDynamic: true as const
      }
    }

    return {
      value: value as T,
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

  codeRunner.printInTemplate = printValueInTemplate

  return codeRunner
}

export const printValueInTemplate = <T>(result: { value: T, isDynamic: boolean }, type: 'Interpolation' | 'Bind') => {
  if (result.isDynamic) {
    if (type === 'Bind') {
      return String(result.value)
    } else if (type === 'Interpolation') {
      return `{{ ${result.value} }}`
    } else {
      throw new VirtualComponentError(`Can not print value in template. Invalid type ${type}`)
    }
  }

  return String(result.value)
}
