import { computed, ExtractPropTypes } from 'vue'
import { useColors } from '../../../services/color-config/color-config'
import { RatingValue } from '../types'

export const useVaRatingColorsProps = {
  unselectedColor: { type: String },
  color: { type: String, default: 'primary' },
  modelValue: { type: Number },
}

export const useVaRatingColors = (props: ExtractPropTypes<typeof useVaRatingColorsProps>) => {
  const { getColor, getFocusColor, getTextColor } = useColors()

  const computedColor = computed(() => getColor(props.color))

  const backgroundColor = computed(() => {
    if (props.unselectedColor) { return getColor(props.unselectedColor) }

    return getFocusColor(getColor(props.color))
  })

  const backgroundComputed = computed(() => {
    if (props.modelValue === RatingValue.HALF) {
      return `linear-gradient(90deg, ${computedColor.value} 50%, ${backgroundColor.value} 50%`
    }

    if (props.modelValue === RatingValue.EMPTY) {
      return backgroundColor.value
    }

    return computedColor.value
  })

  const textColorComputed = computed(() => {
    if (props.modelValue === RatingValue.FULL) {
      return getTextColor(computedColor.value)
    }

    return getTextColor(backgroundColor.value)
  })

  return {
    computedColor,
    backgroundComputed,
    textColorComputed,
  }
}
