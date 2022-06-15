import { onBeforeUpdate, shallowRef, ComponentPublicInstance } from 'vue'

type TemplateRef = HTMLElement | (ComponentPublicInstance & HTMLElement)

/**
 * @usage use setItemRef function as :ref property on v-for construction (or without v-for)
 * @link https://v3.vuejs.org/guide/migration/array-refs.html
*/
export const useArrayRefs = () => {
  const itemRefs = shallowRef<TemplateRef[]>([])

  const setItemRef = (el: any) => {
    if (!el) { return }

    itemRefs.value.push(el)
  }

  const setItemRefByIndex = (index: number) => (el: any) => {
    if (!el) { return }

    itemRefs.value[index] = el
  }

  onBeforeUpdate(() => {
    itemRefs.value = []
  })

  return {
    itemRefs,
    setItemRef,
    setItemRefByIndex,
  }
}
