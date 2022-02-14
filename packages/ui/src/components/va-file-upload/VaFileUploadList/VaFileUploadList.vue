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
    <template v-if="type === 'single' && filesList.length">
      <va-file-upload-single-item
        :file="filesList[filesList.length - 1]"
        @remove="$emit('removeSingle')"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import VaFileUploadListItem from '../VaFileUploadListItem'
import VaFileUploadGalleryItem from '../VaFileUploadGalleryItem'
import VaFileUploadSingleItem from '../VaFileUploadSingleItem'

import type { VaFile, ConvertedFile } from '../types'

export default defineComponent({
  name: 'VaFileUploadList',
  components: {
    VaFileUploadListItem,
    VaFileUploadGalleryItem,
    VaFileUploadSingleItem,
  },
  emits: ['remove', 'removeSingle'],
  props: {
    type: { type: String as PropType<string>, default: '' },
    files: { type: Array as PropType<VaFile[]>, default: null },
    color: { type: String as PropType<string>, default: 'success' },
  },
  setup (props) {
    const filesList = computed(() => props.files.map(convertFile))

    const convertFile = (file: VaFile): ConvertedFile => ({
      name: file.name || file.url || '',
      size: formatSize(file.size),
      date: formatDate(new Date()),
      image: file,
    })

    const formatSize = (bytes?: number) => {
      if (bytes === 0) { return '0 Bytes' }
      if (!bytes) { return '' }

      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const formatDate = (date = new Date()) => {
      return date.toLocaleDateString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    }

    return {
      filesList,
    }
  },
})
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
