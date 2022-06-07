import { computed, Ref, unref, ComputedRef } from 'vue'
import { __DEV__ } from '../utils/global-utils'

type ComputedClasses = Ref<Record<string, any>> & {
  asObject: ComputedRef<Record<string, true>>
  asArray: ComputedRef<string[]>
  asString: ComputedRef<string>
}

/**
 * @description creates BEM modifiers based on transferred prefix (base BEM class) & modifiers list.
 * @param prefix string that classes start with (base BEM class).
 * @param modifiers list of options that will serve as state BEM modifiers.
 * @returns computed classes starting with "prefix" and ending with form state BEM modifier.
 * @example
 *  const result = useBem('va-component', computed(() => pick(props, ['success'])))
 *  // if success is `true`
 *  result.value: { 'va-component--success': true }
 *  result.asObject.value: { 'va-component--success': true }
 *  result.asArray.value: ['va-component--success']
 *  result.asString.value: 'va-component--success'
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

  return new Proxy({}, {
    get (_, key: string) {
      switch (key) {
        case 'asArray':
          return computedBemClassesArray
        case 'asString':
          return computedBemClassesString
        case 'asObject':
          return computedBemClassesObject
        default:
          return computedBemClassesObject
      }
    },
  }) as ComputedClasses
}
