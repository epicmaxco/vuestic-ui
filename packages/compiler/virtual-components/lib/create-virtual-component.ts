import { parse as parseVue } from "@vue/compiler-sfc"
import { extractDefineProps, extractPropDefaults } from './create-virtual-component/define-props'
import { createScriptSetupContext } from './create-virtual-component/script-setup'

export const createVirtualComponent = (componentName: string, source: string) => {
  const result = parseVue(source)

  if (!result.descriptor.template) {
    throw new Error(`No template found in component ${componentName}`)
  }

  if (!result.descriptor.template.ast) {
    throw new Error(`No AST found in component ${componentName}`)
  }

  // TODO: Parse $onCompile functions
  // const script = result.descriptor.scriptSetup?.content ?? null

  return {
    name: componentName,
    templateSource: result.descriptor.template.content,
    templateAst: result.descriptor.template.ast,
    source: source.trim(),
    script: {
      props: extractDefineProps(source),
      propsDefaults: extractPropDefaults(source),
      scriptSetupContent: createScriptSetupContext(result.descriptor.scriptSetup?.content ?? ''),
      // onCompileFunction: extractFunctionBodies(source)
    }
  }
}

export type VirtualComponent = ReturnType<typeof createVirtualComponent>
