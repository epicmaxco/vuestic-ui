<template>
  <va-button @click="showModal = !showModal">
    Show modal (fullscreen)
  </va-button>

  <va-modal
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

      <va-image
        src="https://picsum.photos/1500"
        :ratio="16 / 9"
      />

      <p>
        Under the hood, the fullscreen modal is just a regular modal with a
        fullscreen prop. It also has a message prop which can be used to display
        a message in the modal's footer.
      </p>

      <va-alert>
        Notice that on mobile devices, the modal will be displayed in fullscreen
        by default.
      </va-alert>
    </div>
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
