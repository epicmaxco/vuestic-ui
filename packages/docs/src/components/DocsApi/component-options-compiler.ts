import { isArray, isObject, isFunction, kebabCase } from 'lodash'

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
export function getType (fn: () => any) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

/**
 * @param componentProp vue prop options.
 */
export const getTypes = (componentProp: any): string[] => {
  const types = []
  switch (true) {
  case isArray(componentProp):
    types.push(...componentProp)
    break
  case isFunction(componentProp):
    types.push(componentProp)
    break
  case isObject(componentProp):
    if (componentProp.type) {
      types.push(...(isArray(componentProp.type) ? componentProp.type : [componentProp.type]))
    }
    break
  default:
    return ['any']
  }

  return types.length > 0 ? types.map(getType) : ['any']
}

export type PropOptionsCompiled = {
  types: string[];
  required: boolean;
  default: any;
}
type CompiledComponentOptions = { props: Record<string, PropOptionsCompiled> }

/**
 * Employ vue native functionality to get defaults for prop
 */
function getDefaultValue (propOptions: Record<string, any>, types: Array<string>) {
  const defaultValue = !types.includes('Function') && isFunction(propOptions.default) ? propOptions.default() : propOptions.default

  // @ts-ignore
  if (defaultValue === window) {
    return 'Window'
  }
  if (typeof defaultValue === 'undefined') {
    return '\\-'
  }
  if (typeof defaultValue === 'string') {
    return `\`"${defaultValue}"\``
  }
  if (typeof defaultValue === 'boolean') {
    return defaultValue ? '`true`' : '`false`'
  }
  if (typeof defaultValue === 'number') {
    return `\`${defaultValue}\``
  }
  if (typeof defaultValue === 'object') {
    const json = JSON.stringify(defaultValue, null, 2)
    const oneLine = json.split(/\r\n|\r|\n/).length === 1
    if (oneLine) {
      return `\`${json}\``
    }
    return `\`\`\`json\n${json}\n\`\`\``
  }

  return defaultValue + ''
}

function convertComponentPropToApiDocs<T extends string> (propName: T, propOptionsRecord: Record<string, any>): PropOptionsCompiled {
  const types = getTypes(propOptionsRecord[propName])

  return {
    types,
    required: !!propOptionsRecord[propName].required,
    default: getDefaultValue(propOptionsRecord[propName], types),
  }
}

function normalizeProps (props: any) {
  switch (true) {
  case isArray(props):
    return props.reduce((acc: Record<string, unknown>, prop: string) => ({ ...acc, [prop]: null }), {})
  case isObject(props):
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

export function resolveProps (options: any, optionsType = 'props') {
  const mixins = options.mixins ?? []
  const extendsOptions = options.extends ?? []
  const result = {}

  mergeProps(result, extendsOptions, optionsType)

  for (let i = 0; i < mixins.length; i++) {
    mergeProps(result, mixins[i], optionsType)
  }

  Object.assign(result, normalizeProps(options[optionsType]))

  return result
}

export function compileComponentOptions (componentOptions: any): CompiledComponentOptions {
  const props = resolveProps(componentOptions)

  const propsApiDocs: any = {}
  for (const propName in props) {
    propsApiDocs[kebabCase(propName)] = convertComponentPropToApiDocs(propName, props)
  }

  return {
    props: propsApiDocs,
  }
}
