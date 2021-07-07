<template>
  <va-input-wrapper
    :success="success"
    :messages="$props.messages"
    :error="error"
    :error-messages="computedErrorMessages"
    :style="{ width: $props.width }"
  >
    <va-dropdown
      ref="dropdown"
      v-model="doShowDropdownContentComputed"
      :position="$props.position"
      :disabled="$props.disabled"
      :max-height="$props.maxHeight"
      :fixed="$props.fixed"
      :close-on-content-click="toClose"
      trigger="none"
      class="va-select__dropdown"
      keep-anchor-width
      boundary-body
      :stateful=false
    >
      <template #anchor>
        <div
          class="va-select"
          ref="select"
          :tabindex="tabIndexComputed"
          @focus="focus"
          @blur="blur"
          @keydown.enter.stop.prevent="onSelectClick()"
          @keydown.space.stop.prevent="onSelectClick()"
          @click.prevent="onSelectClick()"
        >
          <!-- We show messages outside of dropdown to draw dropdown content under the input -->
          <va-input
            :model-value="valueComputedString"
            :success="success"
            :error="computedError"
            :clearable="doShowClearIcon"
            :clearableIcon="$props.clearableIcon"
            :color="$props.color"
            :label="$props.label"
            :placeholder="$props.placeholder"
            :loading="$props.loading"
            :disabled="$props.disabled"
            :outline="$props.outline"
            :bordered="$props.bordered"
            :focused="isFocusedComputed"
            :tabindex="-1"
            readonly
            @cleared="reset"
          >
            <template
              v-if="$slots.prepend"
              #prepend
            >
              <slot name="prepend" />
            </template>

            <template
              v-if="$slots.append"
              #append
            >
              <slot name="append" />
            </template>

            <template
              v-if="$slots.prependInner"
              #prependInner
            >
              <slot name="prependInner" />
            </template>

            <template #appendInner>
              <div class="va-input__append">
                <slot
                  v-if="$slots.appendInner"
                  name="appendInner"
                />
                <va-icon
                  :color="colorComputed"
                  :name="toggleIcon"
                />
              </div>
            </template>

            <template v-if="$slots.content" #content="{ value, focus }">
              <slot name="content" v-bind="{ valueString: value, focus, value: valueComputed }" />
            </template>
          </va-input>
        </div>
      </template>

      <!-- Stop propagation for enter keyup event, to prevent VaDropdown closing -->
      <va-dropdown-content
        @keyup.enter.stop
        @keydown.esc.prevent="hideAndFocus"
        @keydown.tab="hideDropdown"
      >
        <va-input
          v-if="showSearchInput"
          :id="$props.id"
          ref="searchBar"
          v-model="searchInputValue"
          class="va-select__input"
          placeholder="Search"
          removable
          :name="$props.name"
          :tabindex="tabindex + 1"
          :bordered="true"
          @keydown.up.stop.prevent="hoverPreviousOption()"
          @keydown.left.stop.prevent="hoverPreviousOption()"
          @keydown.down.stop.prevent="hoverNextOption()"
          @keydown.right.stop.prevent="hoverNextOption()"
          @keydown.enter.prevent="selectOrAddOption()"
          @focus="hoveredOption = null"
        />
        <div class="va-select__dropdown__content">
          <va-select-option-list
            ref="optionList"
            v-model:hoveredOption="hoveredOption"
            :style="{ maxHeight: $props.maxHeight }"
            :options="filteredOptions"
            :selected-value="valueComputed"
            :get-selected-state="checkIsOptionSelected"
            :get-text="getText"
            :get-track-by="getTrackBy"
            :search="searchInputValue"
            :no-options-text="$props.noOptionsText"
            :color="$props.color"
            :tabindex="tabindex + 1"
            @select-option="selectOption"
            @no-previous-option-to-hover="focusSearchBar()"
            @keydown.enter.stop.prevent="selectHoveredOption()"
            @keydown.space.stop.prevent="selectHoveredOption()"
            @keydown="onHintedSearch"
          />
        </div>
      </va-dropdown-content>
    </va-dropdown>
  </va-input-wrapper>
</template>

<script lang="ts">
import { watch } from 'vue'
import { mixins, Options, prop, Vue } from 'vue-class-component'

