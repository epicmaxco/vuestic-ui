// @ts-nocheck
import Vue, { ComponentOptions } from 'vue'
import { getTypes } from './api-docs-helpers'
// @ts-ignore
import { getPropDefaultValue } from './vue-src-no-flow/core/util/props'
// @ts-ignore
import { hyphenate, emptyObject } from './vue-src-no-flow/shared/util'
import { PropOptions } from 'vue/types/options'
import { CombinedVueInstance } from 'vue/types/vue'

export type PropOptionsCompiled = {
  types: string[];
  required: boolean;
  default: any;
}
type CompiledComponentOptions = { props: Record<string, PropOptionsCompiled> }
type TestVueInstance = CombinedVueInstance<any, any, any, any, any>

/**
 * Employ vue native functionality to get defaults for prop
 */
function getDefaultValue<T extends string> (vm: TestVueInstance, propOptions: PropOptions<T>) {
  const defaultValue = getPropDefaultValue(vm, propOptions, emptyObject)
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

function convertComponentPropToApiDocs <T extends string> (propName: T, propOptionsRecord: Record<string, PropOptions<T>>, vm: TestVueInstance): PropOptionsCompiled {
  return {
    types: getTypes(propOptionsRecord[propName]),
    required: !!propOptionsRecord[propName].required,
    default: getDefaultValue(vm, propOptionsRecord[propName]),
  }
}

export function compileComponentOptions (componentOptions: ComponentOptions<Vue>): CompiledComponentOptions {
  const testComponentInstance = new (Vue.extend(componentOptions))({ propsData: {} })
  const props = testComponentInstance.$options.props

  const propsApiDocs: any = {}
  for (const propName in props) {
    propsApiDocs[hyphenate(propName)] = convertComponentPropToApiDocs(propName, props as any, testComponentInstance)
  }

  return {
    props: propsApiDocs,
  }
}
