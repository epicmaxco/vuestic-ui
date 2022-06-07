import { onBeforeUpdate, shallowRef } from 'vue'

/**
 * @usage use setItemRef function as :ref property on v-for construction (or without v-for)
 * @link https://v3.vuejs.org/guide/migration/array-refs.html
*/
export const useArrayRefs = () => {
  const itemRefs = shallowRef<HTMLElement[]>([])

  const setItemRef = (el: any, index?: number) => {
    if (!el) { return }

    if (index !== undefined) {
      itemRefs.value[index] = el
    } else {
      itemRefs.value.push(el)
    }
  }

  onBeforeUpdate(() => {
    itemRefs.value = []
  })

  return {
    itemRefs,
    setItemRef,
  }
}