import { LoadingMixin } from '../../vuestic-mixins/LoadingMixin/LoadingMixin'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { SelectableListMixin } from '../../vuestic-mixins/SelectableList/SelectableListMixin'
import { FormComponentMixin } from '../../vuestic-mixins/FormComponent/FormComponentMixin'
import { warn } from '../../../services/utils'
import VaChip from '../va-chip'
import VaDropdown from '../va-dropdown'
import VaIcon from '../va-icon'
import VaInput, { VaInputWrapper } from '../va-input'

import VaSelectOptionList from './VaSelectOptionList'

type DropdownIcon = {
  open: string,
  close: string
}

class SelectProps {
  modelValue = prop<string | number | Record<string, any> | any[]>({
    type: [String, Number, Object, Array],
    default: '',
  })

  // Dropdown position
  position = prop<string>({
    type: String,
    default: 'bottom',
    validator: (position: string) => ['top', 'bottom'].includes(position),
  })

  allowCreate = prop<boolean | string>({
    type: [Boolean, String],
    default: false,
    validator: (mode: string | boolean) => {
      return [true, false, 'unique'].includes(mode)
    },
  })

  color = prop<string>({ type: String, default: 'primary' })
  multiple = prop<boolean>({ type: Boolean, default: false })
  searchable = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean, default: false })
  readonly = prop<boolean>({ type: Boolean, default: false }) // Probably unused prop! THIS WAS UNUSED! USE
  separator = prop<string>({ type: String, default: ', ' })
  width = prop<string>({ type: String, default: '100%' })
  maxHeight = prop<string>({ type: String, default: '128px' })
  clearValue = prop<string>({ type: String, default: '' })
  noOptionsText = prop<string>({ type: String, default: 'Items not found' })
  fixed = prop<boolean>({ type: Boolean, default: true })
  clearable = prop<boolean>({ type: Boolean, default: false })
  clearableIcon = prop<string>({ type: String, default: 'highlight_off' })
  hideSelected = prop<boolean>({ type: Boolean, default: false })
  tabindex = prop<number>({ type: Number, default: 0 })
  maxSelections = prop<number>({ type: Number, default: undefined })
  dropdownIcon = prop<string | DropdownIcon>({
    type: [String, Object],
    default: (): DropdownIcon => ({
      open: 'expand_more',
      close: 'expand_less',
    }),
    validator: (value: any) => {
      if (typeof value === 'string') { return true }

      const isOpenIconString = typeof value.open === 'string'
      const isCloseIconString = typeof value.close === 'string'

      return isOpenIconString && isCloseIconString
    },
  })

  // Input style
  outline = prop({ type: Boolean, default: false })
  bordered = prop({ type: Boolean, default: false })
  label = prop<string>({ type: String, default: '' })
  placeholder = prop<string>({ type: String, default: '' })
}

const SelectPropsMixin = Vue.with(SelectProps)

