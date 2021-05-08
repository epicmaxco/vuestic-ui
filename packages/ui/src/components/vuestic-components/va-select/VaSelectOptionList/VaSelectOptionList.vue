<template>
  <div class="va-select-option-list">
    <template v-if="filteredOptions.length">
      <div
        v-for="option in filteredOptions"
        :key="$props.getTrackBy(option)"
        :ref="setItemRef($props.getTrackBy(option))"
        :class="getOptionClass(option)"
        :style="getOptionStyle(option)"
        @click.stop="selectOption(option)"
        @mouseleave="updateHoveredOption(null)"
        @mouseover="updateHoveredOption(option)"
      >
        <va-icon
          v-if="option.icon"
          size="small"
          class="va-select-option-list__option--icon"
          :name="option.icon"
        />
        <span>{{ getText(option) }}</span>
        <va-icon
          v-show="$props.getSelectedState(option)"
          class="va-select-option-list__option--selected-icon"
          size="small"
          name="done"
          :color="colorComputed"
        />
      </div>
    </template>
    <div
      v-else
      class="va-select-option-list no-options"
    >
      {{ noOptionsText }}
    </div>
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'
import { Options, prop, Vue, mixins } from 'vue-class-component'

import { getHoverColor } from '../../../../services/color-config/color-functions'
import ColorMixin from '../../../../services/color-config/ColorMixin'
import VaIcon from '../../va-icon/'

class SelectOptionListProps {
  options = prop<any[]>({ type: Array, default: () => [] })
  noOptionsText = prop<string>({
    type: String,
    default: 'Items not found',
  })

  getSelectedState = prop<Function>({
    type: Function,
    default: () => false,
  })

  getText = prop<Function>({
    type: Function,
  })

  getTrackBy = prop<Function>({
    type: Function,
  })

  multiple = prop<boolean>({ type: Boolean, default: false })
  keyBy = prop<string>({ type: String, default: 'id' })
  textBy = prop<string>({ type: String, default: 'text' })
  search = prop<string>({ type: String, default: '' })
  hintedOption = prop<string | object>({
    type: [String, Object],
    default: null,
  })

  hoveredOption = prop<string | object>({
    type: [String, Object],
    default: null,
  })
}

const SelectOptionListPropsMixin = Vue.with(SelectOptionListProps)

@Options({
  name: 'VaSelectOptionList',
  components: { VaIcon },
  emits: ['select-option', 'update:hoveredOption'],
})
export default class VaSelectOptionList extends mixins(
  ColorMixin,
  SelectOptionListPropsMixin,
) {
  itemRefs: Record<number, any> = {}

  created () {
    watch(() => this.$props.hintedOption, (option: any) => {
      if (option) {
        this.updateHoveredOption(option)
        this.scrollToOption(option)
      }
    })
  }

  beforeUpdate () {
    this.itemRefs = {}
  }

  setItemRef (option: number) {
    return (el: any) => {
      if (el) {
        this.itemRefs[option] = el
      }
    }
  }

  get hoveredOptionComputed () {
    return this.hoveredOption || null
  }

  set hoveredOptionComputed (value: any) {
    this.$emit('update:hoveredOption', value)
  }

  get filteredOptions () {
    if (!this.$props.search) {
      return this.$props.options as []
    }

    return (this.$props.options as []).filter((option: string) => {
      const optionText = (this.$props.getText as Function)(option).toUpperCase()
      const search = (this.$props.search as string).toUpperCase()
      return optionText.includes(search)
    })
  }

  selectOption (option: any): void {
    this.$emit('select-option', option)
  }

  getOptionClass (option: any) {
    return {
      'va-select-option-list__option': true,
      'va-select-option-list__option--selected': (this.$props.getSelectedState as Function)(option),
    }
  }

  getOptionStyle (option: any) {
    return {
      color: (this.$props.getSelectedState as Function)(option) ? this.colorComputed : 'inherit',
      backgroundColor: this.isHovered(option) ? getHoverColor(this.colorComputed) : 'transparent',
    }
  }

  isHovered (option: any) {
    return this.hoveredOptionComputed
      ? typeof option === 'string' ? option === this.hoveredOptionComputed : this.hoveredOptionComputed[this.keyBy] === option[this.keyBy]
      : false
  }

  updateHoveredOption (option: string[] | string): void {
    if (option) {
      this.hoveredOptionComputed = typeof option === 'string' ? option : { ...option }
    } else {
      this.hoveredOptionComputed = null
    }
  }

  public hoverPreviousOption () {
    if (!this.hoveredOptionComputed) {
      // Hover last option from list
      this.filteredOptions.length && this.updateHoveredOption(this.filteredOptions[this.filteredOptions.length - 1])
    } else {
      const hoveredOptionIndex: any =
        this.filteredOptions.findIndex((option: any) =>
          (this.$props.getText as Function)(option) === (this.$props.getText as Function)(this.hoveredOptionComputed))
      if (this.filteredOptions[hoveredOptionIndex - 1]) {
        this.hoveredOptionComputed = this.filteredOptions[hoveredOptionIndex - 1]
      }
    }
    this.scrollToOption(this.hoveredOptionComputed)
  }

  public hoverNextOption () {
    if (!this.hoveredOptionComputed) {
      // Hover first option from list
      this.filteredOptions.length && this.updateHoveredOption(this.filteredOptions[0])
    } else {
      const hoveredOptionIndex: any =
        this.filteredOptions.findIndex((option: any) =>
          (this.$props.getText as Function)(option) === (this.$props.getText as Function)(this.hoveredOptionComputed))
      if (this.filteredOptions[hoveredOptionIndex + 1]) {
        this.hoveredOptionComputed = this.filteredOptions[hoveredOptionIndex + 1]
      }
    }
    this.scrollToOption(this.hoveredOptionComputed)
  }

  scrollToOption (option: any) {
    const optionElement: HTMLElement = this.itemRefs[(this.$props.getTrackBy as Function)(option)]
    if (!optionElement) { return }

    // Scroll list to hinted option position
    optionElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
  }
}
</script>
<style lang="scss">
@import "../../../vuestic-sass/resources/resources";
@import 'variables';

.va-select-option-list {
  display: var(--va-select-option-list-display);
  flex-direction: var(--va-select-option-list-flex-direction);
  width: var(--va-select-option-list-width);
  list-style: var(--va-select-option-list-list-style);
  max-height: 200px;

  &__option {
    cursor: var(--va-select-option-list-option-cursor);
    display: var(--va-select-option-list-option-display);
    align-items: var(--va-select-option-list-option-align-items);
    padding: var(--va-select-option-list-option-padding);
    min-height: var(--va-select-option-list-option-min-height);
    word-break: var(--va-select-option-list-option-word-break);

    &--icon {
      margin-right: var(--va-select-option-list-icon-margin-right);
    }

    &--selected-icon {
      margin-left: var(--va-select-option-list-selected-icon-margin-left);
      font-size: var(--va-select-option-list-selected-icon-font-size);
    }
  }

  &.no-options {
    padding: 0.5rem;
  }
}
</style>
