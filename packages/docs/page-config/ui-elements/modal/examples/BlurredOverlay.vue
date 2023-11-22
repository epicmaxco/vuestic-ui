<template>
  <VaButton @click="showModal = !showModal">
    Show modal
  </VaButton>

  <VaModal
    v-model="showModal"
    message="Classic modal overlay which represents a dialog box or other interactive component, such as a dismissible alert, sub-window, etc."
    ok-text="Apply"
    blur
  />
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
};
</script>
