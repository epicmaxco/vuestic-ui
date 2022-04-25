import { ComponentOptions } from "vue"

export const resolveComponentEmits = (options: ComponentOptions): string[] => {
  if (!options.emits) { 
    return []
  }
  
  const emits = options.emits

  return emits
}