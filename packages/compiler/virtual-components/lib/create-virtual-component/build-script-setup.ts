
import { compileScript, SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc'
import { executeTsModule } from '../execute/execute-module'

const vueCompileScript = (descriptor: SFCDescriptor) => {
  try {
    return compileScript(descriptor, { id: 'virtual-component' })
  } catch (e) {
    console.error('Failed to virtual component compile script', e)
    return null
  }
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

export const buildScriptSetupModule = async (descriptor: SFCDescriptor) => {
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

  return {
    props: (props) as Record<string, { type?: any, default?: any, required?: Boolean }>,
    setup: executedScript?.default.setup ?? (() => ({} as Record<string, any>)),
    setupContext: bindings,
  }
}
