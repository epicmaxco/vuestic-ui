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

/**
 * This composable must be used to make global variables. This global is shared in app context, rather then
 * in window context. This is useful to avoid global variables in window context in multiple app mode, ssr
 * or cjs build can mess up global variables
 */
export const useAppGlobal = <T>(key: string, defaultValue: T): WritableComputedRef<T> => {
  const globalObject = getGlobalObject()

  if (!(key in globalObject)) {
    globalObject[key] = defaultValue
  }

  return computed({
    get: () => globalObject[key],
    set: (value: T) => {
      globalObject[key] = value
    },
  })
}
