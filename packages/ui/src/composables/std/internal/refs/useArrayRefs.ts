import { shallowRef, onBeforeUpdate } from 'vue'

// TODO: Use Template Ref, we're not sure if itemsRefs is html element or vue component

/**
 * @usage use setItemRef function as :ref property on v-for construction (or without v-for)
 * @link https://v3.vuejs.org/guide/migration/array-refs.html
*/
export const useArrayRefs = () => {
  // TODO: Change to TemplateRef
  const itemRefs = shallowRef<HTMLElement[]>([])

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
