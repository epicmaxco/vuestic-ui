<template>
  <div class="va-file-upload-undo">
    <span>File was successfully deleted</span>
    <va-button
      @click="$emit('recover')"
      outline
      size="small"
      class="va-file-upload-undo__button"
    >
      Undo
    </va-button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

import VaButton from '../../va-button'

@Options({
  name: 'VaFileUploadUndo',
  components: {
    VaButton,
  },
  emits: ['recover'],
})
export default class VaFileUploadUndo extends Vue {

}
</script>

<style lang="scss">
@import 'variables';

.va-file-upload-undo {
  height: var(--va-file-upload-undo-height);

  &__button {
    line-height: var(--va-file-upload-undo-button-line-height);
    margin-top: var(--va-file-upload-undo-button-margin-top);
    margin-bottom: var(--va-file-upload-undo-button-margin-bottom);
  }
}
</style>
