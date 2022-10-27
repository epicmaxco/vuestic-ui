<template>
  <va-list-item
    class="va-file-upload-gallery-item"
    tabindex="-1"
    :class="classesComputed"
    :disabled="disabled"
    :aria-disabled="disabled"
    @focus="onFocus"
    @blur="onBlur"
  >
    <va-list-item-section v-if="removed && undo">
      <va-file-upload-undo vertical @recover="recoverImage" />
    </va-list-item-section>
    <va-list-item-section v-else>
      <img
        v-if="previewImage"
        :src="previewImage"
        :alt="file.name || ''"
        class="va-file-upload-gallery-item__image"
      >
      <div class="va-file-upload-gallery-item__overlay">
        <div
          class="va-file-upload-gallery-item__overlay-background"
          :style="overlayStylesComputed"
        />
        <div
          v-if="file && file.name"
          class="va-file-upload-gallery-item__name"
          :title="file.name"
          :style="{ color: textColorComputed }"
        >
          {{ file.name }}
        </div>
        <va-button
          v-if="!disabled"
          flat
          color="danger"
          icon="va-delete"
          class="va-file-upload-gallery-item__delete"
          :aria-label="t('removeFile')"
          @click="removeImage"
          @focus="onFocus"
          @blur="onBlur"
        />
      </div>
    </va-list-item-section>
  </va-list-item>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch, computed, toRef } from 'vue'

import { colorToRgba } from '../../../services/color'
import { useFocus, useBem, useStrictInject, useTranslation } from '../../../composables'

import { VaFileUploadKey, ConvertedFile } from '../types'
import { useTextColor } from '../../../composables/useTextColor'

import { VaButton, VaListItem, VaListItemSection } from '../../index'
import { VaFileUploadUndo } from '../VaFileUploadUndo'

const INJECTION_ERROR_MESSAGE = 'The VaFileUploadGalleryItem component should be used in the context of VaFileUpload component'

export default defineComponent({
  name: 'VaFileUploadGalleryItem',

  components: {
    VaFileUploadUndo,
    VaButton,
    VaListItem,
    VaListItemSection,
  },

  emits: ['remove'],

  props: {
    file: { type: Object as PropType<ConvertedFile>, default: null },
    color: { type: String, default: 'success' },
  },

  setup (props, { emit }) {
    const {
      undo,
      disabled,
      undoDuration,
    } = useStrictInject(VaFileUploadKey, INJECTION_ERROR_MESSAGE)
    const { isFocused, onFocus, onBlur } = useFocus()
    const previewImage = ref('')
    const removed = ref(false)

    const overlayStylesComputed = computed(() => ({
      backgroundColor: colorToRgba(props.color, 0.7),
    }))

    const classesComputed = useBem('va-file-upload-gallery-item', () => ({
      notImage: !previewImage.value,
      focused: isFocused.value,
      undo: removed.value,
    }))

    const removeImage = () => {
      if (undo.value) {
        removed.value = true

        setTimeout(() => {
          if (!removed.value) { return }

          emit('remove')
          removed.value = false
        }, undoDuration.value ?? 0)
      } else {
        emit('remove')
        removed.value = false
      }
    }

    const recoverImage = () => { removed.value = false }

    const convertToImg = () => {
      if (!props.file.name || !props.file.image) { return }

      if (props.file.image.url) {
        previewImage.value = props.file.image.url
      } else if (props.file.image instanceof File) {
        const reader = new FileReader()

        reader.readAsDataURL(props.file.image)
        reader.onload = (e) => {
          if ((e.target?.result as string).includes('image')) {
            previewImage.value = e.target?.result as string
          }
        }
      }
    }

    onMounted(convertToImg)
    watch(() => props.file, convertToImg)

    return {
      ...useTranslation(),
      undo,
      ...useTextColor(toRef(props, 'color')),
      removed,
      disabled,
      isFocused,
      previewImage,
      classesComputed,
      overlayStylesComputed,

      onBlur,
      onFocus,
      removeImage,
      recoverImage,
    }
  },
})
</script>

<style lang='scss'>
@import "variables";
@import "../../../styles/resources";

$max-image-size: 8.5714rem;

.va-file-upload-gallery-item {
  display: flex;
  position: relative;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
  flex-basis: calc(14.2857% - 0.5rem);
  max-width: calc(14.2857% - 0.5rem);
  min-width: $max-image-size;
  border-radius: 0.375rem;
  overflow: hidden;
  width: 100%;
  align-items: stretch;

  @include media-breakpoint-down(md) {
    flex-basis: calc(16.667% - 0.5rem);
    max-width: calc(16.667% - 0.5rem);
  }

  @include media-breakpoint-down(sm) {
    flex-basis: calc(20% - 0.5rem);
    max-width: calc(20% - 0.5rem);
  }

  @include media-breakpoint-down(xs) {
    flex-basis: calc(50% - 0.5rem);
    max-width: calc(50% - 0.5rem);
  }

  &:last-of-type {
    margin-right: 0;
  }

  &:hover,
  &:focus,
  &--focused {
    .va-file-upload-gallery-item__overlay {
      z-index: 3;
      opacity: 1;
    }

    .va-file-upload-gallery-item {
      &__name {
        color: var(--va-file-upload-gallery-item-text-hover);
      }
    }
  }

  &__overlay {
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    flex-direction: column;
    padding: 0.5rem;
    z-index: -1;
    opacity: 0;
  }

  &__overlay-background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }

  &__image {
    width: 100%;
    box-shadow: var(--va-box-shadow);
    object-fit: cover;
    z-index: 1;
  }

  &__name {
    color: var(--va-file-upload-gallery-item-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.875rem;
  }

  &__delete {
    cursor: pointer;
    font-size: 1.5rem;
    margin-top: auto;
  }

  &--not-image {
    .va-file-upload-gallery-item__overlay {
      display: flex;
    }
  }

  &--undo {
    .va-list-item__inner {
      display: flex;
      align-items: flex-start;
      position: relative;
    }

    .va-list-item-section {
      height: inherit;
      padding: 0;
    }

    .va-file-upload-undo {
      flex: 1;
    }
  }
}
</style>
