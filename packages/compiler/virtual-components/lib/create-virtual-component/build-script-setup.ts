
import { compileScript, SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc'
import { executeTsModule } from '../execute/execute-module'
import { VirtualComponentCompilationError } from '../errors'

const vueCompileScript = (descriptor: SFCDescriptor) => {
  try {
    return compileScript(descriptor, { id: 'virtual-component' })
  } catch (e) {
    console.error('Failed to virtual component compile script', e)
    return null
  }
}

export enum CompilerVirtualComponentVariable {
  Static = 0,
  MaybeDynamic = 1,
  Dynamic = 2
}

const getVirtualComponentVariableType = (vueBinding: string | undefined, componentName: string) => {
  if (vueBinding === 'setup-let') {
    throw new VirtualComponentCompilationError('let in setup function of virtual component is not supported', componentName)
  }

  if (vueBinding === 'props' || vueBinding === 'setup-const') {
    return CompilerVirtualComponentVariable.Static
  }

  if (vueBinding === 'setup-maybe-ref') {
    return CompilerVirtualComponentVariable.MaybeDynamic
  }

  if (vueBinding === 'setup-ref' || vueBinding === 'setup-reactive-const') {
    return CompilerVirtualComponentVariable.Dynamic
  }

  throw new VirtualComponentCompilationError(`Unknown binding type ${vueBinding}`, componentName)
}

/** Do not import components */
const stubComponentsImports = (script: SFCScriptBlock) => {
  let content = script.content
  const imports = script.imports ?? {} as NonNullable<SFCScriptBlock['imports']>

  Object.keys(imports).forEach((imported) => {
    const importBlock = imports[imported]

    if (importBlock.isUsedInTemplate && importBlock.source.endsWith('.vue')) {
      content = content.replace(new RegExp(`import ${imported} from ['|"]${importBlock.source}['|"][;]?`, 'g'), `const ${imported} = { render: () => null }`)
    }
  })

  return content
}

export const buildScriptSetupModule = async (descriptor: SFCDescriptor, componentName: string) => {
  if (!descriptor.scriptSetup) {
    return null
  }

  const script = vueCompileScript(descriptor)

  if (!script) {
    return null
  }

  const { bindings = {} } = script

  const executedScript = await executeTsModule<{
    default: {
      props: unknown,
      setup: (props: Record<string, any>, ctx: {
        expose: () => void
      }) => Record<string, any>
    }
  }>(stubComponentsImports(script), descriptor.filename)

  let props = executedScript?.default.props ?? {}

  if (Array.isArray(props)) {
    props = props.reduce((acc, prop) => {
      acc[prop] = {  }
      return acc
    }, {})
  }

  const variables = Object.keys(bindings).reduce((acc, key) => {
    acc[key] = { type: getVirtualComponentVariableType(bindings[key], componentName) }

    return acc
  }, { } as Record<string, { type: CompilerVirtualComponentVariable }>)

  return {
    props: (props) as Record<string, { type?: any, default?: any, required?: Boolean }>,
    setup: executedScript?.default.setup ?? (() => ({} as Record<string, any>)),
    setupContext: bindings,
    variables,
  }
}
