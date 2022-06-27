import { computed, Ref, unref, ComputedRef } from 'vue'

import isFunction from 'lodash/isFunction.js'
import kebab from 'lodash/kebabCase.js'

import { __DEV__ } from '../utils/global-utils'

type Key<Prefix extends string, ModifierKey extends string> = `${Prefix}--${ModifierKey | string}`

type ClassesObject<Key extends string> = Record<Key, boolean>

type ComputedClasses<Key extends string> = ClassesObject<Key> & {
  // TODO: How to remove it from spread?
  get asObject(): ComputedRef<ClassesObject<Key>>
  get asArray(): ComputedRef<Key[]>
  get asString(): ComputedRef<string>
}

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
 *  result.asObject.value: { 'va-component--success': true, va-component--no-error: true }
 *  result.asArray.value: ['va-component--success', 'va-component--no-error']
 *  result.asString.value: 'va-component--success va-component--no-error'
 */
export const useBem = <ModifierKey extends string, Prefix extends string>(
  prefix: Prefix,
  modifiers: Record<ModifierKey, boolean> | Ref<Record<ModifierKey, boolean>> | (() => Record<ModifierKey, boolean>),
) => {
  if (__DEV__ && !prefix) {
    console.warn('You must pass the @param "prefix" to the useBem hook!')
  }

  const modifiersList = computed(() => isFunction(modifiers) ? modifiers() : unref(modifiers))

  const computedBemClassesObject = computed(() => {
    return Object
      .entries(unref(modifiersList))
      .reduce((classesObj: Record<string, boolean>, [modifierName, value]) => {
        if (value) { classesObj[`${prefix}--${kebab(modifierName)}`] = true }
        return classesObj
      }, {})
  })

  const computedBemClassesArray = computed(() => Object.keys(computedBemClassesObject.value))

  const computedBemClassesString = computed(() => computedBemClassesArray.value.join(' '))

  return new Proxy({}, {
    ownKeys () {
      return Reflect.ownKeys(computedBemClassesObject.value)
    },
    getOwnPropertyDescriptor (_, key) {
      return Reflect.getOwnPropertyDescriptor(computedBemClassesObject.value, key)
    },
    get (_, key: string, receiver: any) {
      switch (key) {
        case 'asArray':
          return computedBemClassesArray
        case 'asString':
          return computedBemClassesString
        case 'asObject':
          return computedBemClassesObject
        default:
          return Reflect.get(computedBemClassesObject.value, key, receiver)
      }
    },
  }) as ComputedClasses<Key<Prefix, ModifierKey>>
}
