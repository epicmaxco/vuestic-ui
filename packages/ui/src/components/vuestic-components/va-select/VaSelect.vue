<template>
  <va-input-wrapper
    :success="success"
    :messages="$props.messages"
    :error="error"
    :error-messages="computedErrorMessages"
    :style="{ width: $props.width }"
  >
    <va-dropdown
      :position="$props.position"
      :disabled="$props.disabled"
      :max-height="$props.maxHeight"
      :fixed="$props.fixed"
      :closeOnAnchorClick="$props.multiple"
      :offset="[0, 8]"
      ref="dropdown"
      class="va-select__dropdown"
      keepAnchorWidth
      boundaryBody
      @update:modelValue="onDropdownInput"
    >
      <div class="va-select__dropdown__content">
        <va-input
          v-if="inputVisible"
          v-model="search"
          class="va-select__input"
          placeholder="Search"
          removable
          ref="searchBar"
          :id="$props.id"
          :name="$props.name"
          @keydown.enter.stop.prevent="addNewOption"
          @keydown.up.stop.prevent="hoverPreviousOption"
          @keydown.down.stop.prevent="hoverNextOption"
        />
        <va-select-option-list
          :style="{ maxHeight: $props.maxHeight }"
          :options="filteredOptions"
          :selectedValue="valueProxy"
          :getSelectedState="getSelectedState"
          :getText="getText"
          :getTrackBy="getTrackBy"
          :search="search"
          :hintedOption="hintedOption"
          :noOptionsText="$props.noOptionsText"
          :color="$props.color"
          :key-by="$props.keyBy"
          :text-by="$props.textBy"
          ref="optionList"
          @selectOption="selectOption"
        />
      </div>

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
          <!-- We show messages outside of dropdown to prevent resize  -->
          <va-input
            :modelValue="selectionValue"
            :success="success"
            :error="error"
            :removable="showClearIcon"
            :label="$props.label"
            :placeholder="$props.placeholder"
            :loading="$props.loading"
            :disabled="$props.disabled"
            readonly
          >
            <template #prepend v-if="$slots.prepend">
              <slot name="prepend" />
            </template>

            <template #append v-if="$slots.append">
              <slot name="append" />
            </template>

            <template #prependInner v-if="$slots.prependInner">
              <slot name="prependInner" />
            </template>

            <template #appendInner>
              <div class="va-input__append">
                <slot v-if="$slots.appendInner" name="appendInner" />
                <va-icon
                  :color="colorComputed"
                  :name="toggleIcon"
                />
              </div>
            </template>
