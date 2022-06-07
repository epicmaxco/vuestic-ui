<template>
  <va-card
    class="va-file-upload-list-item"
    :stripe="removed && undo"
    :stripeColor="color"
    no-margin
    no-padding
    :class="{'file-upload-list-item--undo': removed}"
  >
    <va-file-upload-undo
      @recover="recoverFile"
      v-if="removed && undo"
    />
    <div
      class="va-file-upload-list-item__content"
      v-else
    >
      <div class="va-file-upload-list-item__name">
        {{ file && file.name }}
      </div>
      <div class="va-file-upload-list-item__size">
        {{ file && file.size }}
      </div>
      <va-icon
        name="clear"
        class="va-file-upload-list-item__delete"
        role="button"
        aria-hidden="false"
        aria-label="remove file"
        tabindex="0"
        color="danger"
        @click="removeFile"
        @keydown.enter.stop="removeFile"
        @keydown.space.stop="removeFile"
      />
    </div>
  </va-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import { VaCard } from '../../va-card'
import { VaIcon } from '../../va-icon'

import { VaFile, ConvertedFile } from '../types'

import { VaFileUploadUndo } from '../VaFileUploadUndo'

export default defineComponent({
  name: 'VaFileUploadListItem',
  components: {
    VaIcon,
    VaCard,
    VaFileUploadUndo,
  },
  emits: ['remove'],
  props: {
    file: { type: Object as PropType<ConvertedFile | null>, default: null },
    color: { type: String as PropType<string>, default: 'success' },
    undo: { type: Boolean as PropType<boolean>, default: false },
    undoDuration: { type: Number as PropType<number>, default: 3000 },
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

    return {
      removed,
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
    background: none;
    box-shadow: none;
  }
}
</style>
