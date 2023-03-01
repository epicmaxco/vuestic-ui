<template>
  <div
    role="option"
    class="va-select-option"
    :class="optionClass"
    :style="optionStyle"
    :aria-selected="isSelected"
  >
    <va-icon
      v-if="optionIcon"
      size="small"
      class="va-select-option__icon"
      :name="optionIcon"
    />
    {{ optionTextSplitted.start }}
    <span
      v-if="optionTextSplitted.searchedSubString"
      class="va-select-option__highlighted"
    >
      {{ optionTextSplitted.searchedSubString }}
    </span>
    {{ optionTextSplitted.end }}
    <va-icon
      v-show="isSelected"
      class="va-select-option__selected-icon"
      size="small"
      name="va-check"
      :color="optionIconColor"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType } from 'vue'

import { useColors, useColorProps, useBem } from '../../../../composables'

import { VaIcon } from '../../../va-icon'

import { isNilValue } from '../../../../utils/isNilValue'

import type { SelectableOption } from '../../../../composables'

export default defineComponent({
  name: 'VaSelectOption',

  components: { VaIcon },

  props: {
    ...useColorProps,
    disabled: { type: Boolean, default: false },
    option: { type: [Number, String, Boolean, Object] as PropType<SelectableOption>, default: () => ({}) },
    getText: { type: Function as PropType<(option: SelectableOption) => string>, required: true },
    getTrackBy: { type: Function as PropType<(option: SelectableOption) => number | string>, required: true },
    currentOption: { type: [String, Number, Boolean, Object] as PropType<SelectableOption | null>, default: null },
    getSelectedState: { type: Function as PropType<(option: SelectableOption) => boolean>, required: true },
    search: { type: String, default: '' },
    highlightMatchedText: { type: Boolean, default: true },
    inputFocused: { type: Boolean, default: false },
    minSearchChars: { type: Number, default: 0 },
  },

  setup (props) {
    const { getColor, getHoverColor } = useColors()

    const optionIcon = computed(() => typeof props.option === 'object' ? (props.option.icon as string) : undefined)
    const optionIconColor = computed(() => getColor(props.color))

    const optionText = computed(() => props.getText(props.option))
    const optionTextSplitted = computed(() => {
      const defaultSplit = { start: optionText.value, searchedSubString: '', end: '' }

      if (!optionText.value || !props.search || !props.highlightMatchedText || props.search.length < props.minSearchChars) {
        return defaultSplit
      }

      const substringStartIndex = optionText.value.toLowerCase().indexOf(props.search.toLowerCase())

      if (substringStartIndex < 0) { return defaultSplit }

      const start = optionText.value.slice(0, substringStartIndex)
      const searchedSubString = optionText.value.slice(substringStartIndex, substringStartIndex + props.search.length)
      const end = optionText.value.slice(substringStartIndex + props.search.length)

      return { start, searchedSubString, end }
    })

    const isSelected = computed(() => props.getSelectedState(props.option))
    const isFocused = computed(() => {
      if (isNilValue(props.currentOption)) { return false }
      if (typeof props.option === 'string') { return props.option === props.currentOption }

      return props.getTrackBy(props.currentOption) === props.getTrackBy(props.option)
    })

    const optionClass = useBem('va-select-option', () => ({
      selected: isSelected.value,
    }))

    const optionStyle = computed(() => ({
      color: isSelected.value ? getColor(props.color) : 'inherit',
      backgroundColor: isFocused.value ? getHoverColor(getColor(props.color)) : 'transparent',
      cursor: props.disabled ? 'default' : undefined,
      opacity: props.disabled ? 'var(--va-select-option-list-option-disabled-opacity)' : undefined,
    }))

    return {
      getColor,
      optionIcon,
      isSelected,
      optionStyle,
      optionClass,
      optionIconColor,
      optionTextSplitted,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-select-option {
  min-height: var(--va-select-option-list-option-min-height);
  padding: var(--va-select-option-list-option-padding);
  display: var(--va-select-option-list-option-display);
  align-items: var(--va-select-option-list-option-align-items);
  word-break: var(--va-select-option-list-option-word-break);
  cursor: var(--va-select-option-list-option-cursor);

  &__icon {
    margin-right: var(--va-select-option-list-option-icon-margin-right);
  }

  &__selected-icon {
    margin-left: var(--va-select-option-list-option-selected-icon-margin-left);
    font-size: var(--va-select-option-list-option-selected-icon-font-size);
  }

  &__highlighted {
    color: var(--va-select-option-list-option-highlighted-color);
    background-color: var(--va-select-option-list-option-highlighted-background-color);
    border-radius: var(--va-select-option-list-option-highlighted-border-radius);
    margin: var(--va-select-option-list-option-highlighted-margin);
    padding: var(--va-select-option-list-option-highlighted-padding);
  }
}
</style>
