import { useId } from 'vue'

export const useComponentUuid = () => {
  const id = useId()

  return `va-${id}`
}
