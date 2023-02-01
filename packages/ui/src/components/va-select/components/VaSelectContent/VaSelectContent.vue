<template>
  <div
    v-if="$props.autocomplete"
    class="va-select-content__autocomplete"
  >
    <slot
      v-if="$props.multiple || $slots.content"
      name="content"
      v-bind="{
         value: $props.value,
         valueString: $props.valueString,
         tabindex: $props.tabindex,
      }"
    >
      <template v-if="value.length">
        <span
          v-for="(option, index) in value"
          :key="$props.getText(option)"
        >
          {{ $props.getText(option) }}
          {{ index + 1 === value.length ? '' : ', ' }}
        </span>
      </template>

      <template v-else>
        {{ $props.valueString }}
      </template>
    </slot>

    <input
      ref="autocompleteInput"
      v-model="autocompleteInputValue"
      :placeholder="$props.placeholder"
      :disabled="$props.disabled"
      autocomplete="off"
      @keydown.up.stop.prevent="$emit('focus-prev')"
      @keydown.left.stop.prevent="$emit('focus-prev')"
      @keydown.down.stop.prevent="$emit('focus-next')"
      @keydown.right.stop.prevent="$emit('focus-next')"
      @keydown.enter.stop.prevent="$emit('select-option')"
      @keydown.space.stop.prevent="$emit('select-option')"
      @keydown="handleBackspace"
    />
  </div>

  <span
    v-else-if="isPlaceholder"
    class="va-select-content__placeholder"
  >
   {{ $props.placeholder }}
  </span>

  <slot
    v-else
    name="content"
    v-bind="{
      valueString: $props.valueString,
      value: $props.value,
      tabindex: $props.tabindex,
    }"
  >
    {{ $props.valueString }}
  </slot>

  <slot
    name="hiddenOptionsBadge"
    v-bind="{
      amount: $props.hiddenSelectedOptionsAmount,
      isShown: $props.isAllOptionsShown,
      toggle: toggleHiddenOptionsState,
    }"
  >
    <va-badge
      v-if="$props.hiddenSelectedOptionsAmount && !$props.isAllOptionsShown"
      class="va-select-content__state-icon"
      color="info"
      :text="`+${$props.hiddenSelectedOptionsAmount}`"
      :tabindex="$props.tabindex"
      @click.stop="toggleHiddenOptionsState"
    />
  </slot>

  <slot
    name="hideOptionsButton"
    v-bind="{
      isShown: $props.isAllOptionsShown,
      toggle: toggleHiddenOptionsState,
    }"
  >
    <va-icon
      v-if="$props.isAllOptionsShown"
      role="button"
      class="va-select-content__state-icon"
      size="small"
      name="reply"
      :tabindex="$props.tabindex"
      @click.stop="toggleHiddenOptionsState"
    />
  </slot>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, computed, watch, type PropType } from 'vue'

import { VaBadge, VaIcon } from '../../../index'

import type { SelectOption } from '../../../index'

export default defineComponent({
  name: 'VaSelectContent',

  components: { VaBadge, VaIcon },

  props: {
    value: { type: Array as PropType<SelectOption[]> },
    valueString: { type: [String, Number] },
    placeholder: { type: String, default: '' },
    tabindex: { type: Number, default: 0 },
    hiddenSelectedOptionsAmount: { type: Number, default: 0 },
    isAllOptionsShown: { type: Boolean, default: false },
    autocomplete: { type: Boolean, default: false },
    focused: { type: Boolean, default: false },
    dropdownContentShown: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    getText: { type: Function as PropType<(option: SelectOption) => string>, required: true },
  },

  emits: ['toggle-hidden', 'autocomplete-input', 'focus-prev', 'focus-next', 'select-option', 'delete-last-selected'],

  setup (props, { emit }) {
    const autocompleteInput = ref<HTMLInputElement>()

    const isPlaceholder = computed(() => props.placeholder && !props.valueString)

    const toggleHiddenOptionsState = () => emit('toggle-hidden')

    const { dropdownContentShown, valueString, value, focused } = toRefs(props)

    const autocompleteInputValue = ref('')
    const convertToString = (v: number | string | undefined) => v ? String(v) : ''
    const getLastOptionText = (v: SelectOption[] | undefined) => {
      return v && Array.isArray(v) && v.length ? props.getText(v.at(-1)!) : ''
    }
    props.autocomplete && watch([autocompleteInputValue, valueString, dropdownContentShown, value],
      (
        [newAutocompleteValue, newValueString, newDropdownShownState, newValueArray],
        [oldAutocompleteValue, oldValueString, oldDropdownShownState, oldValueArray],
      ) => {
        // just opened, nothing to handle
        if (newDropdownShownState && !oldDropdownShownState) { return }

        // just cleared after blur, nothing to handle
        if (autocompleteInputValue.value === '' && !newDropdownShownState) { return }

        let newValueStringConverted = ''
        let oldValueStringConverted = ''

        // taking string value or last options array text value depending on multiple state
        if (props.multiple) {
          newValueStringConverted = getLastOptionText(newValueArray)
          oldValueStringConverted = getLastOptionText(oldValueArray)
        } else {
          newValueStringConverted = convertToString(newValueString)
          oldValueStringConverted = convertToString(oldValueString)
        }

        if (newValueStringConverted !== oldValueStringConverted) {
          // selected value change handling, not for multiple state
          if (!props.multiple) { autocompleteInputValue.value = newValueStringConverted }
        } else if (newAutocompleteValue !== oldAutocompleteValue && autocompleteInputValue.value !== newValueStringConverted) {
          // autocomplete input handling
          emit('autocomplete-input', newAutocompleteValue)
        }

        if (!newDropdownShownState && oldDropdownShownState && newValueStringConverted !== autocompleteInputValue.value) {
          // handling input wrapper blur, not for multiple state
          autocompleteInputValue.value = props.multiple ? '' : newValueStringConverted
        }
      })

    watch(focused, () => {
      focused.value && autocompleteInput.value?.focus()
    })

    const handleBackspace = (e: KeyboardEvent) => {
      if (props.multiple && value.value?.length && e.key === 'Backspace' && !autocompleteInputValue.value) {
        emit('delete-last-selected')
      }
    }

    return {
      isPlaceholder,
      toggleHiddenOptionsState,
      autocompleteInputValue,
      autocompleteInput,
      handleBackspace,
    }
  },
})
</script>

<style lang="scss">
@import '../../variables';

.va-select-content {
  &__autocomplete {
    display: flex;
    flex-wrap: wrap;
    gap: var(--va-select-content-autocomplete-gap);
    color: var(--va-select-content-autocomplete-color);
    font-size: var(--va-input-font-size);
    line-height: var(--va-select-content-autocomplete-line-height);

    & input {
      flex: 1 1;
    }
  }

  &__placeholder {
    overflow: hidden !important;
    flex: 1;
    line-height: normal;
    color: var(--va-input-placeholder-text-color);
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  &__state-icon {
    margin-left: var(--va-select-state-icon-margin-left);
  }
}
</style>
