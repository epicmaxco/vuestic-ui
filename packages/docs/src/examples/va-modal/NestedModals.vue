<template>
  <p>
    <va-button @click="showFirstModal = !showFirstModal">
      {{ $t('api.VaModal.examples.nested.first') }}
    </va-button>
    <va-modal
      v-model="showFirstModal"
      :message="firstMessage"
      hide-default-actions
    >
      <slot>
        <va-button @click="showSecondModal = !showSecondModal">
          {{ $t('api.VaModal.examples.nested.second') }}
        </va-button>
        <va-modal v-model="showSecondModal" :message="secondMessage" />
      </slot>
    </va-modal>
  </p>
</template>
<script>
export default {
  data() {
    return {
      showFirstModal: false,
      showSecondModal: false,
      firstMessage: 'First modal message',
      secondMessage: 'Second modal message',
    }
  },
}
</script>
