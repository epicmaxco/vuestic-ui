import { DefineComponent, Ref } from "vue"
import type { ComponentOptionsWithProps } from './types'
import { resolveComponentProps } from "./resolveComponentProps"
import { resolveComponentEmits } from "./resolveComponentEmits"
import { resolveComponentMethods } from "./resolveComponentMethods"


const getComponentOptions = (component: DefineComponent): ComponentOptionsWithProps => {
  if (component.options) {
    return component.options
  }

  if (component.__vccOpts || component.__b) {
    return { ...component.__vccOpts, ...component.__b }
  }

  return component as any
}

type MaybeRef<T> = T | Ref<T> 

export const useComponentApi = (component: MaybeRef<DefineComponent>) => {
  return computed(() => {
    const unComponent = unref(component)
    const options = getComponentOptions(unComponent)
    const componentName = unComponent.name

    return {
      componentName,
      props: resolveComponentProps(options),
      emits: resolveComponentEmits(options),
      methods: resolveComponentMethods(options) 
    }
  })
}

export type ComponentApi = ReturnType<typeof useComponentApi>['value']