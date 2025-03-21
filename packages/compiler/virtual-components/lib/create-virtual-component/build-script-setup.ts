
import { compileScript, SFCDescriptor } from '@vue/compiler-sfc'
import { executeTsModule } from '../execute/execute-module'

const vueCompileScript = (descriptor: SFCDescriptor) => {
  try {
    return compileScript(descriptor, { id: 'virtual-component' })
  } catch (e) {
    console.error('Failed to virtual component compile script', e)
    return null
  }
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
  }>(script.content)

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
