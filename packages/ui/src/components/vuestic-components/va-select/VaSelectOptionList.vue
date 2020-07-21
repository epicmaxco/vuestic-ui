<template>
  <ul
    class="va-select-option-list"
  >
    <template v-if="options.length">
      <li
        v-for="option in filteredOptions"
        :key="getOptionKey(option)"
        :class="getOptionClass(option)"
        :style="getOptionStyle(option)"
        @click.stop="selectOption(option)"
        @mouseleave="updateHoveredOption(null)"
        @mouseover="updateHoveredOption(option)"
      >
        <va-icon
          v-if="option.icon"
          :name="option.icon"
          class="va-select-option-list__option--icon"
        />
        <span>{{ getOptionText(option) }}</span>
        <va-icon
          v-show="getSelectedState(option)"
          class="va-select-option-list__option--selected-icon"
          name="done"
        />
      </li>
    </template>
    <li v-else>
      {{ noOptionsText }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import VaIcon from '../va-icon/VaIcon.vue'
import { getHoverColor } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'

@Component({
  components: { VaIcon },
})
export default class VaSelectOptionList extends Mixins(ColorThemeMixin) {
  @Prop({ type: [String, Object] }) readonly selectedValue!: any
  @Prop({ type: Array, default: () => [] }) readonly options!: any
  @Prop({
    type: String,
    default: 'Items not found',
  }) readonly noOptionsText!: any

  @Prop({
    type: Function,
    default: () => false,
  }) readonly getSelectedState!: any

  @Prop({ type: Boolean, default: false }) readonly multiple!: boolean
  @Prop({ type: String, default: 'id' }) readonly keyBy!: string
  @Prop({ type: String, default: 'text' }) readonly textBy!: string
  @Prop({ type: String, default: '' }) readonly search!: string

  hoveredOption: any = null

  get filteredOptions () {
    if (!this.search) {
      return this.options
    }

    return this.options.filter((option: string) => {
      const optionText = this.getOptionText(option).toUpperCase()
      const search = this.search.toUpperCase()
      return optionText.includes(search)
    })
  }

  selectOption (option: any): void {
    this.$emit('selectOption', option)
  }

  getOptionClass (option: any) {
    return {
      'va-select__option': true,
      'va-select__option--selected': this.getSelectedState(option),
    }
  }

  getOptionStyle (option: any) {
    return {
      color: this.getSelectedState(option) ? this.computeColor('success') : 'inherit',
      backgroundColor: this.isHovered(option) ? getHoverColor(this.computeColor('success')) : 'transparent',
    }
  }

  getOptionText (option: any): string {
    return typeof option === 'string' ? option : option[this.textBy]
  }

  getOptionKey (option: any) {
    return typeof option === 'string' ? option : option[this.keyBy]
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

  // updateSearch (value: string) {
  //   this.search = value
  // }
}
</script>
<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-select-option-list {
  width: 100%;
  list-style: none;

  &__option {
    &--selected {

    }

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
