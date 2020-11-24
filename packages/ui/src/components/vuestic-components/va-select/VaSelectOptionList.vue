<template>
  <div class="va-select-option-list">
    <template v-if="filteredOptions.length">
      <div
        v-for="option in filteredOptions"
        :key="getTrackBy(option)"
        :class="getOptionClass(option)"
        :style="getOptionStyle(option)"
        @click.stop="selectOption(option)"
        @mouseleave="updateHoveredOption(null)"
        @mouseover="updateHoveredOption(option)"
        :ref="getTrackBy(option)"
      >
        <va-icon
          v-if="option.icon"
          :name="option.icon"
          class="va-select-option-list__option--icon"
        />
        <span>{{ getText(option) }}</span>
        <va-icon
          v-show="getSelectedState(option)"
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
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

import VaIcon from '../va-icon/VaIcon.vue'

import { getHoverColor } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

@Component({
  components: { VaIcon },
})
export default class VaSelectOptionList extends Mixins(ColorThemeMixin) {
  @Watch('hintedOption')
  onHintedOptionChange (option: any) {
    if (option) {
      this.updateHoveredOption(option)
      this.scrollToOption(option)
    }
  }

  @Prop({ type: Array, default: () => [] }) readonly options!: any
  @Prop({
    type: String,
    default: 'Items not found',
  }) readonly noOptionsText!: any

  @Prop({
    type: Function,
    default: () => false,
  }) readonly getSelectedState!: any

  @Prop({
    type: Function,
  }) readonly getText!: any

  @Prop({
    type: Function,
  }) readonly getTrackBy!: any

  @Prop({ type: Boolean, default: false }) readonly multiple!: boolean
  @Prop({ type: String, default: 'id' }) readonly keyBy!: string
  @Prop({ type: String, default: 'text' }) readonly textBy!: string
  @Prop({ type: String, default: '' }) readonly search!: string
  @Prop({
    type: [String, Object],
    default: null,
  }) readonly hintedOption!: string | object | undefined

  public hoveredOption: any = null

  get filteredOptions () {
    if (!this.search) {
      return this.options
    }

    return this.options.filter((option: string) => {
      const optionText = this.getText(option).toUpperCase()
      const search = this.search.toUpperCase()
      return optionText.includes(search)
    })
  }

  selectOption (option: any): void {
    this.$emit('selectOption', option)
  }

  getOptionClass (option: any) {
    return {
      'va-select-option-list__option': true,
      'va-select-option-list__option--selected': this.getSelectedState(option),
    }
  }

  getOptionStyle (option: any) {
    return {
      color: this.getSelectedState(option) ? this.colorComputed : 'inherit',
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
      const hoveredOptionIndex: any = this.filteredOptions.findIndex((option: any) => this.getText(option) === this.getText(this.hoveredOption))
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
      const hoveredOptionIndex: any = this.filteredOptions.findIndex((option: any) => this.getText(option) === this.getText(this.hoveredOption))
      if (this.filteredOptions[hoveredOptionIndex + 1]) {
        this.hoveredOption = this.filteredOptions[hoveredOptionIndex + 1]
      }
    }
    this.scrollToOption(this.hoveredOption)
  }

  scrollToOption (option: any) {
    const optionElement: HTMLElement = (this as any).$refs[this.getTrackBy(option)][0]
    // Scroll list to hinted option position
    optionElement.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
<style lang="scss">
@import "../../vuestic-sass/resources/resources";

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
