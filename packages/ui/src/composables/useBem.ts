import { computed, Ref, unref } from 'vue'
import { __DEV__ } from '../utils/global-utils'

export const useBem = (
  prefix: string | undefined,
  modifiers: Record<string, boolean> | Ref<Record<string, boolean>>,
  includeStandAlonePrefix = false): Record<string, Ref<Record<string, boolean>> | Ref<string[]>> => {
  if (__DEV__ && !prefix) {
    console.warn('You must pass the @param "prefix" to the useForm/useBem hook!')
  }

  const computedBemClassesObject = computed(() => {
    const res: Record<string, boolean> = {}
    !!prefix && includeStandAlonePrefix && Object.assign(res, { [prefix]: true })
    Object.entries(unref(modifiers)).forEach(([modifierName, value]) => {
      Object.assign(res, { [`${prefix || ''}--${modifierName}`]: value })
    })
    return res
  })

  const computedBemClassesArray = computed(() => {
    const res: string[] = []
    Object.entries(computedBemClassesObject.value).forEach(([modifierName, value]) => {
      value && res.push(modifierName)
    })
    return res
  })

  return { computedBemClassesObject, computedBemClassesArray }
}
