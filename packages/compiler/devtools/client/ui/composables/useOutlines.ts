import { onBeforeUnmount, onMounted } from "vue"

const outlines = [] as Array<() => unknown>

export const useOutlines = () => {
  return () => {
    outlines.forEach(recalculate => recalculate())
  }
}

export const useOutline = (recalculate: () => unknown) => {
  onMounted(() => {
    outlines.push(recalculate)
  })

  onBeforeUnmount(() => {
    const index = outlines.indexOf(recalculate)
    if (index !== -1) {
      outlines.splice(index, 1)
    }
  })
}