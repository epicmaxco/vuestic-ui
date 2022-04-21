import { UnwrapRef } from "vue"

// TODO: Maybe create server for better tree-shaking...
const components = import.meta.glob('../page-configs/**/*.vue')
// @ts-ignore-next-line
const rawText = import.meta.glob('/page-configs/**/*.vue', { assert: { as: 'raw' } })

type PromiseResolveType<P> = P extends Promise<infer R> ? R : never

const isFunction = (cb: any): cb is Function => typeof cb === 'function'

const useAsyncLoader = <P extends Promise<T>, T = PromiseResolveType<P>>(cb: (() => P)) => {
  const promise = isFunction(cb) ? cb() : cb
  const isLoaded = ref(false)
  const result = ref<T | null>(null)

  promise.then((res: any) => {
    isLoaded.value = true
    result.value = markRaw(res.default) as UnwrapRef<T>
  }).catch(e => {
    console.error('Imported component threw an error', e)
  })

  return { isLoaded, result, promise }
}

const getComponent = (path: string, componentName: string) => {
  const key = `../page-configs/${path}/${componentName}.vue`

  if (!components[key]) {
    throw new Error(`Component "${key}" was not found`)
  }

  return components[key]
}

const getText = (path: string, componentName: string): string => {
  const key = `/page-configs/${path}/${componentName}.vue`

  return rawText[key] as any as string // raw assert type returns string
}

/** Loads page-config components */
export const useComponentReader = (path: string, componentName: string) => {
  const component = useAsyncLoader(getComponent(path, componentName))
  const text = getText(path, componentName)

  return {
    isLoaded: component.isLoaded,
    text: text,
    component: component.result
  }
}
