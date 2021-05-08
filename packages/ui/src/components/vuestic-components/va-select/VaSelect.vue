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
      v-model="doShowDropdownContent"
      :position="$props.position"
      :disabled="$props.disabled"
      :max-height="$props.maxHeight"
      :fixed="$props.fixed"
      :close-on-anchor-click="$props.multiple"
      :offset="[0, 8]"
      trigger="none"
      class="va-select__dropdown"
      keep-anchor-width
      boundary-body
    >
      <template #anchor>
        <div
          class="va-select"
          ref="select"
          :tabindex="tabindex"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @keydown.enter.stop.prevent="onSelectClick"
          @keydown.space.stop.prevent="onSelectClick"
          @click.prevent="onSelectClick"
        >
          <!-- We show messages outside of dropdown to draw dropdown content under the input -->
          <va-input
            :model-value="valueComputedString"
            :success="success"
            :error="error"
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
            readonly
            :tabindex="-1"
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

            <template v-if="$slots.content" #content="inputContentParams">
              <slot name="content" v-bind="inputContentParams" />
            </template>
          </va-input>
        </div>
      </template>

      <div class="va-select__dropdown__content">
        <!-- Hidden DIV is a hack than allow user to focus select from dropdown content with tab -->
        <div class="hidden" :tabindex="tabindex + 1" @focus="focusSelect" />

        <!--
            Space end enter should listen to keyup to stopPropagation to VaDropdown
            Arrow button should listen to keydown to prevent scroll navigation
         -->
        <va-input
          v-if="doShowSearchInput"
          :id="$props.id"
          ref="searchBar"
          v-model="searchInputValue"
          class="va-select__input"
          placeholder="Search"
          removable
          :name="$props.name"
          :tabindex="tabindex + 1"
          @keydown.down.stop.prevent="focusOptionList"
          @keydown.right.stop.prevent="focusOptionList"
          @keydown.up.stop.prevent="focusSelect"
          @keydown.left.stop.prevent="focusSelect"
          @keyup.enter.prevent="addNewOption"
          @focus="hoveredOption = null"
        />
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
          :hinted-option="hintedOption"
          :no-options-text="$props.noOptionsText"
          :color="$props.color"
          :key-by="$props.keyBy"
          :text-by="$props.textBy"
          :tabindex="tabindex + 1"
          @select-option="selectOption"
          @no-previous-option-to-hover="focusSearchBar"
          @keyup.enter.stop.prevent="selectHoveredOption"
          @keyup.space.stop.prevent="selectHoveredOption"
        />
        <div class="hidden" :tabindex="tabindex + 1" @focus="focusSelect" />
      </div>
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
  width = prop<string>({ type: String, default: '100%' })
  maxHeight = prop<string>({ type: String, default: '128px' })
  clearValue = prop<string>({ type: String, default: '' })
  noOptionsText = prop<string>({ type: String, default: 'Items not found' })
  fixed = prop<boolean>({ type: Boolean, default: true })
  clearable = prop<boolean>({ type: Boolean, default: false })
  clearableIcon = prop<string>({ type: String, default: 'highlight_off' })
  hideSelected = prop<boolean>({ type: Boolean, default: false })
  tabindex = prop<number>({ type: Number, default: 0 })
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

  // SelectOptionList props

  keyBy = prop<string>({ type: String, default: 'id' })
  textBy = prop<string>({ type: String, default: 'text' })

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

  get doShowSearchInput () {
    return this.$props.searchable || this.$props.allowCreate
  }

  created () {
    watch(() => this.searchInputValue, (value) => {
      this.$emit('update-search', value)
    })
  }

  // Select value

  get valueComputed () {
    if (this.$props.multiple) {
      if (!this.$props.modelValue) {
        return []
      }

      if (!Array.isArray(this.$props.modelValue)) {
        return [this.$props.modelValue]
      }
    }

    return this.$props.modelValue
  }

  set valueComputed (value: any) {
    this.$emit('update:modelValue', value)
  }

  get valueComputedString (): string {
    if (!this.valueComputed) { return this.clearValue }
    if (typeof this.valueComputed === 'string') { return this.valueComputed }
    if (Array.isArray(this.valueComputed)) {
      const separator = ', '
      return this.valueComputed.map((value) => this.getText(value)).join(separator) || this.clearValue
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
      return one[this.$props.trackBy as string] === two[this.$props.trackBy as string]
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

  selectOption (option: any): void {
    const isSelected = this.checkIsOptionSelected(option)

    if (this.doShowSearchInput) {
      (this as any).$refs.searchBar.focus()
      this.searchInputValue = ''
    }

    if (this.$props.multiple) {
      if (isSelected) {
        // Unselect
        this.valueComputed = this.valueComputed.filter((optionSelected: any) => !this.compareOptions(option, optionSelected))
      } else {
        this.valueComputed = [...this.valueComputed, option]
      }
    } else {
      this.valueComputed = typeof option === 'string' ? option : { ...option }
      ;(this as any).$refs.dropdown.hide()
    }
  }

  addNewOption (): void {
    if (!this.$props.allowCreate) { return }
    if (this.searchInputValue === '') { return }

    if (this.$props.multiple) {
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

  showDropdown () {
    this.doShowDropdownContent = true
  }

  hideDropdown () {
    this.doShowDropdownContent = false
  }

  // Focus and keyboard navigation

  get isFocusedComputed () {
    // If we show dropdown content that means select is focused
    return this.isFocused || this.doShowDropdownContent
  }

  onSelectClick () {
    this.showDropdown()

    this.$nextTick(() => {
      if (this.$refs.searchBar) {
        (this.$refs as any).searchBar.focus()
      } else if (this.$refs.optionList) {
        (this.$refs as any).optionList.focus()
      }
    })
  }

  focusSelect () {
    // This hack allows user change focus between dropdown content and select input
    // Warning: It's important for keyboard navigation
    if (this.$refs.select) {
      (this as any).$refs.select.focus()
      this.hideDropdown()
    }
  }

  focusOptionList () {
    if (this.$refs.optionList) {
      (this.$refs as any).optionList.focus()
    }

    this.hoverNextOption()
  }

  focusSearchBar () {
    if (this.$refs.searchBar) {
      (this.$refs as any).searchBar.focus()
    } else {
      this.focusSelect()
    }
  }

  /** @public */
  public focus (): void {
    this.isFocused = true
  }

  /** @public */
  public blur (): void {
    this.isFocused = false
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

  // Hinted option

  // TODO: I don't think we need this hinted option and timer
  hintedSearch = ''
  hintedOption: any = null
  timer!: any

  // TODO: I don't know what this function
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
    this.hintedOption = this.hintedSearch
      ? (this.$props.options as []).find((option: any) => {
        return this.getText(option).toLowerCase().startsWith(this.hintedSearch.toLowerCase())
      })
      : ''
    this.timer = setTimeout(() => {
      this.hintedSearch = ''
    }, 1000)
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";
@import 'variables';

.va-select {
  cursor: pointer;

  .va-input__append {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  &__dropdown {
    outline: var(--va-select-dropdown-outline);
    margin: var(--va-select-dropdown-margin);
    padding: var(--va-select-dropdown-padding);

    .va-dropdown__anchor {
      display: block;
    }

    .va-dropdown__content {
      overflow: hidden;
      border-radius: 4px;
      filter: drop-shadow(0 4px 8px rgba(59, 63, 73, 0.15));
    }

    .va-select__dropdown__content {
      background: white;
      margin: var(--va-select-dropdown-content-margin);
      padding: var(--va-select-dropdown-content-padding);
      overflow-y: auto;

      @include va-scroll();
    }
  }
}
</style>
