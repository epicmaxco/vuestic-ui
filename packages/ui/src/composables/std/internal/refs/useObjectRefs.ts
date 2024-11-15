import { shallowRef, onBeforeUpdate } from 'vue'
import { TemplateRef } from '../../../../utils/types/template-ref'

/**
 * @usage use setItemRef function as :ref property on v-for construction (or without v-for)
 * @link https://v3.vuejs.org/guide/migration/array-refs.html
*/
export const useObjectRefs = () => {
  const itemRefs = shallowRef<Record<string | number, TemplateRef>>({})

  const setItemRef = (key: string | number) => (el: any) => {
    if (!el) { return }

    itemRefs.value[key] = el

    return String(key)
  }

  onBeforeUpdate(() => { itemRefs.value = {} })

  return { itemRefs, setItemRef }
}
