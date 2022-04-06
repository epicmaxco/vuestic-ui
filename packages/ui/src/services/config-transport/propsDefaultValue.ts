import { DefineComponent } from 'vue'

export const getPropsDefaultValue = <T extends DefineComponent>(component: T) => {
  const definitions = component.props

  return Object.entries(definitions).reduce((acc, [key, definition]: any[]) => {
    const defaultValue = definition.default

    acc[key] = defaultValue === 'function' ? defaultValue() : defaultValue

    return acc
  }, {} as any)
}
