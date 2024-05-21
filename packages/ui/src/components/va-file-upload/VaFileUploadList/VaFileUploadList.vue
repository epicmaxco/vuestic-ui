<template>
  <va-list
    class="va-file-upload-list"
    :role="type !== 'single' ? 'list' : undefined"
    :class="`va-file-upload-list--${type}`"
  >
    <template v-if="type === 'list'">
      <va-file-upload-list-item
        v-for="(file, index) in filesList"
        :key="file.name"
        v-bind="itemProps"
        :file="file"
        role="listitem"
        @remove="$emit('remove', index)"
      />
    </template>
    <template v-if="type === 'gallery'">
      <va-file-upload-gallery-item
        v-for="(file, index) in filesList"
        v-bind="galleryItemProps"
        :key="file.name"
        :file="file"
        role="listitem"
        @remove="$emit('remove', index)"
      />
    </template>
    <template v-if="type === 'single' && filesList.length">
      <va-file-upload-single-item
        v-bind="singleItemProps"
        :file="filesList[filesList.length - 1]"
        @remove="$emit('removeSingle')"
      />
    </template>
  </va-list>
</template>

<script lang="ts">
import { PropType, computed } from 'vue'

import { VaList } from '../../index'
import { VaFileUploadListItem } from '../VaFileUploadListItem'
import { VaFileUploadGalleryItem } from '../VaFileUploadGalleryItem'
import { VaFileUploadSingleItem } from '../VaFileUploadSingleItem'

import type { VaFile, ConvertedFile } from '../types'

import { extractComponentProps, filterComponentProps } from '../../../utils/component-options'

const VaFileUploadGalleryItemProps = extractComponentProps(VaFileUploadGalleryItem)
const VaFileUploadListItemProps = extractComponentProps(VaFileUploadListItem)
const VaFileUploadSingleItemProps = extractComponentProps(VaFileUploadSingleItem)
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaFileUploadList',
})

const props = defineProps({
  type: { type: String, default: '' },
  files: { type: Array as PropType<VaFile[]>, default: null },
  ...VaFileUploadGalleryItemProps,
  ...VaFileUploadListItemProps,
  ...VaFileUploadSingleItemProps,
})

const emit = defineEmits(['remove', 'removeSingle'])

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

const galleryItemProps = filterComponentProps(VaFileUploadGalleryItemProps)
const itemProps = filterComponentProps(VaFileUploadListItemProps)
const singleItemProps = filterComponentProps(VaFileUploadSingleItemProps)
</script>

<style lang="scss">
.va-file-upload-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 1.5rem;

  &--gallery {
    padding-bottom: 0.5rem;
  }
}
</style>
