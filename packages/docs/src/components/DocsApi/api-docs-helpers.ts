import { DefineComponent, ComponentOptions } from 'vue'
import { kebabCase, camelCase } from 'lodash'
import { te as translationExists } from '../../helpers/I18nHelper'

import { ManualPropApiOptions, ManualApiOptions, ManualSlotApiOptions, ManualMethodApiOptions } from './ManualApiOptions'
import { compileComponentOptions, CompiledComponentOptions } from './component-options-compiler'
import { ApiEventRowOptions, ApiMethodRowOptions, ApiPropRowOptions, ApiSlotRowOptions, ApiTableData } from './ApiTableData'

function getComponentOptions (component: DefineComponent): ComponentOptions {
  if (component.options) {
    return component.options
  }

  if (component.__vccOpts || component.__b) {
    return { ...component.__vccOpts, ...component.__b }
  }

  return component
}

function getTranslation (type: string, name: string, componentName: string, custom?: string): string {
  if (custom && translationExists(custom)) { return custom }

  const componentTranslation = `api.${componentName}.${type}.${name}`

  if (translationExists(componentTranslation)) {
    return componentTranslation
  }

  const allTranslation = `api.all.${type}.${name}`
  if (translationExists(allTranslation)) {
    return allTranslation
  }

  return ''
}

const getApiTableProps = (
  componentName: string,
  compiledComponentOptions: CompiledComponentOptions,
  manualOptions: ManualApiOptions = {},
) => {
  const api = {} as Record<string, ApiPropRowOptions>
  const merged = { ...compiledComponentOptions.props, ...manualOptions.props }

  for (const propName in merged) {
    const prop = compiledComponentOptions.props[propName]
    const manualPropOptions: ManualPropApiOptions = (manualOptions.props && manualOptions.props[propName]) || {}

    if (manualPropOptions.hidden) { continue }

    api[propName] = {
      ...prop,
      name: kebabCase(propName),
      version: manualPropOptions.version || manualOptions.version || '',
      description: getTranslation('props', propName, componentName, manualPropOptions.translation),
      types: manualPropOptions.types
        ? `\`${manualPropOptions.types}\``
        : prop.types
          .map(type => `\`${type}\``)
          .join(' | '),
    }
  }

  return api
}

const getApiTableEvents = (
  componentName: string,
  compiledComponentOptions: CompiledComponentOptions,
  manualOptions: ManualApiOptions = {},
) => {
  const api = {} as Record<string, ApiEventRowOptions>
  const merged = { ...compiledComponentOptions.emits, ...manualOptions.events }

  for (const eventName in merged) {
    const event = merged[eventName]

    if (event.hidden) { continue }

    api[eventName] = {
      version: event.version || manualOptions.version || '',
      name: kebabCase(eventName),
      types: event.types,
      description: getTranslation('events', eventName, componentName, event.translation),
    }
  }

  return api
}

const getApiTableSlots = (
  componentName: string,
  compiledComponentOptions: CompiledComponentOptions,
  manualOptions: ManualApiOptions = {},
) => {
  const api = {} as Record<string, ApiSlotRowOptions>

  for (const slotName in manualOptions.slots) {
    const manualSlotOptions: ManualSlotApiOptions = manualOptions.slots[slotName] || {}

    api[slotName] = {
      version: manualSlotOptions.version || manualOptions.version || '',
      description: getTranslation('slots', slotName, componentName, manualSlotOptions.translation),
      name: kebabCase(slotName),
    }
  }

  return api
}

const getApiTableMethods = (
  componentName: string,
  compiledComponentOptions: CompiledComponentOptions,
  manualOptions: ManualApiOptions = {},
) => {
  const api = {} as Record<string, ApiMethodRowOptions>

  for (const methodName in manualOptions.methods) {
    const manualMethodOptions: ManualMethodApiOptions = manualOptions.methods[methodName] || {}
    api[methodName] = {
      version: manualMethodOptions.version || manualOptions.version || '',
      description: getTranslation('methods', methodName, componentName, manualMethodOptions.translation),
      name: kebabCase(methodName),
      types: manualMethodOptions.types,
    }
  }

  return api
}

export const getApiTableData = (component: any, manualApiOptions: ManualApiOptions = {}): ApiTableData => {
  const componentOptions: ComponentOptions = getComponentOptions(component as DefineComponent)
  const compiledComponentOptions = compileComponentOptions(componentOptions)
  const componentName = componentOptions.name as string

  const apiTableData: ApiTableData = {
    name: componentName,
    props: getApiTableProps(componentName, compiledComponentOptions, manualApiOptions),
    slots: getApiTableSlots(componentName, compiledComponentOptions, manualApiOptions),
    events: getApiTableEvents(componentName, compiledComponentOptions, manualApiOptions),
    methods: getApiTableMethods(componentName, compiledComponentOptions, manualApiOptions),
  }

  return apiTableData
}
