import Vue from 'vue'
// @ts-ignore
import {
  getPropDefaultValue,
  getType,
} from './vue-src-no-flow/core/util/props'
import { emptyObject, hyphenate } from './vue-src-no-flow/shared/util'

Vue.config.warnHandler = () => {
}

export function getTypes (componentProp) {
  if (!componentProp.type) {
    return ['any']
  }

  const types = Array.isArray(componentProp.type) ? componentProp.type : [componentProp.type]
  return types.map(getType)
}

export function convertComponentToApiDocs (componentOptions) {
  const testComponentInstance = new (Vue.extend(componentOptions))()
  const props = testComponentInstance.$options.props

  const propsApiDocs = {}
  for (const propName in props) {
    propsApiDocs[hyphenate(propName)] = convertComponentPropToApiDocs(propName, props)
  }

  return {
    props: propsApiDocs,
  }
}

function convertComponentPropToApiDocs (propName, propOptions) {
  console.log('componentProp', propName)
  return {
    types: getTypes(propOptions[propName]),
    required: !!propOptions[propName].required,
    default: getDefaultValue(propName, propOptions, emptyObject),
  }
}

function getDefaultValue (propName, propOptions) {
  const defaultValue = getPropDefaultValue(propName, propOptions, emptyObject)
  return defaultValue + ''
}
