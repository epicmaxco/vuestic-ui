import { ref } from "vue"

export const useColor = (props: Record<string, any>) => {
  return ref('red')
}
