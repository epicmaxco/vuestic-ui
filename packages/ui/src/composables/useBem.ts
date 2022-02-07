import { computed, Ref, unref } from 'vue'

export const useBem = (baseClass: string) => {
  const createModifiersClasses = (modifiersCb: () => Record<string, boolean>, classes: string[] | Ref<string[]> = []) => {
    return computed(() => {
      const modifiers = modifiersCb()
      return [
        baseClass,
        ...unref(classes),
        ...Object
          .keys(modifiers)
          .filter((modifierName) => modifiers[modifierName])
          .map((modifierName) => `${baseClass}--${modifierName}`),
      ]
    })
  }

  return {
    createModifiersClasses,
  }
}
