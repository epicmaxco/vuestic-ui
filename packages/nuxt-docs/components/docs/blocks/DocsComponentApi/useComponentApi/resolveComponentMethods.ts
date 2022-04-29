import { ComponentOptions } from "vue";

export const resolveComponentMethods = (options: ComponentOptions) => {
  if (!options.methods) { return [] }
  
  return Object.keys(options.methods)
}