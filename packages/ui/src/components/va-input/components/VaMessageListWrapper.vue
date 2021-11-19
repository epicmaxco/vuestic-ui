<template>
    <div class="va-message-list-wrapper">
      <slot />
      <va-message-list
        :color="messagesColor"
        :model-value="messagesComputed"
        :limit="errorLimit"
      />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from 'vue'
import { useValidationProps } from '../../../composables/useValidation'
import VaMessageList from './VaMessageList'

export default defineComponent({
  components: { VaMessageList },

  props: {
    ...useValidationProps,
  },

  setup (props) {
    return {
      messagesColor: computed(() => {
        if (props.error) { return 'danger' }
        if (props.success) { return 'success' }

        return ''
      }),
      messagesComputed: computed(() => props.error ? props.errorMessages : props.messages),
      errorLimit: computed(() => props.error ? props.errorCount : 99),
    }
  },
})
</script>

<style lang='scss'>
.va-message-list-wrapper {
  font-family: var(--va-font-family);
}
</style>
