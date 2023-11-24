<template>
  <VaButton @click="showModal = !showModal">
    Show modal (fullscreen)
  </VaButton>

  <VaModal
    v-model="showModal"
    fullscreen
    :message="message"
    hide-default-actions
  >
    <div class="flex flex-col gap-2">
      <h3 class="va-h3">
        Full screen modal
      </h3>

      <p>
        Classic modal overlay which represents a dialog box or other interactive
        component, such as a dismissible alert, sub-window, etc.
      </p>

      <VaImage
        src="https://picsum.photos/1500"
        :ratio="16 / 9"
      />

      <p>
        Under the hood, the fullscreen modal is just a regular modal with a
        fullscreen prop. It also has a message prop which can be used to display
        a message in the modal's footer.
      </p>

      <VaAlert>
        Notice that on mobile devices, the modal will be displayed in fullscreen
        by default.
      </VaAlert>
    </div>
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
