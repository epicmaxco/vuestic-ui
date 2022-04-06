<template>
  <div class="va-file-upload-single-item">
    <div class="va-file-upload-single-item__name">
      {{ file && file.name }}
    </div>
    <va-button
      flat
      @click="$emit('remove')"
      color="danger"
      size="small"
      class="va-file-upload-single-item__button"
    >
      Delete
    </va-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import VaButton from '../../va-button'

import { VaFile } from '../types'

export default defineComponent({
  name: 'VaFileUploadSingleItem',
  components: {
    VaButton,
  },
  emits: ['remove'],
  props: {
    file: { type: Object as PropType<VaFile | null>, default: null },
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
  }

  &__button {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 700;
  }
}
</style>
