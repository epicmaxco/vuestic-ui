<template>
  <div style="width: 300px;">
    <va-switch
      v-model="isGalleryViewEnabled"
      :label="$t('fileUpload.examples.undo.galleryViewLabel')"
      class="mb-4"
    />
    <va-input
      v-model="undoDuration"
      :label="$t('fileUpload.examples.undo.inputLabel')"
      class="mb-4"
    />
  </div>
  <va-file-upload
    v-model="basic"
    undo
    :type="galleryType"
    :undo-duration="undoDuration"
  />
</template>

<script>
import { VaFileUpload, VaInput, VaSwitch } from 'vuestic-ui/src/components'

export default {
  components: { VaFileUpload, VaInput, VaSwitch },

  data: () => ({
    isGalleryViewEnabled: false,
    undoDuration: 1000,
    basic: [{ name: 'example 1.png', url: 'https://picsum.photos/100' }],
  }),

  computed: {
    galleryType () { return this.isGalleryViewEnabled ? 'gallery' : 'list' },
  },
}
</script>
