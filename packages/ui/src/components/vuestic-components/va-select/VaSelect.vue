<template>
  <va-input-wrapper
    :error="computedError"
    :success="c_success"
    :error-messages="computedErrorMessages"
    :messages="c_messages"
    :style="{width}"
  >
    <template #prepend>
      <slot name="prepend" />
    </template>

    <va-dropdown
      class="va-select__dropdown"
      :position="position"
      :disabled="c_disabled"
      :max-height="c_maxHeight"
      :fixed="c_fixed"
      boundaryBody
      :closeOnAnchorClick="c_multiple"
      keepAnchorWidth
      @update:modelValue="onDropdownInput"
      ref="dropdown"
    >
      <va-input
        v-if="inputVisible"
        class="va-select__input"
        v-model="search"
        :id="id"
        :name="name"
        placeholder="Search"
        removable
        ref="search"
        @keydown.enter.stop.prevent="addNewOption"
        @keydown.up.stop.prevent="hoverPreviousOption"
        @keydown.down.stop.prevent="hoverNextOption"
      />
      <va-select-option-list
        :style="{maxHeight: maxHeight}"
        :options="filteredOptions"
        @selectOption="selectOption"
        :selectedValue="valueProxy"
        :getSelectedState="getSelectedState"
        :getText="getText"
        :getTrackBy="getTrackBy"
        :noOptionsText="noOptionsText"
        :color="c_color"
        :search="search"
        :hintedOption="hintedOption"
        ref="optionList"
      />

      <template #anchor>
        <div
          class="va-select"
          :class="selectClass"
          :style="selectStyle"
          tabindex="0"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @keydown.stop.prevent="updateHintedOption"
          @keydown.up.stop.prevent="hoverPreviousOption"
          @keydown.left.stop.prevent="hoverPreviousOption"
          @keydown.down.stop.prevent="hoverNextOption"
          @keydown.right.stop.prevent="hoverNextOption"
          @keydown.enter.stop.prevent="selectHoveredOption"
          @keydown.space.stop.prevent="selectHoveredOption"
        >

          <div class="va-select__content-wrapper">
            <div class="va-select__controls" v-if="$slots.prependInner">
              <div class="va-select__prepend-slot">
                <slot name="prependInner" />
              </div>
            </div>
            <div
              class="va-select__content"
              :class="[label ? 'va-select__content__selection--no-label' : '']"
            >
              <label
                v-if="label"
                class="va-select__content__label"
                :style="labelStyle"
                ref="label"
                aria-hidden="true"
              >
                {{ label }}
              </label>
              <template v-if="selectionValue || selectionChips">
                <div
                  class="va-select__content__selection"
                  v-if="c_multiple"
                >
                  <div v-if="chips && selectionChips.length <= chipMax">
                    <va-chip
                      class="va-select__content__selection--chip"
                      v-for="(option, i) in selectionChips"
                      :key="i"
                      size="small"
                      :color="c_color"
                      :closeable="deletableChips"
                      @input="selectOption(option)"
                    >
                      {{ option }}
                    </va-chip>
                  </div>
                  <div v-else>
                    {{ selectionChips }}
                  </div>
                </div>
                <div
                  v-else-if="selectionValue"
                  class="va-select__content__selection"
                >
                  {{ selectionValue }}
                </div>
              </template>
              <div
                v-else
                class="va-select__content__selection va-select__content__selection--placeholder"
              >
                {{ placeholder }}
              </div>
            </div>

            <div class="va-select__controls">

              <div class="va-select__append-slot">
                <slot name="appendInner" />
              </div>

              <div v-if="showClearIcon" class="va-select__icon">
                <va-icon
                  :name="clearIcon"
                  @click.stop="reset()"
                />
              </div>

              <div v-if="loading" class="va-select__icon">
                <va-icon
                  spin
                  :color="computeColor('success')"
                  :size="24"
                  name="loop"
                />
              </div>

              <div class="va-select__icon">
                <va-icon
                  :color="computeColor('grey')"
                  :name="toggleIcon"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </va-dropdown>

    <template #append>
      <slot name="append" />
    </template>
  </va-input-wrapper>
</template>

<script lang="ts">
import { Mixins, Watch } from 'vue-property-decorator'

import VaDropdown from '../va-dropdown/VaDropdown.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import VaInput from '../va-input/VaInput.vue'
import VaInputWrapper from '../va-input/VaInputWrapper.vue'
import VaSelectOptionList from './VaSelectOptionList.vue'
import VaChip from '../va-chip/VaChip.vue'

import { getHoverColor } from '../../../services/color-functions'
import {
  ContextPluginMixin,
  makeContextablePropsMixin,
} from '../../context-test/context-provide/ContextPlugin'
import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { SelectableListMixin } from '../../vuestic-mixins/SelectableList/SelectableListMixin'
import { Options } from 'vue-class-component'

const positions: string[] = ['top', 'bottom']

