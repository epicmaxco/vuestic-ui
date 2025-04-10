import { parse } from '@vue/compiler-sfc'
import { createScriptRenderFunction } from './script-render-function/create-script-render-function'
import { EmptyVirtualComponent, VirtualComponent } from './types'
import { createTemplateRenderFunction } from './template-render-function/create-template-render-function'

export const createVirtualComponent = async (source: string, componentName: string) => {
  const result = parse(source)

  const virtualComponent: EmptyVirtualComponent = {
    name: componentName,
    sfcDescriptor: result.descriptor,
  }

  const templateAst = result.descriptor.template?.ast

  if (!templateAst) {
    throw new Error('No template found in component while transforming vue file')
  }

  virtualComponent.renderScript = createScriptRenderFunction(virtualComponent)
  virtualComponent.renderTemplate = createTemplateRenderFunction(virtualComponent)

  return virtualComponent as VirtualComponent
}
