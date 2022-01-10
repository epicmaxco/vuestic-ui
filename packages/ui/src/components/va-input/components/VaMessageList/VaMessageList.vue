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
import { useColor } from '../../../../composables/useColor'

export default defineComponent({
  name: 'VaMessageList',

  props: {
    modelValue: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
    limit: { type: Number, default: 1 },
    color: { type: String, default: 'gray' },
  },

  setup (props) {
    const { colorComputed } = useColor(props)

    return {
      messages: computed<string[]>(() => {
        if (!props.modelValue) { return [] }
        if (!Array.isArray(props.modelValue)) { return [props.modelValue] }

        return props.modelValue.slice(0, props.limit)
      }),
      computedStyle: computed(() => ({
        color: colorComputed.value,
      })),
    }
  },
})
</script>

<style lang="scss">
@import "../../../../styles/resources/index.scss";

.va-message-list {
  &__message {
    vertical-align: middle;
    font-size: $font-size-mini;
  }
}
</style>
