import { ref, getCurrentInstance, computed, ExtractPropTypes, Ref } from 'vue'
import { clamp } from '../../../utils/clamp'

import { useStateful, useStatefulProps, useFormFieldProps } from '../../../composables'

import { RatingValue } from '../types'
import { useElementHovered } from '../../../composables/std/browser/useElementHovered'

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

export const useRating = (props: ExtractPropTypes<typeof useRatingProps> & ExtractPropTypes<typeof useFormFieldProps>, el: Ref<HTMLElement | undefined>) => {
  const { emit } = getContext()
  const isHovered = useElementHovered(el)
  const modelValue = useStateful(props, emit)

  const hoveredValue = ref(0)
  const visibleValue = computed(() => !props.disabled && !props.readonly && props.hover && isHovered.value ? hoveredValue.value : modelValue.value)

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
    onItemValueUpdate,
    onItemHoveredValueUpdate,
    getItemValue,
  }
}
