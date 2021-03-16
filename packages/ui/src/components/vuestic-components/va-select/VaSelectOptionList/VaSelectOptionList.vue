<template>
  <div class="va-select-option-list">
    <template v-if="filteredOptions.length">
      <div
        v-for="option in filteredOptions"
        :key="$props.getTrackBy(option)"
        :class="getOptionClass(option)"
        :style="getOptionStyle(option)"
        @click.stop="selectOption(option)"
        @mouseleave="updateHoveredOption(null)"
        @mouseover="updateHoveredOption(option)"
        :ref="setItemRef($props.getTrackBy(option))"
      >
        <va-icon
          v-if="option.icon"
          :name="option.icon"
          class="va-select-option-list__option--icon"
        />
        <span>{{ getText(option) }}</span>
        <va-icon
          v-show="$props.getSelectedState(option)"
          class="va-select-option-list__option--selected-icon"
          name="done"
        />
      </div>
    </template>
    <div class="va-select-option-list no-options" v-else>
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
}

const SelectOptionListPropsMixin = Vue.with(SelectOptionListProps)

@Options({
  components: { VaIcon },
  emits: ['select-option'],
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

  public hoveredOption: any = null

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
    return this.hoveredOption
      ? typeof option === 'string' ? option === this.hoveredOption : this.hoveredOption[this.keyBy] === option[this.keyBy]
      : false
  }

  updateHoveredOption (option: string[] | string): void {
    if (option) {
      this.hoveredOption = typeof option === 'string' ? option : { ...option }
    } else {
      this.hoveredOption = null
    }
  }

  public hoverPreviousOption () {
    if (!this.hoveredOption) {
      // Hover last option from list
      this.filteredOptions.length && this.updateHoveredOption(this.filteredOptions[this.filteredOptions.length - 1])
    } else {
      const hoveredOptionIndex: any =
        this.filteredOptions.findIndex((option: any) =>
          (this.$props.getText as Function)(option) === (this.$props.getText as Function)(this.hoveredOption))
      if (this.filteredOptions[hoveredOptionIndex - 1]) {
        this.hoveredOption = this.filteredOptions[hoveredOptionIndex - 1]
      }
    }
    this.scrollToOption(this.hoveredOption)
  }

  public hoverNextOption () {
    if (!this.hoveredOption) {
      // Hover first option from list
      this.filteredOptions.length && this.updateHoveredOption(this.filteredOptions[0])
    } else {
      const hoveredOptionIndex: any =
        this.filteredOptions.findIndex((option: any) =>
          (this.$props.getText as Function)(option) === (this.$props.getText as Function)(this.hoveredOption))
      if (this.filteredOptions[hoveredOptionIndex + 1]) {
        this.hoveredOption = this.filteredOptions[hoveredOptionIndex + 1]
      }
    }
    this.scrollToOption(this.hoveredOption)
  }

  scrollToOption (option: any) {
    const optionElement: HTMLElement = this.itemRefs[(this.$props.getTrackBy as Function)(option)]
    // Scroll list to hinted option position
    optionElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    })
  }
}
</script>
<style lang="scss">
@import "../../../vuestic-sass/resources/resources";

.va-select-option-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style: none;

  &__option {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.375rem 0.5rem 0.375rem 0.5rem;
    min-height: 2.25rem;
    word-break: break-word;

    &--icon {
      margin-right: 0.5rem;
    }

    &--selected-icon {
      margin-left: auto;
      font-size: 1.2rem;
    }
  }

  &.no-options {
    padding: 0.5rem;
  }
}
</style>
