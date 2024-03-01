import { WritableComputedRef, computed, getCurrentInstance, reactive } from 'vue'

const getGlobalObject = () => {
  const vm = getCurrentInstance()

  const app = vm?.appContext.app

  const { globalProperties } = app!.config

  if ('$vaGlobalVariable' in globalProperties) {
    return globalProperties.$vaGlobalVariable
  }

  globalProperties.$vaGlobalVariable = reactive({})

  return globalProperties.$vaGlobalVariable
}

export const useAppGlobal = <T>(key: string, defaultValue: T): WritableComputedRef<T> => {
  const globalObject = getGlobalObject()

  if (key in globalObject) {
    return globalObject[key]
  }

  globalObject[key] = defaultValue

  return computed({
    get: () => globalObject[key],
    set: (value: T) => {
      globalObject[key] = value
    },
  })
}
