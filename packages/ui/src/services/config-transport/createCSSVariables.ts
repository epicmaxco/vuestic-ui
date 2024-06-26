import { ComponentInternalInstance, Ref, computed } from 'vue'
import { cssVariableName } from '../color/utils'
import { Props } from './shared'
import { useColors } from '../../composables'

export const createCSSVariables = (instance: ComponentInternalInstance, attributes: Props) => {
  const name = instance.type.name

  const { getColorStrict } = useColors()

  return computed(() => {
    const keys = Object.keys(attributes)

    const variables = new Map<string, string>()

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      let value = String(attributes[key])

      if (!key.startsWith('style:')) { continue }

      const color = getColorStrict(value, true)

      if (color) {
        value = color
      }

      variables.set(cssVariableName(name?.slice(2) + '-' + key.slice(6)), String(value))
    }

    return variables
  })
}
