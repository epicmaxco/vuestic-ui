import { UnwrapRef } from "vue"

// TODO: Maybe create server for better tree-shaking...
const components = import.meta.glob('../page-configs/**/examples/*.vue')
// @ts-ignore-next-line
const rawText = import.meta.glob('/page-configs/**/examples/*.vue', { assert: { type: 'raw' }})

type PromiseResolveType<P> = P extends Promise<infer R> ? R : never

const isFunction = (cb: any): cb is Function => typeof cb === 'function' 

const useAsyncLoader = <P extends Promise<T>, T = PromiseResolveType<P>>(cb: (() => P) | T) => {
  const promise = isFunction(cb) ? cb() : cb
  const isLoaded = ref(false)
  const result = ref<T | null>(null)

  if (typeof promise === 'object' && 'then' in promise) {
    promise.then((res: any) => { 
      isLoaded.value = true
      result.value = markRaw(res.default) as UnwrapRef<T>
    })
  } else {
    isLoaded.value = true
    result.value = promise as UnwrapRef<T>
  }

  return { isLoaded, result, promise }
}

const getComponent = (pageConfig: string, example: string) => {
  const key = `../page-configs/${pageConfig}/examples/${example}.vue`

  return components[key]
}

const getText = (pageConfig: string, example: string): string => {
  const key = `/page-configs/${pageConfig}/examples/${example}.vue`

  return rawText[key] as any as string // raw assert type returns string
}

/** Loads page-config examples */
export const useExampleReader = (path: string, example: string) => {
  const component = useAsyncLoader(getComponent(path, example))
  const text = useAsyncLoader(getText(path, example))

  const isLoaded = computed(() => component.isLoaded.value && text.isLoaded.value)

  return {
    isLoaded,
    text: text.result,
    component: component.result
  }
}