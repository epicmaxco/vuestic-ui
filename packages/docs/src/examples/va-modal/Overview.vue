<template>
  <p>
    <va-button @click="showModal = !showModal">
      {{ $t('api.VaModal.examples.default') }}
    </va-button>
    <va-modal v-model="showModal" :message="message" title="Overview" />
  </p>
</template>

<script>
import message from './popup-message'

export default {
  data() {
    return {
      showModal: false,
      message,
    }
  },
}
</script>
