<template>
  <va-card
    class="va-file-upload-list-item"
    :stripe="removed ? '' : color"
    no-margin
    no-padding
    :class="{'file-upload-list-item--undo': removed}"
  >
    <va-file-upload-undo
      @recover="recoverFile"
      v-if="removed"
    />
    <div
      class="va-file-upload-list-item__content"
      v-else
    >
      <div class="va-file-upload-list-item__name">
        {{ file.name }}
      </div>
      <div class="va-file-upload-list-item__size">
        {{ file.size }}
      </div>
      <va-icon
        color="danger"
        name="clear"
        @click="removeFile()"
        class="va-file-upload-list-item__delete"
      />
    </div>
  </va-card>
</template>

<script lang="ts">
import { Vue, Options, prop, mixins } from 'vue-class-component'

import VaCard from '../../va-card'
import VaIcon from '../../va-icon'

import VaFileUploadUndo from '../VaFileUploadUndo'

class FileUploadListItemProps {
  file = prop<object>({
    type: Object,
    default: null,
  })

  color = prop<string>({
    type: String,
    default: 'success',
  })
}

const FileUploadListItemPropsMixin = Vue.with(FileUploadListItemProps)

@Options({
  name: 'VaFileUploadListItem',
  components: {
    VaIcon,
    VaCard,
    VaFileUploadUndo,
  },
  emits: ['remove'],
})
export default class VaFileUploadListItem extends mixins(FileUploadListItemPropsMixin) {
  removed = false

  removeFile () {
    this.removed = true
    setTimeout(() => {
      if (this.removed) {
        this.$emit('remove')
        this.removed = false
      }
    }, 2000)
  }

  recoverFile () {
    this.removed = false
  }
}
</script>

<style lang='scss'>
@import '../../../vuestic-sass/resources/resources';

.va-file-upload-list-item {
  & + & {
    margin-top: 0.5rem;
  }

  line-height: 1.5rem;
  width: 100%;
  max-width: 100%;
  padding: 1.125rem 0.5rem 1rem 1rem;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__name {
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-basis: 60%;
    overflow: hidden;
  }

  &__size {
    color: $gray-light;
  }

  &__delete {
    font-size: 1.5rem;
    cursor: pointer;
  }

  &--undo {
    background: none;
    box-shadow: none;
  }
}
</style>
