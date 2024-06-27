<template>
  <div class="va-select-content" @click="handleClick">
    <span
      v-if="isPlaceholder && !$props.autocomplete"
      class="va-select-content__placeholder"
    >
      <input v-bind="ariaAttributes" :placeholder="$props.placeholder" readonly />
    </span>

    <slot
      v-else-if="!(props.autocomplete && !props.multiple)"
      name="content"
      v-bind="{
        value: slotValue,
        valueString: $props.valueString,
        valueArray: $props.value,
        tabindex: $props.tabindex,
        ariaAttributes,
      }"
    >
      <template v-for="(option, index) in $props.value" :key="index">
        <span v-if="option !== ''" class="va-select-content__option">
          <slot name="option-content" v-bind="{ option, index, selectOption: () => void 0 }">
            <va-icon
              v-if="getIcon(option)"
              size="small"
              class="va-select-option__icon"
              :name="getIcon(option)"
            />
            {{ getText(option) }}
          </slot>
        </span>
        <span class="va-select-content__separator" v-if="index < $props.value.length - 1">
          {{ $props.separator }}
        </span>
      </template>
    </slot>

    <input
      v-if="$props.autocomplete"
      v-bind="ariaAttributes"
      v-model="autocompleteInputValueComputed"
      class="va-select-content__autocomplete"
      ref="autocompleteInput"
      autocomplete="off"
      aria-autocomplete="list"
      :placeholder="$props.placeholder"
      :disabled="$props.disabled"
      :readonly="$props.readonly"
      @keydown.up.stop.prevent="$emit('focus-prev')"
      @keydown.down.stop.prevent="$emit('focus-next')"
      @keydown.enter.stop.prevent="$emit('select-option')"
      @keydown="handleBackspace"
    />

    <slot
      name="hiddenOptionsBadge"
      v-bind="{
        amount: hiddenSelectedOptionsAmount,
        isShown: $props.isAllOptionsShown,
        toggle: toggleHiddenOptionsState,
      }"
    >
      <va-badge
        v-if="hiddenSelectedOptionsAmountComputed && !$props.isAllOptionsShown"
        class="va-select-content__state-icon"
        color="info"
        :text="`+${hiddenSelectedOptionsAmountComputed}`"
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
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch, onMounted, type PropType, ComputedRef } from 'vue'

import { useFormFieldProps, useNumericProp } from '../../../../composables'

import { VaIcon } from '../../../va-icon'
import { VaBadge } from '../../../va-badge'

import type { SelectOption } from '../../../index'
import { isObject } from '../../../../utils/is-object'

defineOptions({
  name: 'VaSelectContent',
})

const props = defineProps({
  ...useFormFieldProps,

  ariaAttributes: { type: Object },
  value: { type: Array as PropType<SelectOption[]>, required: true },
  valueString: { type: String },
  separator: { type: String, default: ', ' },
  placeholder: { type: String, default: '' },
  tabindex: { type: [String, Number], default: 0 },
  hiddenSelectedOptionsAmount: { type: [Number, String], default: 0 },
  isAllOptionsShown: { type: Boolean, default: false },
  autocomplete: { type: Boolean, default: false },
  focused: { type: Boolean, default: false },
  multiple: { type: Boolean, default: false },
  getText: { type: Function as PropType<(option: SelectOption) => string>, required: true },
  autocompleteInputValue: { type: String, default: '' },
})

const emit = defineEmits(['toggle-hidden', 'autocomplete-input', 'focus-prev', 'focus-next', 'select-option', 'delete-last-selected'])

const autocompleteInput = ref<HTMLInputElement>()

const isPlaceholder = computed(() => props.placeholder && !props.valueString)

const toggleHiddenOptionsState = () => emit('toggle-hidden')

const { value, focused } = toRefs(props)

const autocompleteInputValueComputed = computed({
  get: () => props.autocompleteInputValue,
  set: (v: string) => emit('autocomplete-input', v),
})

const hiddenSelectedOptionsAmountComputed = useNumericProp('hiddenSelectedOptionsAmount') as ComputedRef<number>

onMounted(() => {
  if (props.multiple) { return }
  if (!props.autocomplete) { return }

  autocompleteInputValueComputed.value = props.valueString as string
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

const handleClick = (e: MouseEvent) => {
  if (props.autocomplete) {
    autocompleteInput.value?.focus()
    e.stopPropagation()
  }
}

const getIcon = (option: SelectOption) => isObject(option) ? (option.icon as string) : undefined

const slotValue = computed(() => {
  if (props.multiple) { return value.value }

  return value.value[0]
})
</script>

<style lang="scss">
@import '../../variables';

.va-select-content {
  display: flex;
  flex-wrap: wrap;
  flex: 1;

  &__autocomplete {
    flex: 1 1;
    margin-left: 0.25rem;

    &:first-child {
      margin-left: 0;
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

  &__separator {
    white-space: pre;
  }

  &__state-icon {
    margin-left: var(--va-select-state-icon-margin-left);
  }
}
</style>
