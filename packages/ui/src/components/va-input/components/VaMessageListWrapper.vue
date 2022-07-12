<template>
    <div class="va-message-list-wrapper">
      <slot />
      <va-message-list
        :error="$props.error"
        :success="$props.success"
        :limit="errorLimit"
        :model-value="messagesComputed"
      />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useValidationProps } from '../../../composables'

import { VaMessageList } from './VaMessageList'

export default defineComponent({
  name: 'VaMessageListWrapper',

  components: { VaMessageList },

  props: {
    ...useValidationProps,
  },

  setup: (props) => ({
    messagesComputed: computed(() => props.error ? props.errorMessages : props.messages),
    errorLimit: computed(() => props.error ? +props.errorCount : 99),
  }),
})
</script>

<style lang='scss'>
.va-message-list-wrapper {
  font-family: var(--va-font-family);
}
</style>
