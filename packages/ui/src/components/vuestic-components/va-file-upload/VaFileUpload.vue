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

<script>
import VaFileUploadList from './VaFileUploadList'
import VaButton from '../va-button/VaButton'
import VaModal from '../va-modal/VaModal'
import { getFocusColor } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaFileUpload',
  components: {
    VaModal,
    VaButton,
    VaFileUploadList,
  },
  mixins: [
    ColorThemeMixin,
    makeContextablePropsMixin({
      type: {
        type: String,
        default: 'list',
        validator (value) {
          return ['list', 'gallery', 'single'].includes(value)
        },
      },
      fileTypes: {
        type: String,
        default: '',
      },
      dropzone: {
        type: Boolean,
        default: false,
      },
      value: {
        type: Array,
        default: () => [],
      },
      color: {
        type: String,
        default: 'success',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    }),
  ],
  data () {
    return {
      modal: false,
    }
  },
  mounted () {
    this.files = this.validateFiles(this.files)
  },
  methods: {
    changeFieldValue (e) {
      this.uploadFile(e)
      this.$refs.fileInput.value = ''
    },
    uploadFile (e) {
      let files = e.target.files || e.dataTransfer.files

      // type validation
      if (this.fileTypes) {
        files = this.validateFiles(Array.from(files))
      }
      this.files = [...this.files, ...files]
    },
    removeFile (index) {
      this.files.splice(index, 1)
    },
    removeSingleFile () {
      this.files = []
    },
    validateFiles (files) {
      return files.filter(file => {
        const fileName = file.name || file.url
        if (!fileName) {
          return false
        } else {
          if (file.url) {
            return true
          } else {
            const extn = fileName.substring(fileName.lastIndexOf('.') + 1)
              .toLowerCase()
            const correctExt = this.fileTypes.includes(extn)
            if (!correctExt) {
              this.modal = true
            }
            return correctExt
          }
        }
      })
    },
    callFileDialogue () {
      // HACK Seems like safari fix. If you happen to stumble upon this and have mac - please test.
      this.$refs.fileInput.click()
    },
  },
  computed: {
    computedStyle () {
      return {
        backgroundColor: this.dropzone ? getFocusColor(this.colorComputed) : 'transparent',
      }
    },
    files: {
      get () {
        return this.value
      },
      set (files) {
        this.$emit('input', files)
      },
    },
  },
}
</script>

<style lang='scss'>
@import '../../vuestic-sass/resources/resources';

.va-file-upload {
  position: relative;

  &--dropzone {
    background-color: $lighter-green;
    padding: 1.5rem 2rem 0.5rem;
    overflow: hidden;
    border-radius: 0.375rem;
    cursor: pointer;

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
    padding-bottom: 1rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;

    &__button {
      margin: 0;
      z-index: 10;
    }

    &__text {
      padding-right: 10px;
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
