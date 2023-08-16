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
          <va-icon
            v-if="getIcon(option)"
            size="small"
            class="va-select-option__icon"
            :name="getIcon(option)"
          />
          {{ `${$props.getText(option)}${index + 1 === value.length ? '' : ', '}` }}
        </span>
      </template>

      <template v-else>
        {{ $props.valueString }}
      </template>
    </slot>

    <input
      ref="autocompleteInput"
      v-model="autocompleteInputValueComputed"
      :placeholder="$props.placeholder"
      :disabled="$props.disabled"
      :readonly="$props.readonly"
      autocomplete="off"
      @keydown.up.stop.prevent="$emit('focus-prev')"
      @keydown.down.stop.prevent="$emit('focus-next')"
      @keydown.enter.stop.prevent="$emit('select-option')"
      @keydown="handleBackspace"
    />
  </div>

  <span
    v-else-if="isPlaceholder"
    class="va-select-content__placeholder"
  >
   <input :placeholder="$props.placeholder" readonly />
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
    <va-icon
      v-if="getIcon(value[0])"
      size="small"
      class="va-select-option__icon"
      :name="getIcon(value[0])"
    />
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

import { useFormFieldProps } from '../../../../composables'

import { VaIcon } from '../../../va-icon'
import { VaBadge } from '../../../va-badge'

import type { SelectOption } from '../../../index'

export default defineComponent({
  name: 'VaSelectContent',

  components: { VaBadge, VaIcon },

  props: {
    ...useFormFieldProps,

    value: { type: Array as PropType<SelectOption[]>, required: true },
    valueString: { type: String },
    placeholder: { type: String, default: '' },
    tabindex: { type: [String, Number], default: 0 },
    hiddenSelectedOptionsAmount: { type: Number, default: 0 },
    isAllOptionsShown: { type: Boolean, default: false },
    autocomplete: { type: Boolean, default: false },
    focused: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    getText: { type: Function as PropType<(option: SelectOption) => string>, required: true },
    autocompleteInputValue: { type: String, default: '' },
  },

  emits: ['toggle-hidden', 'autocomplete-input', 'focus-prev', 'focus-next', 'select-option', 'delete-last-selected'],

  setup (props, { emit }) {
    const autocompleteInput = ref<HTMLInputElement>()

    const isPlaceholder = computed(() => props.placeholder && !props.valueString)

    const toggleHiddenOptionsState = () => emit('toggle-hidden')

    const { value, focused } = toRefs(props)

    const autocompleteInputValueComputed = computed({
      get: () => props.autocompleteInputValue,
      set: (v: string) => emit('autocomplete-input', v),
    })

    watch(focused, (newValue) => {
      if (!props.autocomplete || !newValue) { return }

      if (autocompleteInputValueComputed.value) {
        // native select method doesn't work in mobile Safari, so we need this instead
        autocompleteInput.value?.setSelectionRange(0, autocompleteInputValueComputed.value.length)
      } else {
        autocompleteInput.value?.focus()
      }
    })

    const handleBackspace = (e: KeyboardEvent) => {
      if (props.multiple && value.value.length && e.key === 'Backspace' && !autocompleteInputValueComputed.value) {
        emit('delete-last-selected')
      }
    }

    return {
      getIcon: (option: SelectOption) => typeof option === 'object' ? (option.icon as string) : undefined,
      isPlaceholder,
      toggleHiddenOptionsState,
      autocompleteInputValueComputed,
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
