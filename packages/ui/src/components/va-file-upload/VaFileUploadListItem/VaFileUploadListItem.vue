<template>
  <va-list-item
    class="va-file-upload-list-item"
    tabindex="-1"
    :class="computedClasses"
    :disabled="disabled"
    :aria-disabled="disabled"
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
        <va-button
          v-if="!disabled"
          flat
          color="danger"
          icon="clear"
          class="va-file-upload-list-item__delete"
          :aria-label="tp($props.ariaRemoveFileLabel)"
          @click.stop="removeFile"
          @keydown.enter.stop="removeFile"
          @keydown.space.stop="removeFile"
        />
      </div>
    </va-list-item-section>
  </va-list-item>
</template>

<script lang="ts">
import { ref, PropType } from 'vue'

import { useBem, useTranslation, useTranslationProp } from '../../../composables'
import { VaFileUploadKey, ConvertedFile } from '../types'

import { VaButton } from '../../va-button'
import { VaListItem, VaListItemSection } from '../../va-list'
import { VaFileUploadUndo } from '../VaFileUploadUndo'
import { strictInject } from '../../../utils/strict-inject'

const INJECTION_ERROR_MESSAGE = 'The VaFileUploadListItem component should be used in the context of VaFileUpload component'
</script>

<script lang="ts" setup>
const { tp } = useTranslation()

defineOptions({
  name: 'VaFileUploadListItem',
})

const props = defineProps({
  file: { type: Object as PropType<ConvertedFile | null>, default: null },
  color: { type: String, default: 'success' },

  ariaRemoveFileLabel: useTranslationProp('$t:removeFile'),
})

const emit = defineEmits(['remove'])

const {
  undo,
  disabled,
  undoDuration,
} = strictInject(VaFileUploadKey, INJECTION_ERROR_MESSAGE)
const removed = ref(false)

const removeFile = () => {
  if (undo.value) {
    removed.value = true

    setTimeout(() => {
      if (removed.value) {
        emit('remove')
        removed.value = false
      }
    }, undoDuration.value ?? 0)
  } else {
    emit('remove')
    removed.value = false
  }
}

const recoverFile = () => { removed.value = false }

const computedClasses = useBem('va-file-upload-list-item', () => ({
  undo: removed.value,
}))
</script>

<style lang="scss">
@import "../../../styles/resources";
@import "variables";

.va-file-upload-list-item {
  background-color: var(--va-file-upload-list-item-background-color);
  box-shadow: var(--va-file-upload-list-item-box-shadow, var(--va-block-box-shadow));
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

    --va-button-size: 1.5rem;
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
