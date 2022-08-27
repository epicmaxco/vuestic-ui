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
    >
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useColors } from '../../../../composables'

export default defineComponent({
  name: 'VaMessageList',

  props: {
    modelValue: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    limit: { type: Number, default: 1 },
    color: { type: String },
  },

  setup (props) {
    const { getColor } = useColors()

    return {
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
    margin-top: var(--va-message-list--margin-top);
    color: var(--va-message-list-color);

    &__message {
      vertical-align: var(--va-message-list-vertical-align);
      font-size: var(--va-message-list-font-size);
      line-height: var(--va-message-list-line-height);
    }
  }
</style>
