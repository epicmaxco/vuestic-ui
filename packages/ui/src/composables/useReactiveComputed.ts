import { computed, unref, WritableComputedOptions, ComputedGetter, isRef, reactive } from 'vue'

export const useReactiveComputed = <T extends object>(obj: WritableComputedOptions<T> | ComputedGetter<T>) => {
  const objectRef = typeof obj === 'function' ? computed(obj as ComputedGetter<T>) : computed(obj as WritableComputedOptions<T>)

  const proxy = new Proxy(objectRef, {
    get (target, p: string, receiver) {
      return unref(Reflect.get(objectRef.value, p, receiver))
    },
    set (target, p, value) {
      if (isRef((objectRef.value as any)[p]) && !isRef(value)) {
        (objectRef.value as any)[p].value = value
      } else {
        (objectRef.value as any)[p] = value
      }
      return true
    },
    deleteProperty (target, p) {
      return Reflect.deleteProperty(objectRef.value, p)
    },
    has (target, p) {
      return Reflect.has(objectRef.value, p)
    },
    ownKeys () {
      return Object.keys(objectRef.value)
    },
    getOwnPropertyDescriptor () {
      return {
        enumerable: true,
        configurable: true,
      }
    },
  })

  return reactive(proxy) as T
}
