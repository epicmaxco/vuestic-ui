<template>
  <va-dropdown
    ref="dropdown"
    v-model="showDropdownContentComputed"
    class="va-select va-select__dropdown va-select-dropdown"
    v-bind="dropdownPropsComputed"
  >
    <template #anchor>
      <va-input-wrapper
        v-bind="inputWrapperPropsComputed"
        ref="input"
        class="va-select__anchor va-select-anchor__input"
        :class="inputWrapperClassComputed"
        :model-value="valueString"
        :readonly="true"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @click="focusAutocompleteInput"
        @keydown.enter="toggleDropdown"
        @keydown.space.stop.prevent="toggleDropdown"
      >
        <template
          v-for="(_, name) in $slots"
          :key="name"
          v-slot:[name]="slotScope"
        >
          <slot :name="name" v-bind="slotScope" />
        </template>

        <template #icon>
          <va-icon
            v-if="showClearIcon"
            role="button"
            :aria-label="tp($props.ariaClearLabel)"
            v-bind="clearIconProps"
            @click.stop="reset"
            @keydown.enter.stop="reset"
            @keydown.space.stop="reset"
          />
        </template>

        <template #appendInner>
          <va-icon
            :color="toggleIconColor"
            :name="toggleIcon"
            size="small"
            class="va-select__toggle-icon"
          />
        </template>

        <template #default>
          <va-select-content
            v-bind="selectContentPropsComputed"
            @toggle-hidden="toggleHiddenOptionsState"
            @autocomplete-input="setAutocompleteValue"
            @focus-prev="focusPreviousOption"
            @focus-next="focusNextOption"
            @select-option="selectOrAddOption"
            @delete-last-selected="deleteLastSelected"
          >
            <template
              v-for="(_, name) in $slots"
              :key="name"
              v-slot:[name]="slotScope"
            >
              <slot :name="name" v-bind="slotScope" />
            </template>
          </va-select-content>
        </template>
      </va-input-wrapper>
    </template>

    <va-dropdown-content
      class="va-select-dropdown__content"
      :style="{ width: $props.width }"
      @keydown.esc="hideAndFocus"
    >
      <va-input-wrapper
        v-if="showSearchInput"
        ref="searchBar"
        class="va-select-dropdown__content-search-input"
        v-model="searchInput"
        :aria-label="tp($props.ariaSearchLabel)"
        :tabindex="tabIndexComputed"
        :placeholder="tp($props.searchPlaceholderText)"
        preset="bordered"
        @keydown.up.stop.prevent="focusPreviousOption"
        @keydown.left.stop.prevent="focusPreviousOption"
        @keydown.down.stop.prevent="focusNextOption"
        @keydown.right.stop.prevent="focusNextOption"
        @keydown.enter.prevent="selectOrAddOption"
        @focus="hoveredOption = null"
      />
      <va-select-option-list
        ref="optionList"
        class="va-select-dropdown__options-wrapper"
        v-model:hoveredOption="hoveredOption"
        :style="{ maxHeight: $props.maxHeight }"
        v-bind="optionsListPropsComputed"
        @select-option="selectHoveredOption"
        @no-previous-option-to-hover="focusSearchBar"
        @keydown.tab.stop.prevent="searchBar && searchBar.focus()"
        @keydown="onHintedSearch"
        @scroll-bottom="onScrollBottom"
        v-slot="slotData"
      >
        <slot name="option" v-bind="slotData || {}" />
      </va-select-option-list>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, computed, watch, nextTick, type PropType, type Ref } from 'vue'
import pick from 'lodash/pick.js'

import {
  useComponentPresetProp,
  useSelectableList, useSelectableListProps,
  useValidation, useValidationProps, useValidationEmits, ValidationProps,
  useFormFieldProps,
  useLoadingProps,
  useMaxSelections, useMaxSelectionsProps,
  useClearableProps, useClearable, useClearableEmits,
  useFocusDeep,
  useTranslation,
  useBem,
  useThrottleProps,
  useDropdownable, useDropdownableEmits, useDropdownableProps, useSyncProp,
} from '../../composables'

import { VaInputWrapper } from '../va-input-wrapper'
import { VaDropdown, VaDropdownContent } from '../va-dropdown'
import { VaIcon } from '../va-icon'
import { VaSelectOptionList } from './components/VaSelectOptionList'
import { VaSelectContent } from './components/VaSelectContent'

import { useMaxVisibleOptions, useMaxVisibleOptionsProps } from './hooks/useMaxVisibleOptions'
import { useToggleIcon, useToggleIconProps } from './hooks/useToggleIcon'
import { useStringValue, useStringValueProps } from './hooks/useStringValue'
import { useAutocomplete, useAutocompleteProps } from './hooks/useAutocomplete'

