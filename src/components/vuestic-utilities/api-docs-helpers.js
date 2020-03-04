import Vue from 'vue'
import { validateProp } from 'vue/src/core/util/props'

export function convertComponentToApiDocs (componentOptions) {
  const testComponentInstance = new (Vue.extend(this.componentOptions))()
  const props = testComponentInstance.$options.props

  const propsApiDocs = {}
  for (const propName in props) {
    propsApiDocs[propName] = convertComponentPropToApiDocs(props[propName])
  }
}

function convertComponentPropToApiDocs (componentProp) {
  const defaultOptions = validateProp(componentProp)
}
