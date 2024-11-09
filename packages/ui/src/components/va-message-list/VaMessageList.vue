<template>
  <slot v-bind="{ ariaAttributes: childAttributes, messages, attrs: $attrs }" />
  <slot name="messages" v-bind="{ ariaAttributes: messageListAttributes, messages }">
    <div
      v-if="messages.length > 0"
      class="va-message-list"
      :style="computedStyle"
      v-bind="messageListAttributes"
    >
      <ul class="va-message-list__list">
        <li
          v-for="(message, index) in messages"
          :key="index"
          class="va-message-list__message"
        >
          <slot name="message" v-bind="{ messages, message }">
            <va-icon
              v-if="hasError"
              class="va-message-list__icon"
              name="va-warning"
              :size="16"
            />{{ message }}
          </slot>
        </li>
      </ul>
    </div>
  </slot>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, PropType } from 'vue'

import { makeNumericProp, useColors, useNumericProp } from '../../composables'

import { VaIcon } from '../va-icon'
import { useMessageListAria } from './hooks/useMessageListAria'

defineOptions({
  name: 'VaMessageList',
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  limit: makeNumericProp({ default: 1 }),
  color: { type: String },
  hasError: { type: Boolean, default: false },
})

const { getColor } = useColors()

const { childAttributes, messageListAttributes } = useMessageListAria(props)

const limitComputed = useNumericProp('limit') as ComputedRef<number>
const messages = computed<string[]>(() => {
  if (!props.modelValue) { return [] }
  if (!Array.isArray(props.modelValue)) { return [props.modelValue] }
  return props.modelValue.slice(0, limitComputed.value)
})

const computedStyle = computed(() => props.color ? { color: getColor(props.color) } : {})

defineExpose({
  messages,
})
</script>

<style lang="scss">
@import "variables";

.va-message-list {
  color: var(--va-message-list-color);
  list-style: none;

  &__message {
    display: flex;
    align-items: center;
    font-size: var(--va-message-list-font-size);
    line-height: var(--va-message-list-line-height);
  }

  &__icon {
    margin-right: var(--va-message-list-icon-margin-right);
  }
}
</style>
