<template>
  <va-list-item
    :disabled="disabled"
    :aria-disabled="disabled"
    class="va-file-upload-single-item"
    tabindex="-1"
  >
    <va-list-item-section class="va-file-upload-single-item__content">
      <div class="va-file-upload-single-item__name">
        {{ file && file.name }}
      </div>
      <va-button
        v-if="!disabled"
        class="va-file-upload-single-item__button"
        :aria-label="tp($props.ariaRemoveFileLabel)"
        size="small"
        color="danger"
        preset="secondary"
        @click="$emit('remove')"
      >
        Delete
      </va-button>
    </va-list-item-section>
  </va-list-item>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { useTranslation, useTranslationProp } from '../../../composables'

import { VaButton, VaListItem, VaListItemSection } from '../../index'
import { VaFileUploadKey, ConvertedFile } from '../types'
import { strictInject } from '../../../utils/strict-inject'

const INJECTION_ERROR_MESSAGE = 'The VaFileUploadSingleItem component should be used in the context of VaFileUpload component'
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaFileUploadSingleItem',
})

const props = defineProps({
  file: { type: Object as PropType<ConvertedFile | null>, default: null },
  ariaRemoveFileLabel: useTranslationProp('$t:removeFile'),
})

const emit = defineEmits(['remove'])

const { t, tp } = useTranslation()
const { disabled } = strictInject(VaFileUploadKey, INJECTION_ERROR_MESSAGE)
</script>

<style lang="scss">
.va-file-upload-single-item {
  width: 100%;

  &__content {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 100%;
    width: 100%;
  }

  &__name {
    margin-right: 0.25rem;
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: normal;
  }

  &__button {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 700;
  }
}
</style>