import { blurElement, focusElement } from '../../utils/focus'
import { unwrapEl } from '../../utils/unwrapEl'
import { isNilValue } from '../../utils/isNilValue'
import { warn } from '../../utils/console'

import type { SelectOption } from './types'
import type { DropdownOffsetProp } from '../va-dropdown/types'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

const VaInputWrapperProps = extractComponentProps(VaInputWrapper)

export default defineComponent({
  name: 'VaSelect',

  components: {
    VaSelectContent,
    VaSelectOptionList,
    VaIcon,
    VaDropdown,
    VaDropdownContent,
    VaInputWrapper,
  },

  emits: [
    'update:modelValue',
    'update-search',
    'create-new',
    'scroll-bottom',
    'update:search',
    ...useDropdownableEmits,
    ...useValidationEmits,
    ...useClearableEmits,
  ],

  props: {
    ...VaInputWrapperProps,
    ...useComponentPresetProp,
    ...useSelectableListProps,
    ...useValidationProps as ValidationProps<SelectOption>,
    ...useLoadingProps,
    ...useMaxSelectionsProps,
    ...useClearableProps,
    ...useFormFieldProps,
    ...useMaxVisibleOptionsProps,
    ...useToggleIconProps,
    ...useThrottleProps,
    ...useStringValueProps,
    ...useAutocompleteProps,
    ...useDropdownableProps,

    modelValue: {
      type: [String, Number, Array, Object, Boolean] as PropType<SelectOption | SelectOption[]>,
      default: '',
    },

    // Dropdown placement
    placement: {
      ...useDropdownableProps.placement,
      default: 'bottom',
    },

    allowCreate: {
      type: [Boolean, String] as PropType<boolean | 'unique'>,
      default: false,
      validator: (mode: string | boolean) => [true, false, 'unique'].includes(mode),
    },

    color: { type: String, default: 'primary' },
    multiple: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    width: { type: String, default: '100%' },
    maxHeight: { type: String, default: '256px' },
    noOptionsText: { type: String, default: '$t:noOptions' },
    hideSelected: { type: Boolean, default: false },
    tabindex: { type: [String, Number], default: 0 },
    virtualScroller: { type: Boolean, default: false },
    selectedTopShown: { type: Boolean, default: false },
    highlightMatchedText: { type: Boolean, default: true },
    minSearchChars: { type: Number, default: 0 },
    autoSelectFirstOption: { type: Boolean, default: false },

    // Input style
    placeholder: { type: String, default: '' },
    searchPlaceholderText: { type: String, default: '$t:search' },

    ariaSearchLabel: { type: String, default: '$t:optionsFilter' },
    ariaClearLabel: { type: String, default: '$t:reset' },

    search: { type: String, default: undefined },
  },

  setup (props, { emit, slots }) {
    const { tp, t } = useTranslation()

    const optionList = shallowRef<typeof VaSelectOptionList>()
    const input = shallowRef<typeof VaInputWrapper>()
    const searchBar = shallowRef<typeof VaInputWrapper>()

    const isInputFocused = useFocusDeep(input as any)

    const { getValue, getText, getTrackBy } = useSelectableList(props)

    const onScrollBottom = () => emit('scroll-bottom')

    const [searchVModel] = useSyncProp('search', props, emit, '')
    const showSearchInput = computed(() => props.searchable || (props.allowCreate && !props.autocomplete))

    watch(searchVModel, (value) => {
      emit('update-search', value)
      if (!props.autocomplete) {
        hoveredOption.value = null
      }
    })

    const getOptionByValue = (value: SelectOption): SelectOption => {
      // if value is an object, it should be selectable option itself
      if (isNilValue(value) || typeof value === 'object') { return value }

      const optionByValue = props.options.find((option) => value === getValue(option))

      if (optionByValue === undefined) {
        warn(`[VaSelect]: can not find option in options list (${JSON.stringify(props.options)}) by provided value (${JSON.stringify(value)})!`)

        return value
      }

      return optionByValue
    }

    const {
      toggleHiddenOptionsState,
      isAllOptionsShown,
      visibleSelectedOptions,
      hiddenSelectedOptionsAmount,
      allSelectedOptions,
    } = useMaxVisibleOptions(props, getOptionByValue)

    // select value
    const valueComputed = computed<SelectOption | SelectOption[]>({
      get () {
        if (props.multiple) { return allSelectedOptions.value }

        const value = getOptionByValue(props.modelValue)

        if (Array.isArray(value)) {
          warn('Model value should be a string, number, boolean or an object for a single Select.')

          if (value.length) {
            return value.at(-1)
          }
        }

        return value
      },

      set (option: SelectOption | SelectOption[]) {
        if (Array.isArray(option)) {
          emit('update:modelValue', option.map(getValue))
        } else {
          emit('update:modelValue', getValue(option))
        }
      },
    })

    const valueString = useStringValue(props, visibleSelectedOptions, getText)

    // icons
    const {
      canBeCleared,
      clearIconProps,
      onFocus,
      onBlur,
    } = useClearable(props, valueComputed)

    const showClearIcon = computed(() => {
      if (!canBeCleared.value) { return false }
      if (props.multiple && Array.isArray(valueComputed.value)) { return !!valueComputed.value.length }
      return true
    })

    // options
    const filteredOptions = computed(() => {
      if (!props.options) { return [] }

      if (props.selectedTopShown) {
        return props.options.slice().sort((a, b) => {
          const isASelected = checkIsOptionSelected(a)
          const isBSelected = checkIsOptionSelected(b)

          if (isASelected && isBSelected) { return 0 }
          if (isASelected && !isBSelected) { return -1 }

          return 1
        })
      }

      if (props.hideSelected) {
        return props.options.filter((option) => !checkIsOptionSelected(option))
      }

      return props.options
    })

    const checkIsOptionSelected = (option: SelectOption) => {
      if (isNilValue(valueComputed.value)) { return false }

      if (Array.isArray(valueComputed.value)) {
        return !isNilValue(valueComputed.value.find((valueItem) => compareOptions(valueItem, option)))
      }

      return compareOptions(valueComputed.value, option)
    }

    const compareOptions = (option1: SelectOption, option2: SelectOption) => {
      const one = getValue(option1)
      const two = getValue(option2)

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
        return getTrackBy(one) === getTrackBy(two)
      }

      return false
    }

    const isValueComputedArray = (v: Ref<SelectOption | SelectOption[]>): v is Ref<SelectOption[]> => Array.isArray(v.value)

    const selectOption = (option: SelectOption) => {
      if (hoveredOption.value === null) {
        hideAndFocus()
        return
      }

      if (showSearchInput.value) {
        searchVModel.value = ''
      }

      if (props.multiple && isValueComputedArray(valueComputed)) {
        const { exceedsMaxSelections, addOption } = useMaxSelections(valueComputed, ref(props.maxSelections))

        const isSelected = checkIsOptionSelected(option)

        if (isSelected) {
          // Unselect
          valueComputed.value = valueComputed.value.filter((optionSelected) => !compareOptions(option, optionSelected))
        } else {
          if (exceedsMaxSelections()) { return }
          valueComputed.value = addOption(option)
        }
      } else {
        valueComputed.value = typeof option !== 'object' ? option : { ...option }
        hideAndFocus()
      }

      focusAutocompleteInput()
    }

    const addNewOption = () => {
      // Do not emit if option already exist and allow create is `unique`
      const hasAddedOption = props.options?.some((option: SelectOption) => [searchVModel.value, autocompleteValue.value].includes(getText(option)))

      const allowedToCreateCheck = !((props.allowCreate === 'unique' || props.autocomplete) && hasAddedOption)
      if (allowedToCreateCheck) {
        emit('create-new', searchVModel.value || autocompleteValue.value)

        searchVModel.value = ''
        autocompleteValue.value = ''
      }
    }

    // Hovered options

    const hoveredOption = ref<SelectOption | null>(null)

    const selectHoveredOption = () => {
      if (isNilValue(hoveredOption.value)) { return }

      if (!isOpenSync.value) {
        // We can not select options if they are hidden
        handleDropdownOpen()
        return
      }

      selectOption(hoveredOption.value)
    }

    const selectOrAddOption = () => {
      const allowedToCreate = !!props.allowCreate && (searchVModel.value || autocompleteValue.value)

      if (hoveredOption.value !== null) {
        selectHoveredOption()
      } else if (allowedToCreate) {
        addNewOption()
      }
    }

    const focusPreviousOption = () => optionList.value?.focusPreviousOption()

    const focusNextOption = () => optionList.value?.focusNextOption()

    // Dropdown content

    const { isOpenSync, dropdownProps } = useDropdownable(props, emit, {
      defaultCloseOnValueUpdate: computed(() => !props.multiple),
    })

    const dropdownPropsComputed = computed(() => ({
      ...dropdownProps.value,
      closeOnContentClick: false,
      stateful: false,
      offset: [1, 0] as DropdownOffsetProp,
      keepAnchorWidth: true,
      keyboardNavigation: true,
      innerAnchorSelector: '.va-input-wrapper__field',
      'aria-label': props.ariaLabel || (props.modelValue ? `${t('selectedOption')}: ${props.modelValue}` : t('noSelectedOption')),
    }))

    const showDropdownContentComputed = computed({
      get: () => isOpenSync.value,
      set: (show: boolean) => {
        show ? handleDropdownOpen() : handleDropdownClose()
      },
    })

    const handleDropdownOpen = () => {
      if (props.disabled || props.readonly) { return }

      isOpenSync.value = true
      scrollToSelected()
      focusSearchOrOptions()
    }

    const handleDropdownClose = () => {
      isOpenSync.value = false
      if (!props.autocomplete) {
        searchVModel.value = ''
      }
      nextTick(() => {
        validate()
        isInputFocused.focusIfNothingIfFocused()
      })
    }

    const hideAndFocus = () => {
      handleDropdownClose()
      isInputFocused.value = true
    }

    const focusSearchBar = () => {
      searchBar.value?.focus()
    }

    const focusOptionList = () => {
      optionList.value?.focus()
      !props.modelValue && optionList.value?.focusFirstOption()
    }

    const focusSearchOrOptions = async () => {
      await nextTick()

      if (showSearchInput.value) {
        focusSearchBar()
      } else {
        focusOptionList()
      }
    }

    const onInputBlur = () => {
      if (showDropdownContentComputed.value) { return }

      onBlur()

      isInputFocused.value
        ? isInputFocused.value = false
        : validate()
    }

    const tabIndexComputed = computed(() => props.disabled ? -1 : props.tabindex)
    const inputWrapperTabIndexComputed = computed(() => props.disabled || props.autocomplete ? -1 : 0)

    const scrollToSelected = () => {
      const selected = valueComputed.value
      const nothingSelected = typeof selected !== 'object' && Array.isArray(selected) && !selected.length

      if (nothingSelected) { return }

      const scrollTo = Array.isArray(selected) ? selected[selected.length - 1] : selected
      hoveredOption.value = scrollTo
      nextTick(() => optionList.value?.scrollToOption(scrollTo))
    }

    // Hinted search

    let hintedSearchQuery = ''
    let hintedSearchQueryTimeoutIndex!: ReturnType<typeof setTimeout>
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' ']

    // Hinted search - hover option if you typing it's value on select without search-bar
    const onHintedSearch = (event: KeyboardEvent) => {
      if (navigationKeys.some(key => key === event.key)) {
        return
      }

      const isLetter: boolean = event.key.length === 1
      const isDeleteKey: boolean = event.key === 'Backspace' || event.key === 'Delete'

      clearTimeout(hintedSearchQueryTimeoutIndex)

      if (isDeleteKey) {
        // Remove last letter from query
        hintedSearchQuery = hintedSearchQuery ? hintedSearchQuery.slice(0, -1) : ''
      } else if (isLetter) {
        // Add every new letter to the query
        hintedSearchQuery += event.key
      }

      if (showSearchInput.value) {
        searchVModel.value = hintedSearchQuery
        return
      }

      // Search for an option that matches the query
      if (hintedSearchQuery) {
        const appropriateOption = props.options.find(option => getText(option).toLowerCase().startsWith(hintedSearchQuery.toLowerCase()))
        if (appropriateOption) {
          hoveredOption.value = appropriateOption
        }
      }

      hintedSearchQueryTimeoutIndex = setTimeout(() => { hintedSearchQuery = '' }, 1000)
    }

    const optionsListPropsComputed = computed(() => ({
      ...pick(props, ['textBy', 'trackBy', 'groupBy', 'valueBy', 'disabledBy', 'color', 'virtualScroller', 'highlightMatchedText', 'minSearchChars', 'delay', 'selectedTopShown']),
      autoSelectFirstOption: props.autoSelectFirstOption || props.autocomplete,
      search: searchVModel.value || autocompleteValue.value,
      tabindex: tabIndexComputed.value,
      selectedValue: valueComputed.value,
      options: filteredOptions.value,
      getSelectedState: checkIsOptionSelected,
      noOptionsText: tp(props.noOptionsText),
    }))

    const { toggleIcon, toggleIconColor } = useToggleIcon(props, isOpenSync)

    // input wrapper
    const isFocused = computed(() => isInputFocused.value || isOpenSync.value)
    const inputWrapperClassComputed = useBem('va-select-anchor', () => ({
      nowrap: !!(props.maxVisibleOptions && !slots.content),
    }))
    const vaInputWrapperProps = filterComponentProps(VaInputWrapperProps)
    const inputWrapperPropsComputed = computed(() => ({
      ...vaInputWrapperProps.value,
      error: computedError.value,
      errorMessages: computedErrorMessages.value,
      focused: isFocused.value,
      tabindex: inputWrapperTabIndexComputed.value,
    }))

    // select content
    const selectContentPropsComputed = computed(() => ({
      ...pick(props, ['placeholder', 'autocomplete', 'multiple', 'disabled', 'readonly']),
      tabindex: tabIndexComputed.value,
      value: visibleSelectedOptions.value,
      valueString: valueString.value,
      hiddenSelectedOptionsAmount: hiddenSelectedOptionsAmount.value,
      isAllOptionsShown: isAllOptionsShown.value,
      focused: isInputFocused.value,
      autocompleteInputValue: autocompleteValue.value,
      getText,
    }))

    // autocomplete
    const autocompleteValue = useAutocomplete(searchVModel, props, visibleSelectedOptions, isOpenSync, getText)
    const setAutocompleteValue = (v: string) => (autocompleteValue.value = v)

    // public methods
    const focus = () => {
      if (props.disabled) { return }
      focusElement(unwrapEl(input.value))
    }

    const blur = () => {
      if (showDropdownContentComputed.value) {
        showDropdownContentComputed.value = false
      }

      nextTick(() => {
        if (props.disabled) { return }
        blurElement(unwrapEl(input.value))
      })
    }

    const reset = () => withoutValidation(() => {
      if (props.multiple) {
        valueComputed.value = Array.isArray(props.clearValue) ? props.clearValue : []
      } else {
        valueComputed.value = props.clearValue
      }

      searchVModel.value = ''
      emit('clear')
      resetValidation()
      nextTick(() => {
        isInputFocused.value = true
      })
    })

    const focusAutocompleteInput = (e?: Event) => {
      if (props.autocomplete && !props.disabled && !props.readonly) {
        e?.stopImmediatePropagation()

        isInputFocused.value = true
        isOpenSync.value = true
      }
    }

    const toggleDropdown = (e: KeyboardEvent) => {
      if (props.disabled || props.readonly) { return }

      if (e.code === 'Space' && props.autocomplete) { return }

      showDropdownContentComputed.value = !showDropdownContentComputed.value
    }

    const deleteLastSelected = () => {
      if (!Array.isArray(valueComputed.value)) { return }

      valueComputed.value = valueComputed.value.slice(0, -1)
    }

    const {
      validate,
      computedError,
      computedErrorMessages,
      withoutValidation,
      resetValidation,
    } = useValidation(props, emit, { reset, focus, value: valueComputed })

    return {
      input,
      optionList,
      searchBar,

      reset,
      focus,
      blur,
      toggleDropdown,
      deleteLastSelected,

      focusAutocompleteInput,

      tp,
      t,

      onInputFocus: onFocus,
      onInputBlur,
      focusOptionList,
      focusSearchBar,
      searchInput: searchVModel,
      showSearchInput,
      hoveredOption,
      tabIndexComputed,
      valueString,
      showClearIcon,
      toggleIcon,
      selectOption,
      selectOrAddOption,
      selectHoveredOption,
      focusPreviousOption,
      focusNextOption,
      showDropdownContentComputed,
      handleDropdownOpen,
      handleDropdownClose,
      hideAndFocus,
      toggleIconColor,
      onHintedSearch,
      onScrollBottom,
      clearIconProps,
      dropdownPropsComputed,
      visibleSelectedOptions,
      optionsListPropsComputed,
      toggleHiddenOptionsState,
      setAutocompleteValue,

      inputWrapperPropsComputed,
      inputWrapperClassComputed,
      selectContentPropsComputed,

      // for e2e tests
      getOptionByValue,
      compareOptions,
      getText,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-select {
  & .va-input-wrapper__text {
    line-height: normal;
    flex-wrap: wrap;
  }
}

.va-select-anchor {
  &__input {
    cursor: var(--va-select-cursor);
    flex: 1;
  }

  &--nowrap {
    .va-input-wrapper__text {
      flex-wrap: nowrap;
    }
  }
}

.va-select-dropdown {
  &__content {
    overflow: hidden;
    border-bottom-right-radius: var(--va-select-dropdown-border-radius);
    border-bottom-left-radius: var(--va-select-dropdown-border-radius);
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    box-shadow: var(--va-select-box-shadow);
    padding: 0;
  }

  &__content-search-input {
    min-width: auto;
    width: 100%;
  }

  &__options-wrapper {
    background: var(--va-select-dropdown-background);
    overflow-y: auto;

    @include va-scroll(var(--va-background-element));
  }
}
</style>
