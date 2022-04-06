import { ComponentOptions, DefineComponent } from 'vue'

function normalizeProps (props: any) {
  switch (true) {
    case Array.isArray(props):
      return props.reduce((acc: Record<string, unknown>, prop: string) => ({ ...acc, [prop]: null }), {})
    case typeof props === 'object' && props !== null:
      return props
    default:
      return {}
  }
}

function mergeProps (to: Record<string, any>, from: Record<string, any>, optionsType = 'props') {
  const { mixins, extends: extendsOptions } = from

  extendsOptions && mergeProps(to, extendsOptions, optionsType)
  mixins && mixins.forEach((m: any) => mergeProps(to, m, optionsType))

  const props = normalizeProps(from[optionsType])

  for (const key in props) {
    to[key] = props[key]
  }
}

function getComponentOptions (component: DefineComponent): ComponentOptions {
  if (component.options) {
    return component.options
  }

  if (component.__vccOpts || component.__b) {
    return { ...component.__vccOpts, ...component.__b }
  }

  return component
}

function resolveProps (options: any, optionsType = 'props') {
  const mixins = options.mixins ?? []
  const extendsOptions = options.extends ?? []
  const result: Record<string, any> = {}

  mergeProps(result, extendsOptions, optionsType)

  for (let i = 0; i < mixins.length; i++) {
    mergeProps(result, mixins[i], optionsType)
  }

  Object.assign(result, normalizeProps(options[optionsType]))

  return result
}

export const getComponentProps = (component: DefineComponent) => {
  return resolveProps(getComponentOptions(component))
}
