<template>
  <va-button @click="showModal = true">
    Show modal with close icon
  </va-button>
  <va-modal
    v-model="showModal"
    ok-text="Apply"
    close-button
  >
    <h3 class="va-h3">
      Title
    </h3>
    <p>
      Classic modal overlay which represents a dialog box or other interactive
      component, such as a dismissible alert, sub-window, etc.
    </p>
  </va-modal>
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
