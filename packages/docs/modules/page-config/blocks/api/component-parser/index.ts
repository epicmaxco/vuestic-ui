import type { DefineComponent, ComponentOptions } from "vue"
import { isArray, isObject, isFunction, camelCase } from 'lodash'
import * as components from 'vuestic-ui'
import { EventMeta, PropertyMeta } from "vue-component-meta"
import { ComponentMeta } from "../types"

function getComponentOptions(component: DefineComponent): ComponentOptions {
  if (component.options) {
    return component.options
  }

  if (component.__vccOpts || component.__b) {
    return { ...component.__vccOpts, ...component.__b }
  }

  return component as ComponentOptions
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
export function getType(fn: () => any) {
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
  name: string;
  types: string[];
  required: boolean;
  default: any;
  hidden: boolean; // TODO Not sure if hidden works at all right now.
}

export type EventOptionsCompiled = Record<string, any> & {
  types: 'any'
}

export type CompiledComponentOptions = {
  props: ComponentMeta['props'],
  events: ComponentMeta['events'],
}

/**
 * Employ vue native functionality to get defaults for prop
 */
function getDefaultValue(propOptions: Record<string, any>, types: Array<string>) {
  const defaultValue = !types.includes('Function') && isFunction(propOptions.default) ? propOptions.default() : propOptions.default

  if (typeof window !== 'undefined' && defaultValue === window) {
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

function convertComponentPropToApiDocs<T extends string>(propName: T, propOptionsRecord: Record<string, any>): PropertyMeta {
  const types = getTypes(propOptionsRecord[propName])

  return {
    name: propName,
    global: false,
    description: '',
    type: types.join(' | '),
    required: !!propOptionsRecord[propName].required,
    default: getDefaultValue(propOptionsRecord[propName], types),
  } as any
}

function normalizeProps(props: any) {
  switch (true) {
    case isArray(props):
      return props.reduce((acc: Record<string, unknown>, prop: string) => ({ ...acc, [prop]: null }), {})
    case isObject(props):
      return props
    default:
      return {}
  }
}

function mergeProps(to: Record<string, any>, from: Record<string, any>, optionsType = 'props') {
  const { mixins, extends: extendsOptions } = from

  extendsOptions && mergeProps(to, extendsOptions, optionsType)
  mixins && mixins.forEach((m: any) => mergeProps(to, m, optionsType))

  const props = normalizeProps(from[optionsType])

  for (const key in props) {
    to[key] = props[key]
  }
}

export function resolveProps(options: ComponentOptions, optionsType = 'props') {
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

export type ResolvedEvent = { types: 'any' }
export function resolveEmits(options: ComponentOptions): EventMeta[] {
  if (!options.emits) {
    return []
  }

  return (options.emits as string[])
    .map((e) => ({
      name: e,
      description: '',
      arguments: [],
      types: undefined,
    }) as any)
}

const eventNameToCamelCase = (eventName: string) => {
  const parts = eventName.split(':')
  return parts.map((s) => camelCase(s)).join(':')
}

export function compileComponentOptions(componentOptions: ComponentOptions): CompiledComponentOptions {
  const resolvedProps = resolveProps(componentOptions)

  const props: PropertyMeta[] = []
  for (const propName in resolvedProps) {
    props.push(convertComponentPropToApiDocs(propName, resolvedProps))
  }

  const emits = resolveEmits(componentOptions)

  return {
    props: props.reduce((acc, prop) => {
      acc[prop.name] = prop
      return acc
    }, {} as CompiledComponentOptions['props']),
    events: emits.reduce((acc, event) => ({
      ...acc,
      [eventNameToCamelCase(event.name)]: ({
        types: event.type,
      })
    }), {} as CompiledComponentOptions['events']),
  }
}

export const parseComponent = (component: DefineComponent | string) => {
  if (typeof component === 'string') {
    component = components[component as keyof typeof components] as unknown as DefineComponent
  }

  const options = getComponentOptions(component)

  return compileComponentOptions(options)
}
