import { computed, isRef, Ref } from 'vue'

const getNumbersArray = (length: number) => Array
  .from(Array(length).keys())

export const useNumbersArray = (size: Ref<number> | number) => {
  const safeSize: number = isRef(size) ? size.value : size

  const array = computed(() => getNumbersArray(safeSize))

  return array
}
