<template>
  <div style="width: 300px;">
    <va-switch
      v-model="isGalleryViewEnabled"
      :label="$t('fileUpload.examples.undo.galleryViewLabel')"
      class="mb-6"
    />
    <va-input
      v-model.number="undoDuration"
      :label="$t('fileUpload.examples.undo.durationFieldLabel')"
      class="mb-6"
    />
    <va-input
      v-model="deletedFileMessage"
      :label="$t('fileUpload.examples.undo.cancelFieldLabel')"
      class="mb-6"
    />
    <va-input
      v-model="undoButtonText"
      :label="$t('fileUpload.examples.undo.deletedFileFieldLabel')"
      class="mb-6"
    />
  </div>
  <va-file-upload
    v-model="basic"
    undo
    :type="galleryType"
    :undo-duration="undoDuration"
    :undo-button-text="undoButtonText"
    :deleted-file-message="deletedFileMessage"
  />
</template>

<script>
import { VaFileUpload, VaInput, VaSwitch } from 'vuestic-ui/src/components'

export default {
  components: { VaFileUpload, VaInput, VaSwitch },

  data: () => ({
    isGalleryViewEnabled: false,
    undoDuration: 5000,
    deletedFileMessage: 'File exterminated',
    undoButtonText: 'Cancel',
    basic: [{ name: 'example 1.png', url: 'https://picsum.photos/100' }],
  }),

  computed: {
    galleryType () { return this.isGalleryViewEnabled ? 'gallery' : 'list' },
  },
}
</script>
