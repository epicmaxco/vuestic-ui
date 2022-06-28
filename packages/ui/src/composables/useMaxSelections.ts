import { Ref } from 'vue'

/**
 * You could add these props to any component by destructuring them inside props option.
 * @example
 * props: { ...useMaxSelectionsProps, componentsOwnProp, etc. }
 * It's better to add props at the beginning, to make sure that Component own props will be used instead in case of collision
 */
export const useMaxSelectionsProps = {
  maxSelections: {
    type: [Number, String],
    default: undefined,
  },
}

export function useMaxSelections (
  selections: Ref<any[]>,
  maxSelections: Ref<number | string | undefined>,
  emit: (event: 'update:modelValue', ...args: any[]) => void,
) {
  const exceedsMaxSelections = (): boolean => {
    if (maxSelections.value === undefined || isNaN(+maxSelections.value)) { return false }
    return selections.value.length >= maxSelections.value
  }

  const addOption = (optionToAdd: any): void => {
    const newSelectedOptions = [...selections.value, optionToAdd]
    emit('update:modelValue', newSelectedOptions)
  }

  return {
    exceedsMaxSelections,
    addOption,
  }
}
