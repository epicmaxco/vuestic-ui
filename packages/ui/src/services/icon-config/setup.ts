import { getIconConfiguration } from './get-icon'

/**
 * Copy object properties if its not undefined
 * @example
 * ```
 * { name: 'test', age: undefined} -> { name: 'test' }
 * ```
 */
export function copyObjectWithoutUndefined (obj: any) {
  return Object.keys({ ...obj }).reduce((acc, key) => {
    return obj[key] !== undefined ? { [key]: obj[key], ...acc } : acc
  }, {})
}

export const useIcons = (props: any) => {
  return {
    // TODO: export here function that can dynamically change icons config
    getIcon: (name: string) => getIconConfiguration(name),
  }
}
