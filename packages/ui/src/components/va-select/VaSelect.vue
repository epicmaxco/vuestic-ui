<template>
  <va-dropdown
    ref="dropdown"
    v-model="showDropdownContentComputed"
    class="va-select va-select__dropdown va-select-dropdown"
    v-bind="dropdownPropsComputed"
    @close="focus"
  >
    <template #anchor>
      <va-input-wrapper
        ref="input"
        class="va-select__anchor va-select-anchor__input"
        :class="inputWrapperClassComputed"
        :model-value="valueComputedString"
        v-bind="inputWrapperPropsComputed"
        @focus="onInputFocus"
        @blur="onInputBlur"
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
            :aria-label="t('reset')"
            tabindex="0"
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
          />
        </template>

        <template #default>
          <va-select-content
            v-bind="selectContentPropsComputed"
            @toggle-hidden="toggleHiddenOptionsState"
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
    >
      <va-input
        v-if="showSearchInput"
        ref="searchBar"
        class="va-select-dropdown__content-search-input"
        v-model="searchInput"
        :aria-label="t('optionsFilter')"
        :tabindex="tabIndexComputed"
        :placeholder="tp($props.searchPlaceholderText)"
        bordered
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
        @select-option="selectOption"
        @no-previous-option-to-hover="focusSearchBar"
        @keydown.enter.stop.prevent="selectHoveredOption"
        @keydown.space.stop.prevent="selectHoveredOption"
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

import { warn } from '../../utils/console'
import {
  useComponentPresetProp,
  useSelectableList, useSelectableListProps,
  useValidation, useValidationProps, useValidationEmits, ValidationProps,
  useFormProps,
  useLoadingProps,
  useMaxSelections, useMaxSelectionsProps,
  useClearableProps, useClearable, useClearableEmits,
  useFocusDeep,
  useTranslation,
  useBem,
} from '../../composables'

import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

import {
  VaDropdown,
  VaDropdownContent,
  VaIcon,
  VaInput,
  VaInputWrapper,
} from '../index'
import { VaSelectOptionList } from './components/VaSelectOptionList'
import { VaSelectContent } from './components/VaSelectContent'

import { useMaxVisibleOptions, useMaxVisibleOptionsProps } from './hooks/useMaxVisibleOptions'
import { useToggleIcon, useToggleIconProps } from './hooks/useToggleIcon'

import type { SelectOption, Placement } from './types'
import type { DropdownOffsetProp } from '../va-dropdown/types'

const VaDropdownProps = extractComponentProps(VaDropdown,
  ['keyboardNavigation', 'offset', 'stateful', 'keepAnchorWidth', 'closeOnContentClick', 'innerAnchorSelector', 'modelValue'],
)

