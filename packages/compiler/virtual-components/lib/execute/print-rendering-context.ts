import { CompilerContext } from '../create-compiler-context'
import { VirtualComponent } from '../create-virtual-component'
import { VirtualComponentError } from '../errors'
import { execute, simplifyCode, addContext } from './execute'
import { isRef } from 'vue'

type Scope = {
  static?: Record<string, any>,
  dynamic?: Record<string, any>
}

type SimplifiedCompilerContext = {
  props: CompilerContext['props'],
  dynamicProps: CompilerContext['dynamicProps'],
  slots: CompilerContext['slots'],
  imports: CompilerContext['imports'],
  component: VirtualComponent
}

const createSetupContext = (ctx: SimplifiedCompilerContext, onDynamicAccess: () => void) => {
  const props = new Proxy({}, {
    get(target, key: string) {
      const dynamicProp = ctx.dynamicProps.find((prop) => prop.name === key)

      if (dynamicProp) {
        onDynamicAccess()
        return `${dynamicProp.value}`
      }

      const staticProp = ctx.props.find((prop) => prop.name === key)

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

      const staticProp = ctx.props.find((prop) => prop.name === key)

      if (staticProp) {
        return true
      }

      return false
    },
    set() {
      throw new VirtualComponentError('Props are readonly in virtual components')
    },
    ownKeys() {
      return [...ctx.props.map((prop) => prop.name), ...ctx.dynamicProps.map((prop) => prop.name)]
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

const createRenderingContext = (ctx: CompilerContext, setupContext: ReturnType<typeof createSetupContext>) => {
  const setup = ctx.component.script.scriptSetup?.setup ?? (() => ({} as Record<string, any>))

  const [props, setupCtx] = setupContext
  const setupState = setup(props, setupCtx) as Record<string, any>

  return new Proxy(setupState, {
    get(target, key: string) {
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
}

const createRenderingContextWithScope = (ctx: ReturnType<typeof createRenderingContext>, scope: Scope, onDynamicAccess: () => void) => {
  return new Proxy(ctx, {
    get(target, key: string) {
      if (scope.dynamic && key in scope.dynamic) {
        onDynamicAccess()
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
export const createInTemplateExecuter = (ctx: CompilerContext) => {
  // If dynamic props are used, we need to return the code instead of the value
  let isDynamic = false

  const setupContext = createSetupContext(ctx, () => {
    isDynamic = true
  })

  const renderingContext = createRenderingContext(ctx, setupContext)

  let scopeStack = [] as Scope[]

  const codeRunner = <T = any> (code: string) => {
    const scope = scopeStack.reduce((acc, scope) => {
      return {
        static: { ...acc.static, ...scope.static },
        dynamic: { ...acc.dynamic, ...scope.dynamic }
      }
    }, {})

    const fnCode = `((_ctx) => {
      return (() => ${addContext(code)})()
    })
    `

    isDynamic = false

    const _ctx = createRenderingContextWithScope(renderingContext, scope, () => {
      isDynamic = true
    })

    const fn = execute(fnCode) as (_ctx: any) => T
    let value

    try {
      value = fn(_ctx) as T
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
