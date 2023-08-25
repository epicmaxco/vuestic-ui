<template>
  <slot v-bind="{ ariaAttributes: childAttributes }" />
  <slot name="messages" v-bind="{ ariaAttributes: messageListAttributes }">
    <div
      v-if="messages.length > 0"
      class="va-message-list"
      :style="computedStyle"
      v-bind="messageListAttributes"
    >
      <ul>
        <li
          v-for="(message, index) in messages"
          :key="index"
          class="va-message-list__message"
        >
          <va-icon
            v-if="hasError"
            class="va-message-list__icon"
            name="va-warning"
            :size="16"
          />{{ message }}
        </li>
      </ul>
    </div>
  </slot>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { useColors } from '../../../../composables'

import { VaIcon } from '../../../va-icon'
import { useMessageListAria } from './hooks/useMessageListAria'

export default defineComponent({
  name: 'VaMessageList',

  components: { VaIcon },

  props: {
    modelValue: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    limit: { type: Number, default: 1 },
    color: { type: String },
    hasError: { type: Boolean, default: false },
  },

  setup (props) {
    const { getColor } = useColors()

    return {
      ...useMessageListAria(props),
      messages: computed<string[]>(() => {
        if (!props.modelValue) { return [] }
        if (!Array.isArray(props.modelValue)) { return [props.modelValue] }
        return props.modelValue.slice(0, props.limit)
      }),
      computedStyle: computed(() => props.color ? { color: getColor(props.color) } : {}),
    }
  },
})
</script>

<style lang="scss">
@import "../../../../styles/resources/index.scss";

.va-message-list {
  margin-top: var(--va-message-list-margin-top);
  color: var(--va-message-list-color);
  list-style: none;

  &__message {
    display: flex;
    vertical-align: var(--va-message-list-vertical-align);
    font-size: var(--va-message-list-font-size);
    line-height: var(--va-message-list-line-height);
  }

  &__icon {
    margin-right: var(--va-message-list-icon-margin-right);
  }
}
</style>