export default defineComponent({
  name: 'VaSelect',

  components: {
    VaSelectContent,
    VaSelectOptionList,
    VaIcon,
    VaDropdown,
    VaDropdownContent,
    VaInput,
    VaInputWrapper,
  },

  emits: [
    'update:modelValue',
    'update-search',
    'create-new',
    'scroll-bottom',
    ...useValidationEmits,
    ...useClearableEmits,
  ],

  props: {
    ...VaDropdownProps,
    ...useComponentPresetProp,
    ...useSelectableListProps,
    ...useValidationProps as ValidationProps<SelectOption>,
    ...useLoadingProps,
    ...useMaxSelectionsProps,
    ...useClearableProps,
    ...useFormProps,
    ...useMaxVisibleOptionsProps,
    ...useToggleIconProps,

    modelValue: {
      type: [String, Number, Array, Object] as PropType<SelectOption | SelectOption[]>,
      default: '',
    },

    // Dropdown placement
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
      validator: (placement: string) => ['top', 'bottom'].includes(placement),
    },

    allowCreate: {
      type: [Boolean, String] as PropType<boolean | 'unique'>,
      default: false,
      validator: (mode: string | boolean) => [true, false, 'unique'].includes(mode),
    },

    color: { type: String, default: 'primary' },
    multiple: { type: Boolean, default: false },
    searchable: { type: Boolean, default: false },
    separator: { type: String, default: ', ' },
    width: { type: String, default: '100%' },
    maxHeight: { type: String, default: '256px' },
    noOptionsText: { type: String, default: '$t:noOptions' },
    hideSelected: { type: Boolean, default: false },
    tabindex: { type: Number, default: 0 },
    virtualScroller: { type: Boolean, default: false },
    selectedTopShown: { type: Boolean, default: false },

    // Input style
    outline: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    searchPlaceholderText: { type: String, default: '$t:search' },
    requiredMark: { type: Boolean, default: false },
  },

  setup (props, { emit, slots }) {
    const optionList = shallowRef<typeof VaSelectOptionList>()
    const input = shallowRef<typeof VaInputWrapper>()
    const searchBar = shallowRef<typeof VaInput>()

    const isInputFocused = useFocusDeep(input as any)

    const { getOptionByValue, getValue, getText, getTrackBy } = useSelectableList(props)

    const onScrollBottom = () => emit('scroll-bottom')

    const searchInput = ref('')
    const showSearchInput = computed(() => props.searchable || props.allowCreate)

    watch(searchInput, (value) => {
      emit('update-search', value)
      hoveredOption.value = null
    })

    const {
      toggleHiddenOptionsState,
      isAllOptionsShown,
      visibleSelectedOptions,
      hiddenSelectedOptionsAmount,
      allSelectedOptions,
    } = useMaxVisibleOptions(props)

    // select value
    const valueComputed = computed<SelectOption | SelectOption[]>({
      get () {
        if (props.multiple) { return allSelectedOptions.value }

        const value = getOptionByValue(props.modelValue)

        if (Array.isArray(value)) {
          warn('Model value should be a string or a number for a single Select.')

          if (value.length) {
            return value[value.length - 1]
          }
        }

        return value
      },

      set (value: SelectOption | SelectOption[]) {
        if (Array.isArray(value)) {
          emit('update:modelValue', value.map(getValue))
        } else {
          emit('update:modelValue', getValue(value))
        }
      },
    })

    const valueComputedString = computed<string>(() => {
      if (!valueComputed.value && valueComputed.value !== 0) { return props.clearValue }

      if (typeof valueComputed.value === 'string' || typeof valueComputed.value === 'number') { return valueComputed.value }

      if (Array.isArray(valueComputed.value)) {
        return visibleSelectedOptions.value.map((value) => getText(value)).join(props.separator) || props.clearValue
      }

      return getText(valueComputed.value)
    })

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
      if (!valueComputed.value) { return false }

      if (Array.isArray(valueComputed.value)) {
        return !!valueComputed.value.find((valueItem) => compareOptions(valueItem, option))
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
        searchInput.value = ''
      }

      if (props.multiple && isValueComputedArray(valueComputed)) {
        const { exceedsMaxSelections, addOption } = useMaxSelections(valueComputed, ref(props.maxSelections))

        const isSelected = checkIsOptionSelected(getValue(option))

        if (isSelected) {
          // Unselect
          valueComputed.value = valueComputed.value.filter((optionSelected) => !compareOptions(getValue(option), getValue(optionSelected)))
        } else {
          if (exceedsMaxSelections()) { return }
          valueComputed.value = addOption(option)
        }
      } else {
        valueComputed.value = typeof option === 'string' || typeof option === 'number' ? option : { ...option }
        hideAndFocus()
      }
    }

    const addNewOption = () => {
      // Do not emit if option already exist and allow create is `unique`
      const hasAddedOption = props.options?.some((option: SelectOption) => getText(option) === searchInput.value)

      if (!(props.allowCreate === 'unique' && hasAddedOption)) {
        emit('create-new', searchInput.value)
        searchInput.value = ''
      }
    }

    // Hovered options

    const hoveredOption = ref<SelectOption | null>(null)

    const selectHoveredOption = () => {
      if (!hoveredOption.value && hoveredOption.value !== 0) { return }

      if (!showDropdownContent.value) {
        // We can not select options if they are hidden
        showDropdown()
        return
      }

      selectOption(hoveredOption.value)
    }

    const selectOrAddOption = () => {
      const allowedToCreate = !!props.allowCreate && searchInput.value !== ''

      if (hoveredOption.value !== null) {
        selectHoveredOption()
      } else if (allowedToCreate) {
        addNewOption()
      }
    }

    const focusPreviousOption = () => optionList.value?.focusPreviousOption()

    const focusNextOption = () => optionList.value?.focusNextOption()

    // Dropdown content

    const showDropdownContent = ref(false)

    const showDropdownContentComputed = computed({
      get: () => showDropdownContent.value,
      set: (show: boolean) => {
        show ? showDropdown() : hideDropdown()
      },
    })

    const closeOnContentClick = computed(() => {
      return !(props.multiple || props.searchable || props.allowCreate)
    })

    const showDropdown = () => {
      if (props.disabled || props.readonly) { return }

      showDropdownContent.value = true
      scrollToSelected()
      focusSearchOrOptions()
    }

    const hideDropdown = () => {
      showDropdownContent.value = false
      searchInput.value = ''
      validate()
    }

    const hideAndFocus = () => {
      hideDropdown()
      isInputFocused.value = true
    }

    const focusSearchBar = () => {
      searchBar.value?.focus()
    }

    const focusOptionList = () => {
      optionList.value?.focus()
      !props.modelValue && optionList.value?.focusFirstOption()
    }

    const focusSearchOrOptions = () => nextTick(() => {
      if (showSearchInput.value) {
        focusSearchBar()
      } else {
        focusOptionList()
      }
    })

    const onInputFocus = () => {
      isInputFocused.value = true
      onFocus()
    }

    const onInputBlur = () => {
      if (showDropdownContentComputed.value) { return }

      onBlur()

      isInputFocused.value
        ? isInputFocused.value = false
        : validate()
    }

    const tabIndexComputed = computed(() => props.disabled ? -1 : props.tabindex)

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
        searchInput.value = hintedSearchQuery
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

    const { tp, t } = useTranslation()

    const dropdownPropsComputed = computed(() => ({
      ...filterComponentProps(VaDropdownProps).value,
      closeOnContentClick: closeOnContentClick.value,
      stateful: false,
      offset: [1, 0] as DropdownOffsetProp,
      keepAnchorWidth: true,
      keyboardNavigation: true,
      innerAnchorSelector: '.va-input-wrapper__field',
      'aria-label': props.modelValue ? `${t('selectedOption')}: ${props.modelValue}` : t('noSelectedOption'),
    }))

    const optionsListPropsComputed = computed(() => ({
      ...pick(props, ['textBy', 'trackBy', 'groupBy', 'disabledBy', 'color', 'virtualScroller']),
      search: searchInput.value,
      tabindex: tabIndexComputed.value,
      selectedValue: valueComputed.value,
      options: filteredOptions.value,
      getSelectedState: checkIsOptionSelected,
      noOptionsText: tp(props.noOptionsText),
    }))

    const { toggleIcon, toggleIconColor } = useToggleIcon(props, showDropdownContent)

    // input wrapper
    const isFocused = computed(() => isInputFocused.value || showDropdownContent.value)
    const inputWrapperClassComputed = useBem('va-select-anchor', () => ({
      nowrap: !!(props.maxVisibleOptions && !slots.content),
    }))
    const inputWrapperPropsComputed = computed(() => ({
      ...pick(props, ['messages', 'requiredMark', 'bordered', 'outline', 'loading', 'label', 'color', 'success']),
      error: computedError.value,
      errorMessages: computedErrorMessages.value,
      focused: isFocused.value,
      tabindex: tabIndexComputed.value,
    }))

    // select content
    const selectContentPropsComputed = computed(() => ({
      ...pick(props, ['placeholder']),
      tabindex: tabIndexComputed.value,
      value: visibleSelectedOptions.value,
      valueString: valueComputedString.value,
      hiddenSelectedOptionsAmount: hiddenSelectedOptionsAmount.value,
      isAllOptionsShown: isAllOptionsShown.value,
    }))

    // public methods
    const focus = () => {
      if (props.disabled) { return }
      input.value?.focus()
    }

    const blur = () => {
      if (showDropdownContentComputed.value) {
        showDropdownContentComputed.value = false
      }

      nextTick(input.value?.blur)
    }

    const reset = () => withoutValidation(() => {
      if (props.multiple) {
        valueComputed.value = Array.isArray(props.clearValue) ? props.clearValue : []
      } else {
        valueComputed.value = props.clearValue
      }

      searchInput.value = ''
      emit('clear')
      resetValidation()
    })

    const {
      validate,
      computedError,
      computedErrorMessages,
      withoutValidation,
      resetValidation,
    } = useValidation(props, emit, { reset, focus })

    return {
      input,
      optionList,
      searchBar,

      reset,
      focus,
      blur,

      tp,
      t,

      onInputFocus,
      onInputBlur,
      focusOptionList,
      focusSearchBar,
      searchInput,
      showSearchInput,
      hoveredOption,
      tabIndexComputed,
      valueComputedString,
      showClearIcon,
      toggleIcon,
      selectOption,
      selectOrAddOption,
      selectHoveredOption,
      focusPreviousOption,
      focusNextOption,
      showDropdownContentComputed,
      showDropdown,
      hideDropdown,
      hideAndFocus,
      toggleIconColor,
      onHintedSearch,
      onScrollBottom,
      clearIconProps,
      dropdownPropsComputed,
      visibleSelectedOptions,
      optionsListPropsComputed,
      toggleHiddenOptionsState,

      inputWrapperPropsComputed,
      inputWrapperClassComputed,
      selectContentPropsComputed,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-select {
  min-width: var(--va-select-min-width);

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
