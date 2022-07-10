<template>
  <div class="va-file-upload-single-item">
    <div class="va-file-upload-single-item__name">
      {{ file && file.name }}
    </div>
    <va-button
      class="va-file-upload-single-item__button"
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
import { defineComponent, PropType } from 'vue'

import { VaButton } from '../../va-button'

import { ConvertedFile } from '../types'

export default defineComponent({
  name: 'VaFileUploadSingleItem',
  components: {
    VaButton,
  },
  emits: ['remove'],
  props: {
    file: { type: Object as PropType<ConvertedFile | null>, default: null },
  },
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
