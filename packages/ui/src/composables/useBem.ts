import { computed, Ref, unref, reactive } from 'vue'
import { __DEV__ } from '../utils/global-utils'

type ComputedClasses = Record<string, any> & {
  get asObject(): Record<string, true>
  get asArray(): string[]
  get asString(): string
}

/**
 * @description
 * @param prefix string that classes start with (base BEM class).
 * @param modifiers list of options that will serve as state BEM modifiers.
 * @returns computed classes starting with "prefix" and ending with form state BEM modifier.
 * @example
 *  const result = useBem('va-component', computed(() => pick(props, ['success'])))
 *  // if success is true
 *  result = { 'va-component--success': true }
 *  result.asArray = ['va-component--success']
 *  result.asString = 'va-component--success'
 */
export const useBem = (
  prefix = '',
  modifiers: Record<string, boolean> | Ref<Record<string, boolean>>,
) => {
  if (__DEV__ && !prefix) {
    console.warn('You must pass the @param "prefix" to the useBem hook!')
  }

  const computedBemClassesObject = computed(() => {
    return Object
      .entries(unref(modifiers))
      .reduce((classesObj: Record<string, boolean>, [modifiersName, value]) => {
        if (value) { classesObj[`${prefix}--${modifiersName}`] = true }
        return classesObj
      }, {})
  })

  const computedBemClassesArray = computed(() => Object.keys(computedBemClassesObject.value))

  const computedBemClassesString = computed(() => computedBemClassesArray.value.join(' '))

  const proxy = new Proxy({}, {
    get (_, key: string) {
      const isKeyPassed = ['asObject', 'asArray', 'asString'].includes(key)

      let value
      switch (key) {
        case 'asArray':
          value = computedBemClassesArray
          break
        case 'asString':
          value = computedBemClassesString
          break
        default:
          value = computedBemClassesObject
      }
      return isKeyPassed ? value : value.value
    },
  }) as unknown as ComputedClasses

  return reactive(proxy)
}
