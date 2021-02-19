<template>
  <div class="va-file-upload-single-item">
    <div class="va-file-upload-single-item__name">
      {{ file.name }}
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
import { Vue, Options, prop, mixins } from 'vue-class-component'

import VaButton from '../../va-button'

class FileUploadSingleItemProps {
  file = prop<object>({
    type: Object,
    default: null,
  })
}

const FileUploadSingleItemPropsMixin = Vue.with(FileUploadSingleItemProps)

@Options({
  name: 'VaFileUploadSingleItem',
  components: {
    VaButton,
  },
  emits: ['remove'],
})
export default class VaFileUploadSingleItem extends mixins(FileUploadSingleItemPropsMixin) {

}
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
