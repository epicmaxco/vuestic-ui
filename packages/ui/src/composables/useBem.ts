import { computed, Ref, unref } from 'vue'

import { camelCaseToKebabCase } from '../utils/text-case'

/**
 * @description creates BEM modifiers based on transferred prefix (base BEM class) & modifiers list.
 * camelCase modifiers names will be transformed to the kebab-case.
 * @param prefix string that classes start with (base BEM class).
 * @param modifiers list of options that will serve as state BEM modifiers.
 * @returns computed classes starting with "prefix" and ending with form state BEM modifier.
 * @example
 *  const result = useBem('va-component', computed(() => pick(props, ['success, noError'])))
 *  // if success & noError are `true`
 *  { ...result }: { 'va-component--success': true, va-component--no-error: true }
 */
export const useBem = <ModifierKey extends string, Prefix extends string>(
  prefix: Prefix,
  modifiers: Record<ModifierKey, boolean | undefined> | Ref<Record<ModifierKey, boolean | undefined>> | (() => Record<ModifierKey, boolean | undefined>),
) => {
  const modifiersList = computed(() => typeof modifiers === 'function' ? modifiers() : unref(modifiers))

  const computedBemClassesObject = computed(() => {
    return Object
      .entries(unref(modifiersList))
      .reduce((classesObj: Record<string, boolean>, [modifierName, value]) => {
        if (value) { classesObj[`${prefix}--${camelCaseToKebabCase(modifierName)}`] = true }
        return classesObj
      }, {})
  })

  return computedBemClassesObject
}
