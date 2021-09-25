import { computed, isRef, Ref } from 'vue'

const getNumbersArray = (length: number) => Array
  .from(Array(length).keys())
  .map((k) => k + 1)

export const useNumbersArray = (
  size: Ref<number> | number,
  start?: Ref<number>,
  end?: Ref<number>,
) => {
  const safeSize: number = isRef(size) ? size.value : size

  const array = computed(() => getNumbersArray(safeSize))

  const slicedArray = computed(() => array.value.slice(start?.value, end?.value))

  return [slicedArray, array]
}
