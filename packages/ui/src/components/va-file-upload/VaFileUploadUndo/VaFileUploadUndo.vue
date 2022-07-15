<template>
  <div
    class="va-file-upload-undo"
    :class="{ 'va-file-upload-undo--vertical': $props.vertical }"
  >
    <va-progress-bar
      :model-value="progress"
      :rounded="false"
      class="va-file-upload-undo__progress-bar"
    />
    <span class="va-file-upload-undo__text">{{ deletedFileMessage }}</span>
    <va-button
      class="va-file-upload-undo__button"
      size="small"
      outline
      @click="$emit('recover')"
    >
      {{ undoButtonText }}
    </va-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref, onMounted } from 'vue'

import { VaFileUploadKey } from '../types'

import { VaButton, VaProgressBar } from '../../index'

export default defineComponent({
  name: 'VaFileUploadUndo',

  components: {
    VaProgressBar,
    VaButton,
  },

  props: {
    vertical: { type: Boolean, default: false },
  },

  emits: ['recover'],

  setup: () => {
    const progress = ref(100)
    let timer: ReturnType<typeof setInterval>

    const { undoDuration, deletedFileMessage, undoButtonText } = inject(VaFileUploadKey, {
      undoDuration: computed(() => 3000),
      deletedFileMessage: computed(() => 'File was successfully deleted'),
      undoButtonText: computed(() => 'Undo'),
    })

    onMounted(() => {
      timer = setInterval(() => {
        progress.value -= 10

        if (progress.value <= 0) {
          progress.value = 0
          clearInterval(timer)
        }
      }, undoDuration.value * 0.1)
    })

    return {
      progress,
      undoDuration,
      undoButtonText,
      deletedFileMessage,
    }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-file-upload-undo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  &__progress-bar {
    flex: 1 100%;
    margin-bottom: 1rem;

    --va-progress-bar-transition: width 0.2s ease;
  }

  &__button {
    line-height: var(--va-file-upload-undo-button-line-height);
    margin-left: var(--va-file-upload-undo-margin-left);
    margin-top: var(--va-file-upload-undo-button-margin-top);
    margin-bottom: var(--va-file-upload-undo-button-margin-bottom);
  }

  &--vertical {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;

    .va-file-upload-undo__text {
      text-align: center;
    }

    .va-file-upload-undo__button {
      margin-top: 1rem;
    }
  }
}
</style>
