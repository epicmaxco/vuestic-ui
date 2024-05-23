<template>
  <div class="va-message-list-wrapper">
    <va-message-list
      :color="messagesColor"
      :limit="errorLimit"
      :has-error="hasError"
      :model-value="messagesComputed"
      :inherit-slots="['message']"
    >
      <template #default="bind">
        <slot name="default" v-bind="bind" />
      </template>
    </va-message-list>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRef } from 'vue'

import { useValidationProps } from '../../composables'

import { VaMessageList } from './VaMessageList'
import { WithSlotInheritance } from '../../utils/with-slot-inheritance'

defineOptions({
  name: 'VaMessageListWrapper',
})

const props = defineProps({
  ...useValidationProps,
})

const messagesColor = computed(() => {
  if (props.error) { return 'danger' }
  if (props.success) { return 'success' }
  return ''
})

const hasError = toRef(props, 'error')
const messagesComputed = computed(() => props.error ? props.errorMessages : props.messages)
const errorLimit = computed(() => props.error ? Number(props.errorCount) : 99)
</script>

<style lang="scss">
@import 'variables';

.va-message-list-wrapper {
  .va-message-list {
    margin-top: var(--va-message-wrapper-margin-top);
  }
}
</style>
