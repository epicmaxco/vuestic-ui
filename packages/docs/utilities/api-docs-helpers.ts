import Vue, { ComponentOptions } from 'vue'
import { PropOptions } from 'vue/types/options'
// @ts-nochek
import {
  getPropDefaultValue,
  getType,
} from './vue-src-no-flow/core/util/props'
import { emptyObject, hyphenate } from './vue-src-no-flow/shared/util'

export type ComponentOptionsApiDocs = {
  types: string[],
  required: boolean,
  default: any,
}

/**
 * @param componentProp vue prop options.
 */
export function getTypes (componentProp: PropOptions): string[] {
  if (!componentProp.type) {
    return ['any']
  }

  const types = Array.isArray(componentProp.type) ? componentProp.type : [componentProp.type]
  return types.map(getType)
}

/**
 * Employ vue native functionality to get defaults for prop
 */
function getDefaultValue <T extends string> (propName: T, propOptions: PropOptions<T>, emptyObject) {
  const defaultValue = getPropDefaultValue(propName, propOptions, emptyObject)
  return defaultValue + ''
}

function convertComponentPropToApiDocs <T extends string> (propName: T, propOptionsRecord: Record<string, PropOptions<T>>): ComponentOptionsApiDocs {
  return {
    types: getTypes(propOptionsRecord[propName]),
    required: !!propOptionsRecord[propName].required,
    default: getDefaultValue(propName, propOptionsRecord, emptyObject),
  }
}

export function convertComponentToApiDocs (componentOptions: ComponentOptions) {
  const testComponentInstance = new (Vue.extend(componentOptions))()
  const props = testComponentInstance.$options.props

  // Warn handler will complain
  // const warnHandler = Vue.config.warnHandler
  // Vue.config.warnHandler = noop

  const propsApiDocs = {}
  for (const propName in props) {
    propsApiDocs[hyphenate(propName)] = convertComponentPropToApiDocs(propName, props)
  }

  // Vue.config.warnHandler = warnHandler

  return {
    props: propsApiDocs,
  }
}
