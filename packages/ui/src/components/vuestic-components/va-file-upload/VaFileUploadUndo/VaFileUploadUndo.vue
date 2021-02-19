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

<style lang="scss" scoped>
.va-file-upload-undo {
  height: 1.5rem;

  &__button {
    line-height: 1.1428;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
