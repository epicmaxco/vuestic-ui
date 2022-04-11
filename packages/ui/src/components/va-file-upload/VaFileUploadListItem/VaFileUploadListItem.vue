<template>
  <va-card
    class="va-file-upload-list-item"
    :stripe="removed"
    :stripeColor="color"
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
        {{ file && file.name }}
      </div>
      <div class="va-file-upload-list-item__size">
        {{ file && file.size }}
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
import { defineComponent, PropType, ref } from 'vue'

import VaCard from '../../va-card'
import VaIcon from '../../va-icon'

import { VaFile } from '../types'

import VaFileUploadUndo from '../VaFileUploadUndo'

export default defineComponent({
  name: 'VaFileUploadListItem',
  components: {
    VaIcon,
    VaCard,
    VaFileUploadUndo,
  },
  emits: ['remove'],
  props: {
    file: { type: Object as PropType<VaFile | null>, default: null },
    color: { type: String as PropType<string>, default: 'success' },
  },
  setup (props, { emit }) {
    const removed = ref(false)

    const removeFile = () => {
      removed.value = true

      setTimeout(() => {
        if (removed.value) {
          emit('remove')
          removed.value = false
        }
      }, 2000)
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
  }

  &--undo {
    background: none;
    box-shadow: none;
  }
}
</style>
