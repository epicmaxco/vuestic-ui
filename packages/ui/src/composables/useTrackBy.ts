import { PropType, ExtractPropTypes } from 'vue'

import { warn } from '../utils/console'
import { isFunction } from '../utils/is-function'

type AnyRecordOrArray = Array<any> | Record<string, any>

export const useTrackByProps = {
  trackBy: {
    type: [String, Number, Function] as PropType<string | number | ((item: AnyRecordOrArray) => string | number)>,
    default: '',
  },
}

export const useTrackBy = (props: ExtractPropTypes<typeof useTrackByProps>) => {
  const getKey = (
    item: AnyRecordOrArray,
    index: number,
    defaultValue?: any,
  ) => {
    if (props.trackBy && item && typeof item === 'object' && !isFunction(props.trackBy)) {
      const isArrayItem = Array.isArray(item)

      let key: any
      if (isArrayItem && !isNaN(+props.trackBy)) { key = (item as any[])[+props.trackBy] }
      if (!isArrayItem) { key = (item as Record<string, any>)[props.trackBy] }

      if (key || key === 0) { return key }

      warn(`${isArrayItem ? 'Index' : 'Key'} '${props.trackBy}' wasn't found in provided ${isArrayItem ? 'array' : 'object'}: `, item)
    }

    if (isFunction(props.trackBy)) {
      return props.trackBy(item)
    }

    return defaultValue
  }

  return { getKey }
}
