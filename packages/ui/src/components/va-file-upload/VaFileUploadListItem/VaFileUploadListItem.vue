<template>
  <va-list-item
    class="va-file-upload-list-item"
    :class="computedClasses"
  >
    <va-list-item-section v-if="removed && undo">
      <va-file-upload-undo @recover="recoverFile" />
    </va-list-item-section>
    <va-list-item-section v-else>
      <div class="va-file-upload-list-item__content">
        <div v-if="file && file.name" class="va-file-upload-list-item__name">
          {{ file && file.name }}
        </div>
        <div class="va-file-upload-list-item__size">
          {{ file && file.size }}
        </div>
        <va-icon
          class="va-file-upload-list-item__delete"
          name="clear"
          role="button"
          aria-hidden="false"
          aria-label="remove file"
          tabindex="0"
          color="danger"
          @click.stop="removeFile"
          @keydown.enter.stop="removeFile"
          @keydown.space.stop="removeFile"
        />
      </div>
    </va-list-item-section>
  </va-list-item>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import { useBem } from '../../../composables'
import { ConvertedFile } from '../types'

import { VaListItem, VaListItemSection, VaIcon } from '../../index'
import { VaFileUploadUndo } from '../VaFileUploadUndo'

export default defineComponent({
  name: 'VaFileUploadListItem',
  components: {
    VaListItem,
    VaListItemSection,
    VaIcon,
    VaFileUploadUndo,
  },
  emits: ['remove'],
  props: {
    file: { type: Object as PropType<ConvertedFile | null>, default: null },
    color: { type: String, default: 'success' },
    undo: { type: Boolean, default: false },
    undoDuration: { type: Number, default: 3000 },
  },
  setup (props, { emit }) {
    const removed = ref(false)

    const removeFile = () => {
      if (props.undo) {
        removed.value = true

        setTimeout(() => {
          if (removed.value) {
            emit('remove')
            removed.value = false
          }
        }, props.undoDuration)
      } else {
        emit('remove')
        removed.value = false
      }
    }

    const recoverFile = () => { removed.value = false }

    const computedClasses = useBem('va-file-upload-list-item', () => ({
      undo: removed.value,
    }))

    return {
      removed,
      computedClasses,

      removeFile,
      recoverFile,
    }
  },
})
</script>

<style lang='scss'>
@import "../../../styles/resources";
@import "variables";

.va-file-upload-list-item {
  background-color: var(--va-file-upload-list-item-background-color);
  box-shadow: var(--va-file-upload-list-item, var(--va-block-box-shadow));
  border-radius: var(--va-file-upload-list-item-border-radius, var(--va-block-border-radius));
  position: relative;
  line-height: 1.5rem;
  padding: 1.125rem 0.5rem 1rem 1rem;
  max-width: 100%;
  width: 100%;

  & + & {
    margin-top: 0.5rem;
  }

  .va-list-item__inner {
    padding: 0;
    overflow: hidden;
  }

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
    color: var(--va-file-upload-list-item-size-text-color);
  }

  &__delete {
    font-size: 1.5rem;
    cursor: pointer;

    &:focus {
      @include focus-outline;
    }
  }

  &--undo {
    overflow: hidden;
    position: relative;

    .va-list-item-section {
      padding: 0;
    }
  }
}
</style>
