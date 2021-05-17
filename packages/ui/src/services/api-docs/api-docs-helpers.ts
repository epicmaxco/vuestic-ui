// @ts-nocheck
import Vue, { ComponentOptions } from 'vue'
import { PropOptions } from 'vue/types/options'
// @ts-ignore
import { getType } from './vue-src-no-flow/core/util/props'
import { camelCase, kebabCase } from 'lodash'

import noop from 'lodash/noop'
import {
  ManualApiOptions,
  ManualPropApiOptions,
  ManualEventApiOptions,
  ManualSlotApiOptions,
  ManualMethodApiOptions,
} from './ManualApiOptions'
import { ApiPropRowOptions, ApiTableData } from './ApiTableData'
import {
  PropOptionsCompiled,
  compileComponentOptions,
} from './component-options-compiler'

// Warn handler will complain, so we shut warns down
// TODO Might be not ideal solution as we lose validation for potentially useful case.
Vue.config.warnHandler = noop

/**
 * @param componentProp vue prop options.
 */
export const getTypes = (componentProp: PropOptions): string[] => {
  if (!componentProp.type) {
    return ['any']
  }

  const types = Array.isArray(componentProp.type) ? componentProp.type : [componentProp.type]
  return types.map(getType)
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
      : componentOptions.types.map(type => `\`${type}\``).join(' | '),
    default: componentOptions.default,
    description: `api.${manualPropOptions.local ? componentName : 'all'}.props.${propName}`,
  }
}

/**
 * Very soft default injection into manual api options.
 * Key use-case right now is to introduce system-wide hidden props.
 * It's ok if these are not present in component, as we check with real props anyway.
 * @param defaults
 * @param base
 */
export const mergeInDefaults = (base: ManualApiOptions, defaults: ManualApiOptions): void => {
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
}

export const getApiTableData = (
  componentOptions: ComponentOptions<Vue>,
  manualApiOptions: ManualApiOptions = {},
): ApiTableData => {
  const compiledComponentOptions = compileComponentOptions(componentOptions)
  const camelCasedProps = Object.keys(compiledComponentOptions.props).reduce((acc: Record<string, any>, key: string) => {
    acc[camelCase(key)] = compiledComponentOptions.props[key]
    return acc
  }, {} as Record<string, any>)
  const componentName = componentOptions.name as string
  const apiTableData: ApiTableData = {
    name: componentOptions.name as string,
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
      description: `api.${manualEventOptions.local ? componentName : 'all'}.events.${eventName}`,
      name: kebabCase(eventName),
      types: manualEventOptions.types,
    }
  }

  // Slots
  for (const slotName in manualApiOptions.slots) {
    const manualSlotOptions: ManualSlotApiOptions = manualApiOptions.slots[slotName] || {}
    apiTableData.slots[slotName] = {
      version: manualSlotOptions.version || '',
      description: `api.${manualSlotOptions.local ? componentName : 'all'}.slots.${slotName}`,
      name: kebabCase(slotName),
    }
  }

  // Methods
  for (const methodName in manualApiOptions.methods) {
    const manualMethodOptions: ManualMethodApiOptions = manualApiOptions.methods[methodName] || {}
    apiTableData.methods[methodName] = {
      version: manualMethodOptions.version || '',
      description: `api.${manualMethodOptions.local ? componentName : 'all'}.methods.${methodName}`,
      name: kebabCase(methodName),
      types: manualMethodOptions.types,
    }
  }

  return apiTableData
}
