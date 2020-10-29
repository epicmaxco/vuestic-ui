<template>
  <div
    class="va-file-upload-list"
    :class="`va-file-upload-list--${type}`"
  >
    <template v-if="type === 'list'">
      <va-file-upload-list-item
        v-for="(file, index) in filesList"
        :key="file.name"
        :file="file"
        :color="color"
        @remove="$emit('remove', index)"
      />
    </template>
    <template v-if="type === 'gallery'">
      <va-file-upload-gallery-item
        v-for="(file, index) in filesList"
        :file="file"
        :key="file.name"
        :color="color"
        @remove="$emit('remove', index)"
      />
    </template>
    <va-file-upload-single-item
      v-if="type === 'single' && filesList.length"
      :file="filesList[filesList.length - 1]"
    S@remove="$emit('removeSingle')"
    />
  </div>
</template>

<script lang="ts">
import { Mixins } from 'vue-property-decorator'

import VaFileUploadListItem from './VaFileUploadListItem.vue'
import VaFileUploadGalleryItem from './VaFileUploadGalleryItem.vue'
import VaFileUploadSingleItem from './VaFileUploadSingleItem.vue'

import { makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import { Options } from 'vue-class-component'

const FileUploadListPropsMixin = makeContextablePropsMixin({
  type: { type: String, default: '' },
  files: { type: [Object, Array], default: null },
  color: { type: String, default: 'success' },
})

@Options({
  name: 'VaFileUploadList',
  components: {
    VaFileUploadListItem,
    VaFileUploadGalleryItem,
    VaFileUploadSingleItem,
  },
  emits: ['remove', 'removeSingle'],
})
export default class VaFileUploadList extends Mixins(
  FileUploadListPropsMixin,
) {
  get filesList () {
    return this.files.map(this.convertFile)
  }

  convertFile (file: any) {
    return {
      name: file.name || file.url,
      size: file.size ? this.formatSize(file.size) : '',
      date: this.formatDate(new Date()),
      image: file,
    }
  }

  formatSize (bytes: number) {
    if (bytes === 0) { return '0 Bytes' }
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  formatDate (date: Date) {
    if (!date) { return '' }
    return date.toLocaleDateString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }
}
</script>

<style lang='scss'>
.va-file-upload-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 1.5rem;

  &--gallery {
    padding-bottom: 0.5rem;
  }
}
</style>
