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
        :aria-label="t('removeFile')"
        size="small"
        color="danger"
        flat
        @click="$emit('remove')"
      >
        Delete
      </va-button>
    </va-list-item-section>
  </va-list-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useStrictInject, useTranslation } from '../../../composables'

import { VaButton, VaListItem, VaListItemSection } from '../../index'
import { VaFileUploadKey, ConvertedFile } from '../types'

const INJECTION_ERROR_MESSAGE = 'The VaFileUploadSingleItem component should be used in the context of VaFileUpload component'

export default defineComponent({
  name: 'VaFileUploadSingleItem',

  components: {
    VaButton,
    VaListItem,
    VaListItemSection,
  },

  emits: ['remove'],

  props: {
    file: { type: Object as PropType<ConvertedFile | null>, default: null },
  },

  setup: () => ({
    ...useTranslation(),
    disabled: useStrictInject(VaFileUploadKey, INJECTION_ERROR_MESSAGE).disabled,
  }),
})
</script>

<style lang='scss'>
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
