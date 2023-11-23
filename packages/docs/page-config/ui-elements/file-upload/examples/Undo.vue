<template>
  <div class="w-80">
    <VaSwitch
      v-model="isGalleryViewEnabled"
      label="Enable gallery view"
      class="mb-6"
    />
    <VaInput
      v-model.number="undoDuration"
      label="Undo duration"
      class="mb-6"
    />
    <VaInput
      v-model="deletedFileMessage"
      label="Cancel button text"
      class="mb-6"
    />
    <VaInput
      v-model="undoButtonText"
      label="Deleted file message"
      class="mb-6"
    />
  </div>
  <VaFileUpload
    v-model="basic"
    undo
    :type="galleryType"
    :undo-duration="undoDuration"
    :undo-button-text="undoButtonText"
    :deleted-file-message="deletedFileMessage"
  />
</template>

<script>
import { VaFileUpload, VaInput, VaSwitch } from "vuestic-ui";

export default {
  components: { VaFileUpload, VaInput, VaSwitch },

  data: () => ({
    isGalleryViewEnabled: false,
    undoDuration: 5000,
    deletedFileMessage: "File exterminated",
    undoButtonText: "Cancel",
    basic: [{ name: "example 1.png", url: "https://picsum.photos/100" }],
  }),

  computed: {
    galleryType() {
      return this.isGalleryViewEnabled ? "gallery" : "list";
    },
  },
};
</script>
