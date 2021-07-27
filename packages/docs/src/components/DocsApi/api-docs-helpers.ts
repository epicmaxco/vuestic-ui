import { DefineComponent, ComponentOptions } from 'vue'
import { kebabCase, camelCase, cloneDeep } from 'lodash'
import { te as translationExists } from '../../helpers/I18nHelper'

import { ManualPropApiOptions, ManualEventApiOptions, ManualApiOptions, ManualSlotApiOptions, ManualMethodApiOptions } from './ManualApiOptions'
import { PropOptionsCompiled, compileComponentOptions } from './component-options-compiler'
import { ApiPropRowOptions, ApiTableData } from './ApiTableData'

/**
 * Very soft default injection into manual api options.
 * Key use-case right now is to introduce system-wide hidden props.
 * It's ok if these are not present in component, as we check with real props anyway.
 * @param defaults
 * @param base
 */
export const mergeInDefaults = (base: ManualApiOptions, defaults: ManualApiOptions): ManualApiOptions => {
  base = cloneDeep(base)

  for (const key in base) {
    // NOTE Many complaints from TS here. Not super sure we want to deal with these.
    // @ts-ignore
    if (typeof base[key] !== 'object') {
      continue
    }
    // @ts-ignore
    if (!base[key]) {
      // @ts-ignore
      base[key] = defaults[key]
      continue
    }
    // @ts-ignore
    for (const optionKey in defaults[key]) {
      // @ts-ignore
      if (!base[key][optionKey] && defaults[key][optionKey]) {
        // @ts-ignore
        base[key][optionKey] = { ...defaults[key][optionKey] }
      }
    }
  }

  return base
}

function getComponentOptions (component: DefineComponent): ComponentOptions {
  switch (true) {
  case Boolean(component.options):
    return component.options
  case Boolean(component.__vccOpts) || Boolean(component.__b):
    return { ...component.__b, ...component.__vccOpts }
  default:
    return component
  }
}

function getTranslation (type: string, name: string, componentName: string, custom?: string): string {
  if (custom && translationExists(custom)) { return custom }

  const componentTranslation = `api.${componentName}.${type}.${name}`

  if (translationExists(componentTranslation)) {
    return componentTranslation
  }

  return `api.all.${type}.${name}`
}

export const getApiTableProp = (
  componentName: string,
  propName: string,
  manualOptions: ManualApiOptions = {},
  componentOptions: PropOptionsCompiled,
): ApiPropRowOptions => {
  const manualPropOptions: ManualPropApiOptions = manualOptions.props?.[propName] || {}
  return {
    name: kebabCase(propName),
    version: manualPropOptions.version || manualOptions.version || '',
    required: componentOptions.required,
    types: manualPropOptions.types
      ? `\`${manualPropOptions.types}\``
      // @ts-ignore
      : componentOptions.types.map(type => `\`${type}\``).join(' | '),
    default: componentOptions.default,
    description: getTranslation('props', propName, componentName, manualPropOptions.translation),
  }
}

// TODO: improve typing
// (component: DefineComponent | VueConstructor): ComponentOptions<any> doesn't work here
export const getApiTableData = (
  component: any,
  manualApiOptions: ManualApiOptions = {},
): ApiTableData => {
  const componentOptions: ComponentOptions = getComponentOptions(component as DefineComponent)
  const compiledComponentOptions = compileComponentOptions(componentOptions)
  const camelCasedProps = Object.keys(compiledComponentOptions.props).reduce((acc: Record<string, any>, key: string) => {
    acc[camelCase(key)] = compiledComponentOptions.props[key]
    return acc
  }, {} as Record<string, any>)
  const componentName = componentOptions.name as string

  const apiTableData: ApiTableData = {
    name: componentName,
    props: {},
    slots: {},
    events: {},
    methods: {},
  }

  // Props
  for (const propName in camelCasedProps) {
    if (manualApiOptions?.props?.[propName]?.hidden) {
      continue
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    apiTableData.props[propName] = getApiTableProp(
      componentName,
      propName,
      manualApiOptions,
      camelCasedProps[propName],
    )
  }

  // Events
  for (const eventName in manualApiOptions.events) {
    const manualEventOptions: ManualEventApiOptions = manualApiOptions.events[eventName] || {}
    apiTableData.events[eventName] = {
      version: manualEventOptions.version || '',
      description: getTranslation('events', eventName, componentName, manualEventOptions.translation),
      name: kebabCase(eventName),
      types: manualEventOptions.types,
    }
  }

  // Slots
  for (const slotName in manualApiOptions.slots) {
    const manualSlotOptions: ManualSlotApiOptions = manualApiOptions.slots[slotName] || {}
    apiTableData.slots[slotName] = {
      version: manualSlotOptions.version || '',
      description: getTranslation('slots', slotName, componentName, manualSlotOptions.translation),
      name: kebabCase(slotName),
    }
  }

  // Methods
  for (const methodName in manualApiOptions.methods) {
    const manualMethodOptions: ManualMethodApiOptions = manualApiOptions.methods[methodName] || {}
    apiTableData.methods[methodName] = {
      version: manualMethodOptions.version || '',
      description: getTranslation('methods', methodName, componentName, manualMethodOptions.translation),
      name: kebabCase(methodName),
      types: manualMethodOptions.types,
    }
  }

  return apiTableData
}
