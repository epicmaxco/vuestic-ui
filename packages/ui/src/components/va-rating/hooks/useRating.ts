import clamp from 'lodash/clamp'
import { useHover } from '../../../composables/useHover'
import { ref, getCurrentInstance, computed, ExtractPropTypes } from 'vue'
import { useStateful, useStatefulProps } from '../../../composables/useStateful'
import { RatingValue } from '../types'

const getContext = <P extends Record<string, any> = Record<string, any>, E extends string = string>() => {
  const instance = getCurrentInstance()
  if (!instance) { throw new Error('useRating hooks must be used on top of setup function') }
  return {
    props: instance.props,
    emit: instance.emit,
  } as {
    props: P,
    emit: (event: E, ...args: any[]) => void
  }
}

export const useRatingProps = {
  ...useStatefulProps,
  modelValue: { type: Number, default: 0 },
  clearable: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
}

export const useRating = (props: ExtractPropTypes<typeof useRatingProps>) => {
  const { emit } = getContext()
  const { isHovered, onMouseEnter, onMouseLeave } = useHover()
  const { valueComputed: modelValue } = useStateful(props, emit)

  const hoveredValue = ref(0)

  const visibleValue = computed(() => props.hover && isHovered.value ? hoveredValue.value : modelValue.value)

  const onItemValueUpdate = (itemIndex: number, newValue: number) => {
    const newModelValue = itemIndex + newValue
    if (props.clearable) {
      if (modelValue.value === newModelValue) {
        modelValue.value = 0
        return
      }
    }
    modelValue.value = newModelValue
  }

  const onItemHoveredValueUpdate = (itemIndex: number, newValue: number) => {
    if (!props.hover) { return }
    hoveredValue.value = itemIndex + newValue
  }

  const getItemValue = (itemIndex: number) => {
    const itemValue = visibleValue.value - itemIndex
    return clamp(itemValue, RatingValue.EMPTY, RatingValue.FULL)
  }

  return {
    visibleValue,
    modelValue,
    hoveredValue,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    onItemValueUpdate,
    onItemHoveredValueUpdate,
    getItemValue,
  }
}
