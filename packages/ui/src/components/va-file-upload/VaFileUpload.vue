<template>
  <div
    class="va-file-upload"
    :class="{ 'va-file-upload--dropzone': dropzone }"
    :style="computedStyle"
  >
    <slot>
      <div class="va-file-upload__field">
        <div
          class="va-file-upload__field__text"
          v-if="dropzone"
        >
          {{ dropZoneText }}
        </div>
        <va-button
          class="va-file-upload__field__button"
          :disabled="disabled"
          :color="colorComputed"
          @change="changeFieldValue"
          @click="callFileDialogue()"
          icon=""
          icon-right=""
          :style="{ 'pointer-events': dropzoneHighlight ? 'none' : '' }"
        >
          {{ uploadButtonText }}
        </va-button>
      </div>
    </slot>

    <input
      ref="fileInputRef"
      type="file"
      class="va-file-upload__field__input"
      :accept="fileTypes"
      :multiple="type !== 'single'"
      :disabled="disabled"
      @change="changeFieldValue"
      @dragenter="dropzoneHighlight = true"
      @dragleave="dropzoneHighlight = false"
      tabindex="-1"
    >
    <va-file-upload-list
      v-if="files.length"
      :type="type"
      :files="files"
      :color="colorComputed"
      @remove="removeFile"
      @removeSingle="removeSingleFile"
    />
    <va-modal
      v-model="modal"
      hide-default-actions
      title="File validation"
      message="File type is incorrect!"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, PropType } from 'vue'
import { useColors } from '../../services/color-config/color-config'
import { shiftHSLAColor } from '../../services/color-config/color-functions'
import VaButton from '../va-button'
import VaModal from '../va-modal'
import VaFileUploadList from './VaFileUploadList'

import type { VaFile } from './types'

export default defineComponent({
  name: 'VaFileUpload',

  components: {
    VaModal,
    VaButton,
    VaFileUploadList,
  },

  props: {
    fileTypes: { type: String as PropType<string>, default: '' },
    dropzone: { type: Boolean as PropType<boolean>, default: false },
    color: { type: String as PropType<string>, default: 'primary' },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    dropZoneText: { type: String as PropType<string>, default: 'Drag’n’drop files or' },
    uploadButtonText: { type: String as PropType<string>, default: 'Upload file' },

    modelValue: {
      type: Array as PropType<VaFile[]>,
      default: () => [],
      validator: (value: VaFile[]) => Array.isArray(value),
    },
    type: {
      type: String as PropType<'list' | 'gallery' | 'single'>,
      default: 'list',
      validator: (value: string) => ['list', 'gallery', 'single'].includes(value),
    },
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const modal = ref(false)
    const dropzoneHighlight = ref(false)
    const fileInputRef = ref<HTMLInputElement | null>(null)

    const { getColor } = useColors()

    const colorComputed = computed(() => getColor(props.color))

    const computedStyle = computed(() => {
      if (props.dropzone) {
        return {
          backgroundColor: shiftHSLAColor(colorComputed.value, { a: dropzoneHighlight.value ? -0.82 : -0.92 }),
        }
      }

      return { backgroundColor: 'transparent' }
    })

    const files = computed<VaFile[]>({
      get () { return props.modelValue },
      set (files) { emit('update:modelValue', files) },
    })

    const validateFiles = (files: VaFile[]) => files.filter((file) => {
      const fileName = file.name || file.url
      if (!fileName) { return false }
      if (file.url) { return true }

      const MIMETypes = ['audio/*', 'video/*', 'image/*']
      const isContainedMIMEType = MIMETypes.find((t) => props.fileTypes.includes(t))

      if (isContainedMIMEType) {
        // Do not validate MIMEType because there is too much to validate.
        return true
      }

      const extn = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()

      const isCorrectExt = props.fileTypes.includes(extn)
      if (!isCorrectExt) { modal.value = true }

      return isCorrectExt
    })

    const uploadFile = (e: Event | DragEvent) => {
      const f = (e.target as HTMLInputElement)?.files || (e as DragEvent).dataTransfer?.files

      if (!f) { return }

      files.value = [...files.value, ...(props.fileTypes ? validateFiles(Array.from(f)) : f)]
    }

    const changeFieldValue = (e: Event | DragEvent) => {
      uploadFile(e)

      if (fileInputRef.value) {
        fileInputRef.value.value = ''
      }
    }

    const removeFile = (index: number) => { files.value = files.value.filter((item, idx) => idx !== index) }

    const removeSingleFile = () => { files.value = [] }

    const callFileDialogue = () => {
      if (fileInputRef.value) {
        fileInputRef.value.click()
      }
    }

    onMounted(() => {
      if (Array.isArray(files.value)) {
        files.value = validateFiles(files.value)
      }
    })

    return {
      modal,
      dropzoneHighlight,
      fileInputRef,
      colorComputed,
      computedStyle,
      uploadFile,
      changeFieldValue,
      files,
      removeFile,
      removeSingleFile,
      callFileDialogue,
    }
  },
})
</script>

<style lang='scss'>
@import "../../styles/resources";
@import "variables";

.va-file-upload {
  position: var(--va-file-upload-position);
  font-family: var(--va-font-family);
  margin: var(--va-file-upload-margin);

  .va-file-upload-list {
    margin-top: var(--va-file-upload-list-margin-top);
  }

  &--dropzone {
    background-color: var(--va-file-upload-dropzone-background-color);
    overflow: var(--va-file-upload-dropzone-overflow);
    border-radius: var(--va-file-upload-dropzone-border-radius);
    cursor: var(--va-file-upload-dropzone-cursor);

    .va-file-upload__field {
      justify-content: center;
      display: flex;
      align-items: center;
      padding: var(--va-file-upload-dropzone-field-padding);
      transition: height 0.2s;
      overflow: visible;
      flex-wrap: wrap;

      @include media-breakpoint-down(sm) {
        flex-direction: column;
        padding: var(--va-file-upload-dropzone-field-padding-sm);

        &__text {
          padding: var(--va-file-upload-dropzone-text-padding-sm);
          text-align: center;
        }
      }
    }

    .va-file-upload-list {
      padding: var(--va-file-upload-dropzone-list-padding);
      margin-top: 0;
    }
  }

  &__field {
    overflow: var(--va-file-upload-dropzone-field-overflow);
    display: var(--va-file-upload-dropzone-field-display);
    align-items: var(--va-file-upload-dropzone-field-align-items);
    position: var(--va-file-upload-dropzone-field-position);

    &__button {
      margin: var(--va-file-upload-dropzone-field-button-margin);
      z-index: var(--va-file-upload-dropzone-field-button-z-index);
    }

    &__text {
      padding-right: var(--va-file-upload-dropzone-field-text-pr);
    }

    &__input {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100%;
      color: transparent;
      opacity: 0;
      cursor: pointer;

      &::-webkit-file-upload-button {
        cursor: pointer;
      }
    }
  }
}
</style>
