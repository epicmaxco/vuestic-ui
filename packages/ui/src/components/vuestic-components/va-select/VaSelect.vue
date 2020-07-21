<template>
  <va-input-wrapper
    :error="computedError"
    :error-messages="computedErrorMessages"
  >
    <slot name="prepend" slot="prepend" />

    <va-dropdown
      class="va-select__dropdown"
      :position="position"
      :disabled="disabled"
      :max-height="maxHeight"
      :fixed="fixed"
      :style="{width}"
      boundaryBody
      :closeOnAnchorClick="false"
      keepAnchorWidth
      ref="dropdown"
    >
      <va-input
        v-if="searchable"
        class="va-select__input"
        v-model="search"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        removable
        ref="search"
      />
      <va-select-option-list
        :style="{maxHeight: maxHeight}"
        :options="options"
        @selectOption="selectOption"
        :selectedValue="valueProxy"
        :getSelectedState="getSelectedState"
        :noOptionsText="noOptionsText"
        :search="search"
      />

      <div
        slot="anchor"
        class="va-select"
        :class="selectClass"
        :style="selectStyle"
      >
        <div class="va-select__content-wrapper">
          <div class="va-select__content">
            <label
              v-if="label"
              class="va-select__content__label"
              :style="labelStyle"
              aria-hidden="true"
            >
              {{ label }}
            </label>
            <div
              class="va-select__content__selection"
              v-if="multiple && valueProxy.length <= tagMax"
            >
              <div class="va-select__content--tag">
                {{ selectionTags }}
              </div>
            </div>
            <div
              v-else-if="selectionValue"
              class="va-select__content__selection"
            >
              {{ selectionValue }}
            </div>
            <div
              v-else
              class="va-select__placeholder"
            >
              {{ placeholder }}
            </div>
          </div>

          <div class="va-select__append-inner">
            <div v-if="showClearIcon" class="va-select__icon">
              <va-icon
                name="cancel"
                @click.native.stop="reset()"
              />
            </div>

            <div v-if="loading" class="va-select__icon">
              <va-icon
                spin
                :color="$themes.success"
                :size="24"
                name="loop"
              />
            </div>

            <div class="va-select__icon va-select__icon--toggle">
              <va-icon
                :name="visible ? 'arrow_drop_up' : 'arrow_drop_down'"
              />
            </div>
          </div>
        </div>
      </div>
    </va-dropdown>

    <slot name="append" slot="append" />

  </va-input-wrapper>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import VaDropdown from '../va-dropdown/VaDropdown.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import VaInput from '../va-input/VaInput.vue'
import { getHoverColor } from '../../../services/color-functions'
import {
  ContextPluginMixin,
  makeContextablePropsMixin,
} from '../../context-test/context-provide/ContextPlugin'
import { FormComponentMixin } from '../../vuestic-mixins/FormComponent/FormComponentMixin'
import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
import VaInputWrapper from '../va-input/VaInputWrapper.vue'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import VaSelectOptionList from './VaSelectOptionList.vue'

const positions = {
  top: 'T',
  bottom: 'B',
}

