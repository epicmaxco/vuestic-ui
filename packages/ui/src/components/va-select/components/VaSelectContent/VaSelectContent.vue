<template>
  <span
    v-if="isPlaceholder"
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
import { defineComponent, computed, type PropType } from 'vue'

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
  },

  emits: ['toggle-hidden'],

  setup (props, { emit }) {
    const isPlaceholder = computed(() => props.placeholder && !props.valueString)

    const toggleHiddenOptionsState = () => emit('toggle-hidden')

    return { isPlaceholder, toggleHiddenOptionsState }
  },
})
</script>

<style lang="scss">
@import '../../variables';

.va-select-content {
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