@Options({
  name: 'VaSelect',
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
export default class VaSelect extends mixins(
  LoadingMixin,
  ColorMixin,
  FormComponentMixin,
  SelectableListMixin,
  SelectPropsMixin,
) {
  // Search
  searchInputValue = ''

  get showSearchInput () {
    return this.$props.searchable || this.$props.allowCreate
  }

  created () {
    watch(() => this.searchInputValue, (value) => {
      this.$emit('update-search', value)
      this.hoveredOption = null
    })
  }

  // Select value

  get valueComputed () {
    const value = this.getOptionByValue(this.$props.modelValue)

    if (this.$props.multiple) {
      if (!value) {
        return []
      }

      if (!Array.isArray(value)) {
        return [value]
      }

      return value
    }

    if (Array.isArray(value)) {
      warn('Model value should be a string for single Select.')

      if (value.length) {
        return value[value.length - 1]
      }
    }

    return value
  }

  set valueComputed (value: any) {
    this.$emit('update:modelValue', this.getValue(value))
  }

  get tabIndexComputed () {
    return this.$props.disabled ? -1 : this.tabindex
  }

  get valueComputedString (): string {
    if (!this.valueComputed) { return this.clearValue }
    if (typeof this.valueComputed === 'string') { return this.valueComputed }
    if (Array.isArray(this.valueComputed)) {
      return this.valueComputed.map((value) => this.getText(value)).join(this.separator) || this.clearValue
    }

    return this.getText(this.valueComputed)
  }

  // Icons

  get doShowClearIcon (): boolean {
    if (!this.$props.clearable) { return false }
    if (this.$props.disabled) { return false }
    if (this.$props.multiple) { return !!this.valueComputed.length }

    return this.valueComputed !== this.$props.clearValue
  }

  get toggleIcon (): string {
    if (!this.$props.dropdownIcon) { return '' }

    if (typeof this.$props.dropdownIcon === 'string') {
      return this.$props.dropdownIcon
    }

    return this.doShowDropdownContent ? this.$props.dropdownIcon.close : this.$props.dropdownIcon.open
  }

  // Options

  get filteredOptions (): any[] {
    if (!this.$props.options) { return [] }

    if (this.$props.hideSelected) {
      return (this.$props.options).filter((option) => !this.checkIsOptionSelected(option))
    }

    return this.$props.options
  }

  get selectedOption () {
    if (this.$props.multiple) { return null }
    if (!this.valueComputed) { return null }
    if (!this.$props.options) { return null }

    return this.$props.options.find((option: any) => this.compareOptions(option, this.valueComputed))
  }

  get toClose (): boolean {
    return !(this.$props.multiple || this.$props.searchable || this.$props.allowCreate)
  }

  compareOptions (one: any, two: any) {
    // identity check works nice for strings and exact matches.
    if (one === two) {
      return true
    }
    if (typeof one === 'string' && typeof two === 'string') {
      return one === two
    }
    if (one === null || two === null) {
      return false
    }
    if (typeof one === 'object' && typeof two === 'object') {
      return this.getTrackBy(one) === this.getTrackBy(two)
    }

    return false
  }

  checkIsOptionSelected (option: any): boolean {
    if (!this.valueComputed) { return false }

    if (Array.isArray(this.valueComputed)) {
      return !!this.valueComputed.find((valueItem: any) => this.compareOptions(valueItem, option))
    }

    return this.compareOptions(this.valueComputed, option)
  }

  hideAndFocus (): void {
    this.hideDropdown()
    this.focusSelect()
  }

  allowCreateCheck (): boolean {
    return !!(this.$props.allowCreate && this.searchInputValue !== '')
  }

  selectOrAddOption () {
    if (this.hoveredOption !== null) {
      this.selectHoveredOption()
      return
    }

    if (this.allowCreateCheck()) {
      this.addNewOption()
    }
  }

  exceedsMaxSelections (): boolean {
    return this.valueComputed.length >= this.maxSelections
  }

  selectOption (option: any): void {
    if (this.hoveredOption === null) {
      this.hideAndFocus()
      return
    }

    if (this.showSearchInput) {
      this.searchInputValue = ''
    }

    if (this.$props.multiple) {
      const isSelected = this.checkIsOptionSelected(option)

      if (isSelected) {
        // Unselect
        this.valueComputed = this.valueComputed.filter((optionSelected: any) => !this.compareOptions(option, optionSelected))
      } else {
        if (this.exceedsMaxSelections()) { return }
        this.valueComputed = [...this.valueComputed, option]
      }
    } else {
      this.valueComputed = typeof option === 'string' ? option : { ...option }
      this.hideAndFocus()
    }
  }

  addNewOption (): void {
    if (this.$props.multiple) {
      if (this.exceedsMaxSelections()) { return }

      const hasAddedOption: boolean = this.valueComputed.some((value: any) => value === this.searchInputValue)

      // Do not change valueComputed if option already exist and allow create is `unique`
      if (!(this.$props.allowCreate === 'unique' && hasAddedOption)) {
        this.valueComputed = [...this.valueComputed, this.searchInputValue]
      }
    } else {
      this.valueComputed = this.searchInputValue
    }

    this.searchInputValue = ''
  }

  // Hovered options

  hoveredOption: any = null

  selectHoveredOption () {
    if (!this.doShowDropdownContent) {
      // We can not select option if they are hidden
      this.showDropdown()
      return
    }

    this.selectOption(this.hoveredOption)
  }

  hoverPreviousOption () {
    if (this.$refs.optionList) {
      (this.$refs.optionList as any).hoverPreviousOption()
    }
  }

  hoverNextOption () {
    if (this.$refs.optionList) {
      (this as any).$refs.optionList.hoverNextOption()
    }
  }

  // Dropdown content

  doShowDropdownContent = false

  get doShowDropdownContentComputed () {
    return this.doShowDropdownContent
  }

  set doShowDropdownContentComputed (value: boolean) {
    value ? this.showDropdown() : this.hideDropdown()
  }

  showDropdown () {
    this.doShowDropdownContent = true
    this.scrollToSelected()
    this.focusSearchOrOptions()
  }

  focusSearchOrOptions () {
    this.$nextTick(() => {
      if (this.showSearchInput) {
        this.focusSearchBar()
      } else { this.focusOptionList() }
    })
  }

  scrollToSelected () {
    const selected = this.valueComputed
    const nothingSelected = !selected.length && typeof selected !== 'object'

    if (nothingSelected) {
      return
    }

    const scrollTo = Array.isArray(selected) ? selected[selected.length - 1] : selected
    this.hoveredOption = scrollTo
    this.$nextTick(() => (this.$refs as any).optionList.scrollToOption(scrollTo))
  }

  hideDropdown () {
    this.doShowDropdownContent = false
    this.validate()
  }

  toggleDropdown () {
    if (this.doShowDropdownContent) {
      this.hideAndFocus()
    } else {
      this.showDropdown()
    }
  }

  // Focus and keyboard navigation

  get isFocusedComputed () {
    // If we show dropdown content that means select is focused
    return this.isFocused || this.doShowDropdownContent
  }

  onSelectClick () {
    if (this.$props.disabled) {
      return
    }
    this.toggleDropdown()
  }

  focusSelect () {
    // This hack allows user change focus between dropdown content and select input
    // Warning: It's important for keyboard navigation
    if (this.$refs.select) {
      (this as any).$refs.select.focus()
    }
  }

  focusOptionList () {
    if (this.$refs.optionList) {
      (this.$refs as any).optionList.focus()
    }
  }

  focusSearchBar () {
    if (this.$refs.searchBar) {
      (this.$refs as any).searchBar.focus()
    }
  }

  /** @public */
  public focus (): void {
    if (this.$props.disabled) {
      return
    }
    this.isFocused = true
  }

  /** @public */
  public blur (): void {
    this.isFocused = false
    this.validate()
  }

  /** @public */
  public reset (): void {
    if (this.$props.multiple) {
      this.valueComputed = Array.isArray(this.$props.clearValue) ? this.$props.clearValue : []
    } else {
      this.valueComputed = this.$props.clearValue
    }

    this.searchInputValue = ''
    this.$emit('clear')
  }

  // Hinted search

  hintedSearchQuery = ''
  hintedSearchQueryTimeoutIndex!: any
  navigationKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' ']

  // Hinted search - hover option if you typing it's value on select without search-bar
  onHintedSearch (event: KeyboardEvent) {
    if (this.navigationKeys.some(key => key === event.key)) {
      return
    }

    const isLetter: boolean = event.key.length === 1
    const isDeleteKey: boolean = event.key === 'Backspace' || event.key === 'Delete'

    clearTimeout(this.hintedSearchQueryTimeoutIndex)

    if (isDeleteKey) {
      // Remove last letter from query
      this.hintedSearchQuery = this.hintedSearchQuery ? this.hintedSearchQuery.slice(0, -1) : ''
    } else if (isLetter) {
      // Add every new letter to the query
      this.hintedSearchQuery += event.key
    }

    if (this.showSearchInput) {
      this.searchInputValue = this.hintedSearchQuery
      return
    }

    // Search for an option that matches the query
    if (this.hintedSearchQuery) {
      const appropriateOption = this.options.find(option => this.getText(option).toLowerCase().startsWith(this.hintedSearchQuery.toLowerCase()))
      if (appropriateOption) {
        this.hoveredOption = appropriateOption
      }
    }

    this.hintedSearchQueryTimeoutIndex = setTimeout(() => { this.hintedSearchQuery = '' }, 1000)
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";
@import 'variables';

.va-select {
  cursor: var(--va-select-cursor);

  .va-input {
    cursor: var(--va-select-cursor);
  }

  .va-input__append {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  &__dropdown {
    .va-dropdown__anchor {
      display: block;
    }

    .va-dropdown__content {
      overflow: hidden;
      border-bottom-right-radius: var(--va-select-dropdown-border-radius);
      border-bottom-left-radius: var(--va-select-dropdown-border-radius);
      border-top-right-radius: 0;
      border-top-left-radius: 0;
      box-shadow: var(--va-select-box-shadow);
      padding: 0;
    }

    .va-select__dropdown__content {
      background: var(--va-select-dropdown-background);
      overflow-y: auto;

      @include va-scroll(var(--va-select-scroll-color));
    }
  }
}
</style>
