import Vue, { ComponentOptions } from 'vue'
import { PropOptions } from 'vue/types/options'
// @ts-ignore
import { getType } from './vue-src-no-flow/core/util/props'

import noop from 'lodash/noop'
import { ManualApiOptions, ManualPropApiOptions } from './ManualApiOptions'
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
    name: propName,
    version: manualPropOptions.version || manualOptions.version || '',
    required: componentOptions.required,
    types: componentOptions.types.map(type => `\`${type}\``).join(' | '),
    default: componentOptions.default,
    description: `api.${manualPropOptions.local ? componentName : 'all'}.props.${propName}`,
  }
}

export const getApiTableData = (
  componentOptions: ComponentOptions<Vue>,
  manualApiOptions: ManualApiOptions = {},
): ApiTableData => {
  const compiledComponentOptions = compileComponentOptions(componentOptions)
  const componentName = componentOptions.name as string
  const apiTablezData: ApiTableData = {
    name: componentOptions.name as string,
    props: {},
    slots: {},
    events: {},
    methods: {},
  }

  for (const propName in compiledComponentOptions.props) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    apiTablezData.props[propName] = getApiTableProp(
      componentName,
      propName,
      manualApiOptions,
      compiledComponentOptions.props[propName],
    )
  }

  return apiTablezData
}
