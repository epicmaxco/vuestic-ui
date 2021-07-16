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
        ref="fileInput"
        type="file"
        class="va-file-upload__field__input"
        :accept="fileTypes"
        :multiple="type !== 'single'"
        :disabled="disabled"
        @change="changeFieldValue"
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
import { Options, prop, mixins, Vue } from 'vue-class-component'

import ColorMixin from '../../services/color-config/ColorMixin'
import { shiftHSLAColor } from '../../services/color-config/color-functions'
import VaButton from '../va-button'
import VaModal from '../va-modal'

import VaFileUploadList from './VaFileUploadList'

class FileUploadProps {
  type = prop<string>({
    type: String,
    default: 'list',
    validator (modelValue: string) {
      return ['list', 'gallery', 'single'].includes(modelValue)
    },
  })

  fileTypes = prop<string>({ type: String, default: '' })
  dropzone = prop<boolean>({ type: Boolean, default: false })
  modelValue = prop<any[]>({ type: Array, default: () => [] })
  color = prop<string>({ type: String, default: 'primary' })
  disabled = prop<boolean>({ type: Boolean, default: false })
}

const FileUploadPropsMixin = Vue.with(FileUploadProps)

@Options({
  name: 'VaFileUpload',
  components: {
    VaModal,
    VaButton,
    VaFileUploadList,
  },
  emits: ['update:modelValue'],
})
export default class VaFileUpload extends mixins(
  ColorMixin,
  FileUploadPropsMixin,
) {
  modal = false

  get computedStyle () {
    return {
      backgroundColor: this.dropzone ? shiftHSLAColor(this.colorComputed, { a: -0.92 }) : 'transparent',
    }
  }

  get files () {
    return this.modelValue
  }

  set files (files) {
    this.$emit('update:modelValue', files)
  }

  changeFieldValue (e: Event) {
    this.uploadFile(e)
    ;(this as any).$refs.fileInput.value = ''
  }

  uploadFile (e: any) {
    let files = e.target.files || e.dataTransfer.files

    // type validation
    if (this.fileTypes) {
      files = this.validateFiles(Array.from(files))
    }
    this.files = [...this.files, ...files]
  }

  removeFile (index: number) {
    this.files.splice(index, 1)
  }

  removeSingleFile () {
    this.files = []
  }

  validateFiles (files: any) {
    return files.filter((file: any) => {
      const fileName = file.name || file.url
      if (!fileName) {
        return false
      } else {
        if (file.url) {
          return true
        } else {
          const MIMETypes = ['audio/*', 'video/*', 'image/*']
          const isContainedMIMEType = MIMETypes.find((t) => this.fileTypes.includes(t))

          if (isContainedMIMEType) {
            // Do not validatie MIMEType becouse there is too much to validate.
            return true
          }

          const extn = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()

          const isCorrectExt = this.fileTypes.includes(extn)
          if (!isCorrectExt) {
            this.modal = true
          }

          return isCorrectExt
        }
      }
    })
  }

  callFileDialogue () {
    // HACK Seems like safari fix. If you happen to stumble upon this and have mac - please test.
    (this as any).$refs.fileInput.click()
  }

  mounted () {
    this.files = this.validateFiles(this.files)
  }
}
</script>

<style lang='scss'>
@import '../../styles/resources/resources';
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
