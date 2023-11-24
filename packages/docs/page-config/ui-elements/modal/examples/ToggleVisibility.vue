<template>
  <VaButton
    @click="$refs.modal.show()"
  >
    Show modal
  </VaButton>

  <VaModal ref="modal" v-model="doShowModal">
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
      doShowModal: false,
    };
  },
};
</script>
