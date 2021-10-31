<template>
  <div
    class="va-file-upload"
    :class="{'va-file-upload--dropzone': dropzone}"
    :style="computedStyle"
  >
    <div class="va-file-upload__field">
      <div
        class="va-file-upload__field__text"
        v-if="dropzone"
      >
        Drag’n’drop files or
      </div>
      <va-button
        class="va-file-upload__field__button"
        :disabled="disabled"
        :color="colorComputed"
        @click="callFileDialogue()"
        icon=""
        icon-right=""
      >
        Upload file
      </va-button>
      <input
        ref="fileInputRef"
        type="file"
        class="va-file-upload__field__input"
        :accept="fileTypes"
        :multiple="type !== 'single'"
        :disabled="disabled"
        @change="changeFieldValue"
        tabindex="-1"
      >
    </div>
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
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useColors } from '../../services/color-config/color-config'
import { shiftHSLAColor } from '../../services/color-config/color-functions'
import VaButton from '../va-button'
import VaModal from '../va-modal'
import VaFileUploadList from './VaFileUploadList'

export default defineComponent({
  name: 'VaFileUpload',

  components: {
    VaModal,
    VaButton,
    VaFileUploadList,
  },

  props: {
    fileTypes: { type: String, default: '' },
    dropzone: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
    disabled: { type: Boolean, default: false },

    modelValue: {
      type: Array,
      default: () => [],
      validator: (value: any) => Array.isArray(value),
    },
    type: {
      type: String,
      default: 'list',
      validator: (value: string) => ['list', 'gallery', 'single'].includes(value),
    },
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const modal = ref(false)
    const fileInputRef = ref<any>(null)

    const { getColor } = useColors()

    const colorComputed = computed(() => getColor(props.color))

    const computedStyle = computed(() => ({
      backgroundColor: props.dropzone ? shiftHSLAColor(colorComputed.value, { a: -0.92 }) : 'transparent',
    }))

    const files = computed<any[]>({
      get () { return props.modelValue },
      set (files) { emit('update:modelValue', files) },
    })

    const validateFiles = (files: any) => files.filter((file: any) => {
      const fileName = file.name || file.url
      if (!fileName) { return false }
      if (file.url) { return true }

      const MIMETypes = ['audio/*', 'video/*', 'image/*']
      const isContainedMIMEType = MIMETypes.find((t) => props.fileTypes.includes(t))

      if (isContainedMIMEType) {
        // Do not validatie MIMEType becouse there is too much to validate.
        return true
      }

      const extn = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()

      const isCorrectExt = props.fileTypes.includes(extn)
      if (!isCorrectExt) { modal.value = true }

      return isCorrectExt
    })

    const uploadFile = (e: any) => {
      const f = e.target.files || e.dataTransfer.files

      files.value = [...files.value, ...(props.fileTypes ? validateFiles(Array.from(f)) : f)]
    }

    const changeFieldValue = (e: Event) => {
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
@import '../../styles/resources';
@import 'variables';

.va-file-upload {
  position: var(--va-file-upload-position);

  &--dropzone {
    background-color: var(--va-file-upload-dropzone-background-color);
    padding: var(--va-file-upload-dropzone-padding);
    overflow: var(--va-file-upload-dropzone-overflow);
    border-radius: var(--va-file-upload-dropzone-border-radius);
    cursor: var(--va-file-upload-dropzone-cursor);

    .va-file-upload__field {
      justify-content: center;
      display: flex;
      align-items: center;
      padding: 0 2rem 1rem;
      transition: height 0.2s;
      overflow: visible;
      flex-wrap: wrap;

      @include media-breakpoint-down(xs) {
        flex-direction: column;
        padding: 0 0 1rem;

        &__text {
          text-align: center;
        }
      }
    }

    .va-file-upload-list {
      padding-bottom: 1rem;
    }
  }

  &__field {
    padding-bottom: var(--va-file-upload-dropzone-field-padding-bottom);
    overflow: var(--va-file-upload-dropzone-field-overflow);
    display: var(--va-file-upload-dropzone-field-display);
    align-items: var(--va-file-upload-dropzone-field-align-items);
    position: var(--va-file-upload-dropzone-field-position);

    &__button {
      margin: var(--va-file-upload-dropzone-field-button-margin);
      z-index: var(--va-file-upload-dropzone-field-button-zindex);
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

@include media-breakpoint-down(xs) {
  .va-file-upload {
    &--dropzone {
      padding: 1.5rem 1rem;
    }
  }
}
</style>
