import { Identifier, Statement } from '@babel/types';
import { compileScript, MagicString, SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc'
import { createScriptBindings, VirtualComponentBinding, VirtualComponentBindingType } from './create-script-bindings'
import { CompilerNodeContext } from '../../../lib/create-compilation-context/create-node-context';
import { executeWithContext } from '../../../lib/execute/execute';
import { NodeContextAttrs, NodeContextProps } from '../../../lib/create-compilation-context/create-node-context/create-props';
import { EmptyVirtualComponent } from '../types';

const walkScriptAst = (ast: Statement, parent: Statement | null, cb: (node: Statement, parent: Statement | null) => void) => {
  cb(ast, parent)
}

export const executeInScript = (
  code: string,
  globalStatic: (NodeContextProps[number] | NodeContextAttrs[number])[],
  globalDynamic: (NodeContextProps[number] | NodeContextAttrs[number])[]
) => {
  let isDynamic = false

  const globalCtx = new Proxy(globalStatic, {
    get(target, key: string) {
      const staticValue = globalStatic.find((prop) => prop.name === key)

      if (staticValue) {
        return staticValue.value
      }

      const dynamicValue = globalDynamic.find((prop) => prop.name === key)

      if (dynamicValue) {
        isDynamic = true
        return dynamicValue.value
      }

      throw new Error(`Unknown key ${key}`)
    }
  })

  const result = executeWithContext(code, globalCtx)

  return {
    result,
    isDynamic
  }
}

export const createScriptRenderFunction = (component: EmptyVirtualComponent) => {
  const sfc = component.sfcDescriptor

  if (!sfc.scriptSetup && !sfc.script) {
    return
  }

  const script = compileScript(sfc, { id: 'test' })

  const bindings = createScriptBindings(script)

  const originalSource = sfc.source.slice(script.loc.start.offset, script.loc.end.offset)

  const render = (ctx: CompilerNodeContext) => {
    const source = new MagicString(script.content)

    const ast = structuredClone(script.scriptSetupAst) ?? []

    for (const node of ast) {
      walkScriptAst(node, null, (node, parent) => {
        if (node.type === 'VariableDeclaration') {
          // Add to stack, execute
        }

        if (node.type === 'IfStatement') {
          const start = node.test.loc?.start.index
          const end = node.test.loc?.end.index

          if (!start || !end) {
            return
          }

          const ifTestSource = originalSource.slice(start, end).toString()

          const ifResult = executeInScript(ifTestSource, [
            ...ctx.staticAttrs,
            ...ctx.staticProps,
          ], [
            ...ctx.dynamicAttrs,
            ...ctx.dynamicProps,
          ])

          const canBeOptimized = !ifResult.isDynamic && ifResult.result === false
        }
      })
    }

    return source.toString()
  }

  return render
}
