<template>
  <div class="va-file-upload-single-item">
    <div class="va-file-upload-single-item__name">
      {{ file && file.name }}
    </div>
    <va-button
      class="va-file-upload-single-item__button"
      :disabled="disabled"
      :aria-disabled="disabled"
      aria-label="remove file"
      size="small"
      color="danger"
      flat
      @click="$emit('remove')"
    >
      Delete
    </va-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import { useStrictInject } from '../../../composables'

import { VaButton, VaFileUploadInject } from '../../index'
import { VaFileUploadKey, ConvertedFile } from '../types'

const INJECTION_ERROR_MESSAGE = 'The VaFileUploadSingleItem component should be used in the context of VaFileUpload component'

export default defineComponent({
  name: 'VaFileUploadSingleItem',

  components: {
    VaButton,
  },

  emits: ['remove'],

  props: {
    file: { type: Object as PropType<ConvertedFile | null>, default: null },
  },

  setup: () => ({
    disabled: useStrictInject<VaFileUploadInject>(VaFileUploadKey, INJECTION_ERROR_MESSAGE).disabled,
  }),
})
</script>

<style lang='scss'>
.va-file-upload-single-item {
  display: flex;
  align-items: center;
  max-width: 100%;

  &__name {
    margin-right: 0.25rem;
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: normal;
  }

  &__button {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 700;
  }
}
</style>