const SelectPropsMixin = makeContextablePropsMixin({
  value: { type: [String, Number, Object, Array], default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  position: {
    type: String,
    default: 'bottom',
    validator: (position: string) => Object.keys(positions).includes(position),
  },
  tagMax: { type: Number, default: 5 },
  searchable: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  width: { type: String, default: '100%' },
  maxHeight: { type: String, default: '128px' },
  keyBy: { type: String, default: 'id' },
  textBy: { type: String, default: 'text' },
  clearValue: { type: String, default: '' },
  noOptionsText: { type: String, default: 'Items not found' },
  fixed: { type: Boolean, default: true },
  noClear: { type: Boolean, default: false },
})

@Component({
  name: 'VaSelect',
  components: {
    VaSelectOptionList,
    VaIcon,
    VaDropdown,
    VaInput,
    VaInputWrapper,
  },
})
export default class VaSelect extends Mixins(
  ContextPluginMixin,
  FormComponentMixin,
  LoadingMixin,
  SelectPropsMixin,
  ColorThemeMixin,
) {
  search = ''
  isMounted = false
  hoveredOption: any = null

  @Watch('search')
  onSearchValueChange (value: string) {
    this.$emit('updateSearch', value)
  }

  @Watch('visible')
  onLoadingChanged (value: boolean) {
    if (value && this.c_searchable) {
      this.$nextTick(() => {
        (this as any).$refs.search.$refs.input.focus()
      })
    }
  }

  get valueProxy () {
    return this.value
  }

  set valueProxy (value: any) {
    this.$emit('input', value)
  }

  get visible () {
    return this.isMounted ? (this as any).$refs.dropdown.isClicked : false
  }

  get selectClass () {
    return {
      // 'va-select': true,
      'va-select--multiple': this.multiple,
      'va-select--visible': this.visible,
      'va-select--searchable': this.c_searchable,
      'va-select--disabled': this.disabled,
      'va-select--loading': this.loading,
    }
  }

  get selectStyle () {
    return {
      backgroundColor:
        this.computedError ? getHoverColor(this.computeColor('danger'))
          : this.success ? getHoverColor(this.computeColor('success')) : '#f5f8f9',
      borderColor:
        this.computedError ? this.computeColor('danger')
          : this.success ? this.computeColor('success')
            : this.computeColor('gray'),
    }
  }

  get labelStyle () {
    return {
      color: this.computedError ? this.computeColor('danger')
        : this.success ? this.computeColor('success')
          : this.computeColor('primary'),
    }
  }

  get selectionValue () {
    if (!this.valueProxy) {
      return ''
    }
    if (this.multiple) {
      return this.valueProxy.length ? `${this.valueProxy.length} items selected` : ''
    }
    // We try to find a match from options, if we don't find any - we take value.
    // This way select can display value even when options are not loaded yet.
    const selectedOption = this.valueProxy || this.selectedOption
    const isString = typeof selectedOption === 'string'
    return isString ? selectedOption : selectedOption[this.textBy]
  }

  get selectionTags (): string | null {
    return Array.isArray(this.valueProxy) ? [...this.valueProxy.map(val => this.getOptionText(val))].join(', ') : null
  }

  get selectedOption () {
    return (!this.valueProxy || this.multiple) ? null : this.options.find((option: any) => this.compareOptions(option, this.valueProxy)) || null
  }

  get showClearIcon (): boolean {
    if (this.noClear) {
      return false
    }
    if (this.disabled) {
      return false
    }
    return this.multiple ? !!this.valueProxy.length : this.valueProxy !== this.clearValue
  }

  compareOptions (one: any, two: any) {
    // identity check works nice for strings and exact matches.
    if (one === two) {
      return true
    }
    // i'm not sure why we need this
    if (typeof this.value === 'string') {
      return false
    }
    if (typeof one === 'string' && typeof two === 'string') {
      return one === two
    }
    if (typeof one === 'object' && typeof two === 'object') {
      return one[this.keyBy] === two[this.keyBy]
    }
  }

  getSelectedState (option: any) {
    if (!this.valueProxy) {
      return false
    }
    if (typeof option === 'string') {
      return this.multiple
        ? this.valueProxy.includes(option)
        : this.valueProxy === option
    } else {
      return this.multiple
        ? this.valueProxy.filter((item: any) => item[this.keyBy] === option[this.keyBy]).length
        : this.valueProxy[this.keyBy] === option[this.keyBy]
    }
  }

  isHovered (option: any) {
    return this.hoveredOption
      ? typeof option === 'string' ? option === this.hoveredOption : this.hoveredOption[this.keyBy] === option[this.keyBy]
      : false
  }

  selectOption (option: any): void {
    this.search = ''
    const isSelected = this.getSelectedState(option)
    const value = this.value || []

    if (this.multiple) {
      this.valueProxy = isSelected
        ? value.filter((optionSelected: any) => !this.compareOptions(option, optionSelected))
        : [...value, option]
      ;(this as any).$refs.dropdown.updatePopper()
    } else {
      this.valueProxy = typeof option === 'string' ? option : { ...option }
      this.search = ''
      ;(this as any).$refs.dropdown.hide()
    }
    if (this.c_searchable) {
      (this as any).$refs.search.$refs.input.focus()
    }
  }

  /**
   * @public
   */
  reset (): void {
    this.valueProxy = this.multiple
      ? (Array.isArray(this.clearValue) ? this.clearValue : [])
      : this.clearValue
    this.search = ''
  }

  mounted (): void {
    this.isMounted = true
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-select {
  cursor: pointer;
  position: relative;
  width: 100%;
  min-height: 2.375rem;
  border-style: solid;
  border-width: 0 0 thin 0;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  margin-bottom: 1rem;

  &--disabled {
    @include va-disabled();
  }

  &--loading {
    .va-select__clear-icon,
    .va-select__open-icon {
      visibility: hidden;
    }
  }

  &__append-inner {
    display: flex;
    align-items: center;
  }

  &__content-wrapper {
    position: absolute;
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    padding: 0 0.5rem;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: space-between;

    &__label {
      @include va-title();

      padding-top: 0.125rem;

      @include va-ellipsis();
    }

    &__selection {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &--tag {
      word-break: break-word;
    }
  }

  &__input {
    border: none;
    background: transparent;
    padding: 0.25rem 0;
    font-size: 1rem;
    font-family: $font-family-sans-serif;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 0 0.5rem;

    &:focus {
      outline: none;
    }
  }

  &__placeholder {
    color: $brand-secondary;
    opacity: 0.5;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
  }

  &__icon {
    padding-left: 0.5rem;

    &--toggle {
      color: $va-link-color-secondary;
    }
  }

  &__dropdown {
    outline: none;
    margin: 0;
    padding: 0;
    background: $light-gray3;
    border-radius: 0.5rem;

    &.va-select__dropdown-position-top {
      box-shadow: 0 -2px 3px 0 rgba(98, 106, 119, 0.25);
    }

    .va-dropdown__anchor {
      display: block;
    }

    .va-dropdown__content {
      background-color: $light-gray3;
      margin: 0;
      padding: 0;
      overflow-y: auto;
      box-shadow: $datepicker-box-shadow;
      border-radius: 0 0 0.5rem 0.5rem;
    }
  }

  &__option-list {
    width: 100%;
    list-style: none;

    &.no-options {
      padding: 0.5rem;
    }
  }

  &__option {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.375rem 0.5rem 0.375rem 0.5rem;
    min-height: 2.25rem;
    word-break: break-word;

    &__selected-icon {
      margin-left: auto;
      font-size: 1.2rem;
    }

    &__icon {
      margin-right: 0.5rem;
    }
  }
}
</style>
