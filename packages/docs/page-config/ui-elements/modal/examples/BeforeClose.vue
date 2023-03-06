<template>
  <va-button @click="showModal = !showModal">
    Show modal
  </va-button>
  <VaModal
    v-model="showModal"
    :message="message"
    :before-close="beforeClose"
  />
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
  methods: {
    beforeClose(hide) {
      if (window.confirm("Are you sure you want to close the modal?")) {
        hide();
      }
    },
  },
};
</script>
