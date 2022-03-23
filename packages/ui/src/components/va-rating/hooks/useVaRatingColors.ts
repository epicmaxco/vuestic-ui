import { computed, ExtractPropTypes } from 'vue'
import { useColors } from '../../../services/color-config/color-config'

export const useVaRatingColorsProps = {
  textColor: { type: String },
  unselectedColor: { type: String },
  color: { type: String, default: 'primary' },
}

export const useVaRatingColors = (props: ExtractPropTypes<typeof useVaRatingColorsProps>) => {
  const { getColor, getFocusColor } = useColors()

  const computedColor = computed(() => getColor(props.color))

  const focusColor = computed(() => {
    if (props.unselectedColor) { return getColor(props.unselectedColor) }

    return getFocusColor(getColor(props.color))
  })

  return {
    computedColor,
    focusColor,
  }
}