<!--
            <template #content="{ value, ref }">
              {{ ref }}
              <input ref="ref" :value="value" />
            </template> -->
          </va-input>
        </div>
      </template>
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

  label = prop<string>({ type: String, default: '' })
  color = prop<string>({ type: String, default: 'primary' })
  placeholder = prop<string>({ type: String, default: '' })
  position = prop<string>({
    type: String,
    default: 'bottom',
    validator: (position: string) => ['top', 'bottom'].includes(position),
  })

  chipMax = prop<number>({ type: Number, default: 10 })
  chips = prop<boolean>({ type: Boolean, default: false })
  deletableChips = prop<boolean>({ type: Boolean, default: false })
  searchable = prop<boolean>({ type: Boolean, default: false })
  multiple = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean, default: false })
  readonly = prop<boolean>({ type: Boolean, default: false })
  width = prop<string>({ type: String, default: '100%' })
  maxHeight = prop<string>({ type: String, default: '128px' })
  clearValue = prop<string>({ type: String, default: '' })
  noOptionsText = prop<string>({ type: String, default: 'Items not found' })
  fixed = prop<boolean>({ type: Boolean, default: true })
  clearable = prop<boolean>({ type: Boolean, default: false })
  hideSelected = prop<boolean>({ type: Boolean, default: false })
  allowCreate = prop<boolean | string>({
    type: [Boolean, String],
    default: false,
    validator: (mode: string | boolean) => {
      return [true, false, 'unique'].includes(mode)
    },
  })

  clearIcon = prop<string>({ type: String, default: 'close' })
  dropdownIcon = prop<string | DropdownIcon>({
    type: [String, Object],
    default: (): DropdownIcon => ({
      open: 'expand_more',
      close: 'expand_less',
    }),
  })

  // SelectOptionList props

  keyBy = prop<string>({ type: String, default: 'id' })
  textBy = prop<string>({ type: String, default: 'text' })
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
  search = ''
  hintedSearch = ''
  hintedOption: any = null
  isMounted = false
  hoveredOption: any = null
  showOptionList = false
  timer!: any

  created () {
    watch(() => this.search, (value) => {
      this.$emit('update-search', value)
    })

    watch(() => this.visible, (value) => {
      if (value && this.inputVisible) {
        this.$nextTick(() => {
          (this.$refs.searchBar as any).$refs.input.focus()
        })
      }
    })
  }

  get valueProxy () {
    if (this.$props.multiple && !this.isArrayValue) {
      return this.$props.modelValue ? [this.$props.modelValue] : []
    }

    return this.$props.modelValue
  }

  set valueProxy (value: any) {
    this.$emit('update:modelValue', value)
  }

  get isArrayValue () {
    return Array.isArray(this.$props.modelValue)
  }

  get isPrimitiveValue () {
    return typeof this.$props.modelValue === 'string' || typeof this.$props.modelValue === 'number'
  }

  get isObjectValue () {
    return !this.isArrayValue && !this.isPrimitiveValue
  }

  get inputVisible () {
    return this.$props.searchable || this.$props.allowCreate
  }

  get visible () {
    return this.isMounted ? (this.$refs as any).dropdown.isClicked : false
  }

  get selectClass () {
    return {
      'va-select--multiple': this.$props.multiple,
      'va-select--visible': this.visible,
      'va-select--searchable': this.$props.searchable,
      'va-select--disabled': this.$props.disabled,
      'va-select--loading': this.$props.loading,
      'va-select_error': this.computedError,
    }
  }

  get selectionValue (): string {
    if (!this.valueProxy) {
      return ''
    }
    if (this.$props.multiple) {
      return this.valueProxy.length ? `${this.valueProxy.length} items selected` : ''
    }
    // We try to find a match from options, if we don't find any - we take value.
    // This way select can display value even when options are not loaded yet.
    const selectedOption = this.valueProxy || this.selectedOption
    const isPrimitive = ['string', 'number'].includes(typeof selectedOption)
    return isPrimitive ? selectedOption : selectedOption[this.$props.textBy as string] + ''
  }

  get selectionChips (): string | string[] {
    if (this.isArrayValue && this.valueProxy.length > (this.$props.chipMax as number)) {
      return this.valueProxy.length ? `${this.valueProxy.length} items selected` : ''
    }
    if (this.$props.multiple && this.$props.chips) {
      return this.valueProxy.map((value: any) => this.getText(value))
    }
    if (this.isArrayValue) {
      const stringValueArr: string[] = this.valueProxy.map((value: any) => this.getText(value))
      return stringValueArr.join(', ')
    }
    return ''
  }

  get filteredOptions (): any[] {
    if (!this.$props.hideSelected) {
      return this.$props.options as []
    }
    return (this.$props.options as []).reduce((acc: any[], option: any) => {
      return this.getSelectedState(option) ? [...acc] : [...acc, option]
    }, [])
  }

  get selectedOption () {
    return (
      !this.valueProxy ||
      this.$props.multiple)
      ? null
      : (this.$props.options as []).find((option: any) => this.compareOptions(option, this.valueProxy)) ||
      null
  }

  get showClearIcon (): boolean {
    if (!this.$props.clearable) {
      return false
    }
    if (this.$props.disabled) {
      return false
    }
    return this.$props.multiple ? !!this.valueProxy.length : this.valueProxy !== this.$props.clearValue
  }

  get toggleIcon (): string {
    if (typeof this.$props.dropdownIcon !== 'string' && this.$props.dropdownIcon) {
      return this.visible ? this.$props.dropdownIcon.close : this.$props.dropdownIcon.open
    }
    return this.$props.dropdownIcon ? this.$props.dropdownIcon : ''
  }

  compareOptions (one: any, two: any) {
    // identity check works nice for strings and exact matches.
    if (one === two) {
      return true
    }
    // i'm not sure why we need this
    if (typeof this.$props.modelValue === 'string') {
      return false
    }
    if (typeof one === 'string' && typeof two === 'string') {
      return one === two
    }
    if (typeof one === 'object' && typeof two === 'object') {
      return one[this.$props.trackBy as string] === two[this.$props.trackBy as string]
    }
  }

  getSelectedState (option: any): boolean {
    if (!this.valueProxy) {
      return false
    }
    if (typeof option === 'string') {
      return this.$props.multiple
        ? this.valueProxy.includes(option)
        : this.valueProxy === option
    } else {
      return this.$props.multiple
        ? this.valueProxy.filter((item: any) =>
          item[this.$props.trackBy as string] === option[this.$props.trackBy as string]).length
        : this.valueProxy[this.$props.trackBy as string] === option[this.$props.trackBy as string]
    }
  }

  isHovered (option: any) {
    return this.hoveredOption
      ? typeof option === 'string'
        ? option === this.hoveredOption
        : this.hoveredOption[this.$props.trackBy as string] === option[this.$props.trackBy as string]
      : false
  }

  selectOption (option: any): void {
    this.search = ''
    const isSelected = this.getSelectedState(option)
    const value: any = this.$props.modelValue || []

    if (this.$props.multiple) {
      const filterSelected = () => {
        return value.filter((optionSelected: any) => !this.compareOptions(option, optionSelected))
      }
      this.valueProxy = isSelected ? filterSelected() : [...value, option]
    } else {
      this.valueProxy = typeof option === 'string' ? option : { ...option }
      ;(this as any).$refs.dropdown.hide()
    }
    if (this.inputVisible) {
      // eslint-disable-next-line no-unused-expressions
      (this as any).$refs.searchBar?.$refs.input?.focus()
    }
  }

  addNewOption (): void {
    if (this.$props.allowCreate) {
      if (this.$props.multiple) {
        const hasAddedOption: boolean = this.valueProxy.some((value: any) => value === this.search)
        // Do not change valueProxy if option already exist
        if (this.$props.allowCreate === 'unique' && hasAddedOption) {
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
      const hoveredOption: any = (this.$refs.optionList as any).hoveredOption
      hoveredOption && this.selectOption((this.$refs.optionList as any).hoveredOption)
    }
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
    this.valueProxy = this.$props.multiple
      ? (Array.isArray(this.$props.clearValue) ? this.$props.clearValue : [])
      : this.$props.clearValue
    this.search = ''
    this.$props.modelValue = this.$props.clearValue
    this.$emit('clear')
  }

  mounted (): void {
    this.isMounted = true
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

    &.va-select__dropdown-position-top {
      box-shadow: 0 -2px 3px 0 rgba(98, 106, 119, 0.25);
    }

    .va-dropdown__anchor {
      display: block;
    }

    .va-dropdown__content {
      background: white;
      margin: var(--va-select-dropdown-content-margin);
      padding: var(--va-select-dropdown-content-padding);
      overflow-y: auto;
      border-radius: 4px;
      filter: drop-shadow(0 4px 8px rgba(59, 63, 73, 0.15));
      margin-right: -4px;

      @include va-scroll();
    }
  }
}
</style>
