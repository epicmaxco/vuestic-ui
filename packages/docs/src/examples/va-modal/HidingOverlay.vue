<template>
  <p>
    <va-button class="mr-4 mb-2" @click="showModal = !showModal">
      {{ $t('all.showModal') }}
      {{ $t('api.VaModal.examples.withoutOverlayButton') }}
    </va-button>
    <va-button
      class="mb-2"
      @click="showModalNoOutsideDismiss = !showModalNoOutsideDismiss"
    >
      {{ $t('all.showModal') }}
      {{ $t('api.VaModal.examples.withoutOverlayAndDismissButton') }}
    </va-button>
    <va-modal v-model="showModal" :message="message" :overlay="false" />
    <va-modal
      v-model="showModalNoOutsideDismiss"
      :message="message"
      :overlay="false"
      no-outside-dismiss
    />
  </p>
</template>
<script>
import message from './popup-message'

export default {
  data() {
    return {
      showModal: false,
      showModalNoOutsideDismiss: false,
      message,
    }
  },
}
</script>
