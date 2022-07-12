<template>
  <div
    v-if="messages.length"
    class="va-message-list"
    :style="computedStyle"
  >
    <div
      v-for="(message, index) in messages"
      :key="index"
      class="va-message-list__message"
      :class="{ 'va-message-list__message--with-icon': $props.error && index === 0 }"
    >
      <va-icon
        v-if="$props.error && index === 0"
        class="va-message-list__icon fa fa-triangle-exclamation"
        :style="computedStyle"
      />
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useColors, useValidationProps } from '../../../../composables'

import { VaIcon } from '../../../va-icon'

export default defineComponent({
  name: 'VaMessageList',

  components: { VaIcon },

  props: {
    ...useValidationProps,
    modelValue: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    limit: { type: Number, default: 1 },
  },

  setup (props) {
    const { getColor } = useColors()
    const messagesColor = computed(() => {
      if (props.error) { return 'danger' }
      if (props.success) { return 'success' }
      return ''
    })
    const computedStyle = computed(() => messagesColor.value ? { color: getColor(messagesColor.value) } : {})

    return {
      messages: computed<string[]>(() => {
        if (!props.modelValue) { return [] }
        if (!Array.isArray(props.modelValue)) { return [props.modelValue] }
        return props.modelValue.slice(0, props.limit)
      }),
      computedStyle,
    }
  },
})
</script>

<style lang="scss">
@import "../../../../styles/resources/index.scss";

.va-message-list {
  margin-top: var(--va-message-list--margin-top);
  color: var(--va-message-list-color);

  &__icon {
    font-size: var(--va-message-list-icon-font-size) !important;
    line-height: 0;
    margin-right: var(--va-message-list-icon-margin-right);
  }

  &__message {
    vertical-align: var(--va-message-list-vertical-align);
    font-size: var(--va-message-list-font-size);
    line-height: var(--va-message-list-line-height);

    &--with-icon {
      display: flex;
      align-items: center;
    }
  }
}
</style>
