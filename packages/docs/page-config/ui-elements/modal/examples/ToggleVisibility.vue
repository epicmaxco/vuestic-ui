<template>
  <va-button
    @click="$refs.modal.show()"
  >
    Show modal
  </va-button>

  <va-modal v-model="doShowModal" ref="modal">
    <h2 class="va-h2">Title</h2>
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
      doShowModal: false,
    };
  },
};
</script>
