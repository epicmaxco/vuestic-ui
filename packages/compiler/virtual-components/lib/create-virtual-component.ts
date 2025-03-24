import { parse as parseVue } from "@vue/compiler-sfc"
import { buildScriptSetupModule } from './create-virtual-component/build-script-setup'
import { createScriptSetupMeta } from './create-virtual-component/script-setup-meta'
import { VirtualComponentCompilationError } from './errors'

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

  return {
    name: componentName,
    templateAst: result.descriptor.template.ast,
    source: source.trim(),
    script: {
      scriptSetup: await buildScriptSetupModule(result.descriptor),
      scriptSetupMeta: createScriptSetupMeta(result.descriptor, componentName)
    }
  }
}

export type VirtualComponent = Awaited<ReturnType<typeof createVirtualComponent>>
