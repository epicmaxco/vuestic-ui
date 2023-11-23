<template>
  <VaButton
    class="mr-6 my-1"
    @click="showModal = !showModal"
  >
    Show modal (without the overlay)
  </VaButton>
  <VaButton
    class="mr-6 my-1"
    @click="showModalNoOutsideDismiss = !showModalNoOutsideDismiss"
  >
    Show modal (without the overlay and with no outside click dismiss)
  </VaButton>
  <VaModal
    v-model="showModal"
    :message="message"
    :overlay="false"
  />
  <VaModal
    v-model="showModalNoOutsideDismiss"
    :message="message"
    :overlay="false"
    no-outside-dismiss
  />
</template>

<script>
import message from "./popup-message";

export default {
  data() {
    return {
      showModal: false,
      showModalNoOutsideDismiss: false,
      message,
    };
  },
};
</script>
