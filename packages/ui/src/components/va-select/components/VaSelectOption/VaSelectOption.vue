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
    {{ optionText }}
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
import { defineComponent, PropType, computed } from 'vue'

import { useColors, useColorProps, useBem, SelectableOption } from '../../../../composables'

import { VaIcon } from '../../../va-icon'

export default defineComponent({
  name: 'VaSelectOption',

  components: { VaIcon },

  props: {
    ...useColorProps,
    option: { type: [Number, String, Object] as PropType<SelectableOption>, default: () => ({}) },
    getText: { type: Function as PropType<(option: SelectableOption) => string>, required: true },
    getTrackBy: { type: Function as PropType<(option: SelectableOption) => number>, required: true },
    currentOption: { type: [String, Number, Object] as PropType<SelectableOption | null>, default: null },
    getSelectedState: { type: Function as PropType<(option: SelectableOption) => boolean>, required: true },
  },

  setup (props) {
    const { getColor, getHoverColor } = useColors()

    const optionIcon = computed(() => typeof props.option === 'object' ? (props.option.icon as string) : undefined)
    const optionIconColor = computed(() => getColor(props.color))

    const optionText = computed(() => props.getText(props.option))

    const isSelected = computed(() => props.getSelectedState(props.option))
    const isFocused = computed(() => {
      if (!props.currentOption) { return false }
      if (typeof props.option === 'string') { return props.option === props.currentOption }

      if (!props.getTrackBy) { return false }
      return props.getTrackBy(props.currentOption) === props.getTrackBy(props.option)
    })

    const optionClass = useBem('va-select-option', () => ({
      selected: isSelected.value,
    }))

    const optionStyle = computed(() => ({
      color: isSelected.value ? getColor(props.color) : 'inherit',
      backgroundColor: isFocused.value ? getHoverColor(getColor(props.color)) : 'transparent',
    }))

    return {
      getColor,
      isFocused,
      optionIcon,
      isSelected,
      optionText,
      optionStyle,
      optionClass,
      optionIconColor,
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
}
</style>