const PropsMixin = makeContextablePropsMixin({
  modelValue: { type: [String, Number, Object, Array], default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  position: {
    type: String,
    default: 'bottom',
    validator: (position: string) => positions.includes(position),
  },
  chipMax: { type: Number, default: 10 },
  chips: { type: Boolean, default: false },
  deletableChips: { type: Boolean, default: false },
  searchable: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  width: { type: String, default: '100%' },
  maxHeight: { type: String, default: '128px' },
  clearValue: { type: String, default: '' },
  noOptionsText: { type: String, default: 'Items not found' },
  fixed: { type: Boolean, default: true },
  clearable: { type: Boolean, default: false },
  hideSelected: { type: Boolean, default: false },
  allowCreate: {
    type: [Boolean, String],
    default: false,
    validator: (mode: string | boolean) => {
      return [true, false, 'unique'].includes(mode)
    },
  },
  clearIcon: { type: String, default: 'close' },
  dropdownIcon: {
    type: [String, Object],
    default: () => ({ open: 'arrow_drop_down', close: 'arrow_drop_up' }),
  },
})

@Options({
  components: {
    VaChip,
    VaSelectOptionList,
    VaIcon,
    VaDropdown,
    VaInput,
    VaInputWrapper,
  },
  emits: ['update-search', 'update:modelValue', 'clear'],
})
export default class VaSelect extends Mixins(
  ContextPluginMixin,
  LoadingMixin,
  ColorThemeMixin,
  SelectableListMixin,
  PropsMixin,
) {
  search = ''
  hintedSearch = ''
  hintedOption: any = null
  isMounted = false
  hoveredOption: any = null
  showOptionList = false

  @Watch('search')
  onSearchValueChange (value: string) {
    this.$emit('update-search', value)
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
    if (this.multiple && !this.isArrayValue) {
      return this.modelValue ? [this.modelValue] : []
    }
    return this.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value)
  }

  get isArrayValue () {
    return Array.isArray(this.modelValue)
  }

  get isPrimitiveValue () {
    return typeof this.modelValue === 'string' || typeof this.modelValue === 'number'
  }

  get isObjectValue () {
    return !this.isArrayValue && !this.isPrimitiveValue
  }

  get inputVisible () {
    return this.searchable || this.allowCreate
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
            : this.isFocused || this.showOptionList ? this.colorComputed : this.computeColor('gray'),
    }
  }

  get labelStyle () {
    return {
      color: this.computedError ? this.computeColor('danger')
        : this.success ? this.computeColor('success')
          : this.isFocused || this.showOptionList ? this.colorComputed : this.computeColor('gray'),
    }
  }

  get selectionValue (): string {
    if (!this.valueProxy) {
      return ''
    }
    if (this.multiple) {
      return this.valueProxy.length ? `${this.valueProxy.length} items selected` : ''
    }
    // We try to find a match from options, if we don't find any - we take value.
    // This way select can display value even when options are not loaded yet.
    const selectedOption = this.valueProxy || this.selectedOption
    const isPrimitive = ['string', 'number'].includes(typeof selectedOption)
    return isPrimitive ? selectedOption : selectedOption[this.textBy] + ''
  }

  get selectionChips (): string | string[] {
    if (this.isArrayValue && this.valueProxy.length > this.chipMax) {
      return this.valueProxy.length ? `${this.valueProxy.length} items selected` : ''
    }
    if (this.multiple && this.chips) {
      return this.valueProxy.map((value: any) => this.getText(value))
    }
    if (this.isArrayValue) {
      const stringValueArr: string[] = this.valueProxy.map((value: any) => this.getText(value))
      return stringValueArr.join(', ')
    }
    return ''
  }

  get filteredOptions (): any[] {
    if (!this.hideSelected) {
      return this.options
    }
    const filteredOptions: any[] = this.options.reduce((acc: any[], option: any) => {
      return this.getSelectedState(option) ? [...acc] : [...acc, option]
    }, [])
    return filteredOptions
  }

  get selectedOption () {
    return (!this.valueProxy || this.multiple) ? null : this.options.find((option: any) => this.compareOptions(option, this.valueProxy)) || null
  }

  get showClearIcon (): boolean {
    if (!this.clearable) {
      return false
    }
    if (this.disabled) {
      return false
    }
    return this.multiple ? !!this.valueProxy.length : this.valueProxy !== this.clearValue
  }

  get toggleIcon (): string {
    if (this.dropdownIcon.open && this.dropdownIcon.close) {
      return this.visible ? this.dropdownIcon.close : this.dropdownIcon.open
    }
    return this.dropdownIcon
  }

  compareOptions (one: any, two: any) {
    // identity check works nice for strings and exact matches.
    if (one === two) {
      return true
    }
    // i'm not sure why we need this
    if (typeof this.modelValue === 'string') {
      return false
    }
    if (typeof one === 'string' && typeof two === 'string') {
      return one === two
    }
    if (typeof one === 'object' && typeof two === 'object') {
      return one[this.trackBy] === two[this.trackBy]
    }
  }

  getSelectedState (option: any): boolean {
    if (!this.valueProxy) {
      return false
    }
    if (typeof option === 'string') {
      return this.multiple
        ? this.valueProxy.includes(option)
        : this.valueProxy === option
    } else {
      return this.multiple
        ? this.valueProxy.filter((item: any) => item[this.trackBy] === option[this.trackBy]).length
        : this.valueProxy[this.trackBy] === option[this.trackBy]
    }
  }

  isHovered (option: any) {
    return this.hoveredOption
      ? typeof option === 'string' ? option === this.hoveredOption : this.hoveredOption[this.trackBy] === option[this.trackBy]
      : false
  }

  selectOption (option: any): void {
    this.search = ''
    const isSelected = this.getSelectedState(option)
    const value: any = this.modelValue || []

    if (this.multiple) {
      const filterSelected = () => {
        return value.filter((optionSelected: any) => !this.compareOptions(option, optionSelected))
      }
      this.valueProxy = isSelected ? filterSelected() : [...value, option]
    } else {
      this.valueProxy = typeof option === 'string' ? option : { ...option }
      ;(this as any).$refs.dropdown.hide()
    }
    if (this.c_searchable) {
      (this as any).$refs.search.$refs.input.focus()
    }
  }

  addNewOption (): void {
    if (this.allowCreate) {
      if (this.multiple) {
        const hasAddedOption: boolean = this.valueProxy.some((value: any) => value === this.search)
        // Do not change valueProxy if option already exist
        if (this.allowCreate === 'unique' && hasAddedOption) {
          this.search = ''
          return
        }
        this.valueProxy = [...this.valueProxy, this.search]
        this.search = ''
        return
      }
      this.valueProxy = this.search
      this.search = ''
    }
  }

  selectHoveredOption () {
    if (this.$refs.optionList) {
      const hoveredOption: any = (this as any).$refs.optionList.hoveredOption
      hoveredOption && this.selectOption((this as any).$refs.optionList.hoveredOption)
    }
  }

  hoverPreviousOption () {
    if (this.$refs.optionList) {
      (this as any).$refs.optionList.hoverPreviousOption()
    }
  }

  hoverNextOption () {
    if (this.$refs.optionList) {
      (this as any).$refs.optionList.hoverNextOption()
    }
  }

  updateHintedOption (event: KeyboardEvent) {
    const isLetter: boolean = event.key.length === 1
    const isDeleteKey: boolean = event.keyCode === 8 || event.keyCode === 46
    clearTimeout(this.timer)
    if (isDeleteKey) {
      // Remove last letter from query
      this.hintedSearch = this.hintedSearch ? this.hintedSearch.slice(0, -1) : ''
    } else {
      // Add every new letter to the query
      isLetter && (this.hintedSearch += event.key)
    }
    // Search for an option that matches the query
    this.hintedOption = this.hintedSearch ? this.options.find((option: any) => {
      return this.getText(option).toLowerCase().startsWith(this.hintedSearch.toLowerCase())
    }) : ''
    this.timer = setTimeout(() => {
      this.hintedSearch = ''
    }, 1000)
  }

  onDropdownInput (value: boolean) {
    if (!value) {
      this.showOptionList = value
      this.validate()
    } else {
      this.showOptionList = value
    }
  }

  /** @public */
  public reset (): void {
    this.valueProxy = this.multiple
      ? (Array.isArray(this.clearValue) ? this.clearValue : [])
      : this.clearValue
    this.search = ''
    this.modelValue = this.clearValue
    this.$emit('clear')
  }

  mounted (): void {
    this.isMounted = true
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-select {
  display: flex;
  align-items: stretch;
  cursor: pointer;
  width: 100%;
  min-height: 2.375rem;
  border-style: solid;
  border-width: 0 0 thin 0;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  margin-bottom: 1rem;
  transition: ease-in-out border-bottom-color 0.25s;

  &--disabled {
    @include va-disabled();
  }

  &--loading {
    .va-select__clear-icon,
    .va-select__open-icon {
      visibility: hidden;
    }
  }

  &__controls {
    display: inline-flex;
    align-items: center;
  }

  &__content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    padding: 0 0.5rem;
  }

  &__content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: stretch;

    &__label {
      @include va-title();

      padding-top: 0.125rem;
      position: absolute;
      top: 0;
      right: auto;
      max-width: 90%;
      transition: ease-in-out color 0.25s;

      @include va-ellipsis();
    }

    &__selection {
      width: 100%;
      display: flex;
      padding: 0.125rem 0;
      margin-top: 0.125rem;
      align-items: center;
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;

      &--no-label {
        padding: 0.75rem 0 0.125rem 0;
      }

      &--chip {
        margin: 0.25rem 0.25rem 0.25rem 0;
      }

      &--placeholder {
        color: $brand-secondary;
        opacity: 0.8;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        -webkit-box-align: start;
        -webkit-box-pack: center;
      }
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

    /* margin: 0 0.5rem; */

    &:focus {
      outline: none;
    }
  }

  &__icon {
    padding-left: 0.25rem;
  }

  &__prepend-slot {
    padding-right: 0.5rem;
  }

  &__append-slot {
    padding-left: 0.25rem;
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
}
</style>
