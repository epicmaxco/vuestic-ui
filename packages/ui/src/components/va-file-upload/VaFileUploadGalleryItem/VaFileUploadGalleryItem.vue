<template>
  <div
    v-if="removed"
    class="va-file-upload-gallery-item"
    :class="{'va-file-upload-gallery-item--undo': removed}"
  >
    <va-file-upload-undo
      class="va-file-upload-gallery-item--undo"
      @recover="recoverImage"
    />
  </div>

  <div
    v-else
    tabindex="0"
    class="va-file-upload-gallery-item"
    :class="{
      'file-upload-gallery-item_not-image': !previewImage,
      'va-file-upload-gallery-item--focused': isFocused
    }"
    @focus="isFocused = true"
    @blur="isFocused = false"
  >
    <img
      v-if="previewImage"
      :src="previewImage"
      alt=""
      class="va-file-upload-gallery-item__image"
    >
    <div class="va-file-upload-gallery-item__overlay">
      <div
        class="va-file-upload-gallery-item__overlay-background"
        :style="overlayStyles"
      />
      <div
        class="va-file-upload-gallery-item__name"
        :title="file.name"
      >
        {{ file.name }}
      </div>
      <va-button
        flat
        color="danger"
        icon="delete_outline"
        class="va-file-upload-gallery-item__delete"
        @click="removeImage"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch, computed } from 'vue'

import VaButton from '../../va-button'
import VaFileUploadUndo from '../VaFileUploadUndo'
import { colorToRgba } from '../../../services/color-config/color-functions'

import type { ConvertedFile } from '../types'

export default defineComponent({
  name: 'VaFileUploadGalleryItem',
  components: { VaFileUploadUndo, VaButton },
  emits: ['remove'],
  props: {
    file: { type: Object as PropType<ConvertedFile>, default: null },
    color: { type: String as PropType<string>, default: 'success' },
  },
  setup (props, { emit }) {
    const previewImage = ref('')
    const removed = ref(false)
    const isFocused = ref(false)

    const overlayStyles = computed(() => ({ backgroundColor: colorToRgba(props.color, 0.7) }))

    const removeImage = () => {
      removed.value = true

      setTimeout(() => {
        if (!removed.value) { return }

        emit('remove')
        removed.value = false
      }, 2000)
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
      previewImage,
      removed,
      isFocused,
      recoverImage,
      overlayStyles,
      removeImage,
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

  &--undo {
    box-shadow: none;

    .va-file-upload-gallery-item--undo {
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      font-size: 0.875rem;
      height: 100%;
      justify-content: space-between;
      align-items: flex-start;

      span {
        margin-right: 0.5rem;
      }

      .va-button {
        margin: 0;
      }
    }
  }
}

.file-upload-gallery-item_not-image {
  .file-upload-gallery-item__overlay {
    display: flex;
  }
}
</style>
