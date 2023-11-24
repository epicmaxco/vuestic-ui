<template>
  <VaButton @click="showModal = !showModal"> 
    Show modal
  </VaButton>

  <VaModal
    v-model="showModal"
    ok-text="Apply"
  >
    <h3 class="va-h3">
      Title
    </h3>
    <p>
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </p>
  </VaModal>
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
