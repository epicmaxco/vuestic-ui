import { parse as parseVue } from "@vue/compiler-sfc"
import { buildScriptSetupModule } from './create-virtual-component/build-script-setup'
import { createScriptSetupMeta } from './create-virtual-component/script-setup-meta'
import { VirtualComponentCompilationError } from './errors'
import { createVirtualComponent as cvc2 } from "../compiler/virtual-component/create-virtual-component"
import { CompilerNodeContext } from "./create-compilation-context/create-node-context"

export const createVirtualComponent = async (componentName: string, source: string, path = '') => {
  const result = parseVue(source, {
    filename: path
  })

  if (!result.descriptor.template) {
    throw new VirtualComponentCompilationError(`Template not found`, componentName)
  }

  if (!result.descriptor.template.ast) {
    throw new VirtualComponentCompilationError(`Template AST not found`, componentName)
  }

  // TODO: Parse $onCompile functions
  // const script = result.descriptor.scriptSetup?.content ?? null

  const { render } = (cvc2(source))

  return {
    name: componentName,
    templateAst: result.descriptor.template.ast,
    source: source.trim(),
    script: {
      scriptSetup: await buildScriptSetupModule(result.descriptor, componentName),
      scriptSetupMeta: createScriptSetupMeta(result.descriptor, componentName)
    },
    render: render
  } as VirtualComponent
}

export type VirtualComponent = {
  name: string,
  source: string,
  templateAst: any,

  script: {
    scriptSetup: Awaited<ReturnType<typeof buildScriptSetupModule>>,
    scriptSetupMeta: ReturnType<typeof createScriptSetupMeta>
  },

  render: (ctx: CompilerNodeContext) => string
}
