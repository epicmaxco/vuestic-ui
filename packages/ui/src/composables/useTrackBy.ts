import { PropType, ExtractPropTypes } from 'vue'

import { warn } from '../services/utils'

export const useTrackByProps = {
  trackBy: { type: [String, Number] as PropType<string | number>, default: '' },
}

export const useTrackBy = (props: ExtractPropTypes<typeof useTrackByProps>) => {
  const getKey = (
    item: Array<any> | Record<string, any>,
    index: number,
    defaultValue?: any,
  ) => {
    if (props.trackBy && item && typeof item === 'object') {
      const isArrayItem = Array.isArray(item)

      let key: any
      if (isArrayItem && !isNaN(+props.trackBy)) { key = (item as any[])[+props.trackBy] }
      if (!isArrayItem) { key = (item as Record<string, any>)[props.trackBy] }

      if (key || key === 0) { return key }

      warn(`${isArrayItem ? 'Index' : 'Key'} '${props.trackBy}' wasn't found in provided ${isArrayItem ? 'array' : 'object'}: `, item)
    }

    return defaultValue
  }

  return { getKey }
}
