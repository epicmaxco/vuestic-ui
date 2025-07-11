<template>
  <div
    class="va-file-upload"
    :class="computedClasses"
    :style="computedStyle"
  >
    <slot>
      <div class="va-file-upload__field">
        <div
          v-if="dropzone"
          class="va-file-upload__field__text"
        >
          {{ tp(dropZoneText) }}
        </div>
        <va-button
          class="va-file-upload__field__button"
          :disabled="disabled"
          :aria-disabled="disabled"
          :color="colorComputed"
          :style="{ 'pointer-events': dropzoneHighlight ? 'none' : undefined }"
          @change="changeFieldValue"
          @click="callFileDialogue"
        >
          {{ tp(uploadButtonText) }}
        </va-button>
      </div>
    </slot>

    <input
      ref="fileInputRef"
      type="file"
      class="va-file-upload__field__input"
      :tabindex="-1"
      aria-hidden="true"
      :accept="fileTypes"
      :multiple="type !== 'single'"
      :disabled="disabled"
      @change="changeFieldValue"
      @dragenter="dropzoneHighlight = true"
      @dragleave="dropzoneHighlight = false"
    >
    <va-file-upload-list
      v-if="files.length && !$props.hideFileList"
      v-bind="fileUploadListProps"
      :type="type"
      :files="files"
      :color="colorComputed"
      @remove="removeFile"
      @removeSingle="removeSingleFile"
    />
    <va-modal
      v-model="modal"
      hide-default-actions
      :message="tp(fileIncorrectMessage)"
    />
  </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, toRef, shallowRef, provide, PropType, ComputedRef } from 'vue'

import { useColors, useComponentPresetProp, useBem, useTranslation, useTranslationProp, useNumericProp, makeNumericProp, ColorName } from '../../composables'

import { VaFileUploadKey, VaFile } from './types'
import { StringWithAutocomplete } from '../../utils/types/prop-type'
import { VaButton, VaModal } from '../index'
import { VaFileUploadList } from './VaFileUploadList'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

const VaFileUploadListProps = extractComponentProps(VaFileUploadList)
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaFileUpload',
})

const props = defineProps({
  ...useComponentPresetProp,
  ...VaFileUploadListProps,
  fileTypes: { type: String, default: '' },
  dropzone: { type: Boolean, default: false },
  hideFileList: { type: Boolean, default: false },
  color: { type: String as PropType<StringWithAutocomplete<ColorName>>, default: 'primary' },
  disabled: { type: Boolean, default: false },
  undo: { type: Boolean, default: false },
  undoDuration: makeNumericProp({ default: 3000 }),
  undoButtonText: useTranslationProp('$t:undo'),
  dropZoneText: useTranslationProp('$t:dropzone'),
  uploadButtonText: useTranslationProp('$t:uploadFile'),
  deletedFileMessage: useTranslationProp('$t:fileDeleted'),
  fileIncorrectMessage: useTranslationProp('$t:fileTypeIncorrect'),
  modelValue: {
    type: [Object, Array] as PropType<VaFile | VaFile[]>,
    default: () => [],
  },
  type: {
    type: String as PropType<'list' | 'gallery' | 'single'>,
    default: 'list',
    validator: (value: string) => ['list', 'gallery', 'single'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'file-removed', 'file-added'])

const fileInputRef = shallowRef<HTMLInputElement>()

const modal = ref(false)
const dropzoneHighlight = ref(false)

const { getColor, shiftHSLAColor } = useColors()
const colorComputed = computed(() => getColor(props.color))

const computedStyle = computed(() => ({
  backgroundColor: props.dropzone
    ? shiftHSLAColor(colorComputed.value, { a: dropzoneHighlight.value ? -0.82 : -0.92 })
    : 'transparent',
}))

const computedClasses = useBem('va-file-upload', () => ({
  dropzone: props.dropzone,
  disabled: props.disabled,
}))

const files = computed<VaFile[]>({
  get () { return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue] },
  set (files) {
    if (props.type === 'single') {
      emit('update:modelValue', files[0])
    } else {
      emit('update:modelValue', files)
    }
  },
})

const filterInvalidFiles = (files: VaFile[]) => files.filter((file) => {
  const fileName = file.name || file.url
  if (!fileName) { return false }
  if (file.url) { return true }

  const MIMETypes = ['audio/*', 'video/*', 'image/*']
  const isContainedMIMEType = MIMETypes.find((t) => props.fileTypes.includes(t))

  if (isContainedMIMEType) {
    // Do not validate MIMEType because there is too much to validate.
    return true
  }

  const extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()

  const isCorrectExt = props.fileTypes.includes(extension)
  if (!isCorrectExt) { modal.value = true }

  return isCorrectExt
})

const uploadFile = (e: Event | DragEvent) => {
  const f = (e.target as HTMLInputElement)?.files || (e as DragEvent).dataTransfer?.files

  if (!f) { return }

  const validatedFiles = props.fileTypes ? filterInvalidFiles(Array.from(f)) : f

  files.value = props.type === 'single' ? (validatedFiles as VaFile[]) : [...files.value, ...validatedFiles]

  emit('file-added', validatedFiles)
}

const changeFieldValue = (e: Event | DragEvent) => {
  uploadFile(e)

  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const removeFile = (index: number) => {
  if (index in files.value) {
    const removedFile = files.value[index]
    files.value = files.value.filter((item, idx) => idx !== index)
    emit('file-removed', removedFile)
  }
}

const removeSingleFile = () => {
  if (files.value.length > 0) {
    const removedFile = files.value[0]
    files.value = []
    emit('file-removed', removedFile)
  }
}

const callFileDialogue = () => {
  if (fileInputRef.value) {
    fileInputRef.value.click()
  }
}

onMounted(() => {
  if (Array.isArray(files.value)) {
    const filteredFiles = filterInvalidFiles(files.value)
    if (filteredFiles.length !== files.value.length) {
      files.value = filteredFiles
    }
  }
})

const { tp } = useTranslation()

provide(VaFileUploadKey, {
  undo: toRef(props, 'undo'),
  disabled: toRef(props, 'disabled'),
  undoDuration: useNumericProp('undoDuration') as ComputedRef<number>,
  undoButtonText: computed(() => tp(props.undoButtonText)),
  deletedFileMessage: computed(() => tp(props.deletedFileMessage)),
})

const fileUploadListProps = filterComponentProps(VaFileUploadListProps)
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-file-upload {
  position: var(--va-file-upload-position);
  font-family: var(--va-font-family);
  margin: var(--va-file-upload-margin);

  .va-file-upload-list {
    margin-top: var(--va-file-upload-list-margin-top);
  }

  &__field {
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;

    &__button {
      margin: var(--va-file-upload-dropzone-field-button-margin);
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

  &--dropzone {
    background-color: var(--va-file-upload-dropzone-background-color);
    overflow: hidden;
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

  &--disabled {
    .va-file-upload__field__input {
      cursor: default;

      &::-webkit-file-upload-button {
        cursor: inherit;
      }
    }
  }

  .va-button {
    @include keyboard-focus-outline($offset: -2px);
  }
}
</style>
