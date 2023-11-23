<template>
  <VaButton @click="showModal = !showModal">
    Show modal (custom rendering)
  </VaButton>

  <VaModal
    v-model="showModal"
    hide-default-actions
    overlay-opacity="0.2"
  >
    <template #header>
      <h3>Custom header</h3>
    </template>
    <div>{{ message }}</div>
    <template #footer>
      <VaButton> Custom action </VaButton>
    </template>
  </VaModal>
</template>

<script>
import message from "./popup-message";

export default {
  data() {
    return {
      showModal: false,
      message,
    };
  },
};
</script>
