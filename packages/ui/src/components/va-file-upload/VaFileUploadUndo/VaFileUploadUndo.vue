<template>
  <va-progress-bar
    :model-value="progress"
    :rounded="false"
    class="va-file-upload-undo-progress-bar"
  />
  <div
    class="va-file-upload-undo"
    :class="computedClasses"
  >
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

  setup: (props) => {
    const progress = ref(100)
    let timer: ReturnType<typeof setTimeout>

    const { undoDuration, deletedFileMessage, undoButtonText } = inject(VaFileUploadKey, {
      undoDuration: computed(() => 3000),
      deletedFileMessage: computed(() => 'File was successfully deleted'),
      undoButtonText: computed(() => 'Undo'),
    })

    const computedClasses = computed(() => ({
      'va-file-upload-undo--vertical': props.vertical,
    }))

    onMounted(() => {
      timer = setTimeout(() => {
        progress.value = 0
        clearTimeout(timer)
      }, 0)
    })

    const undoDurationStyle = computed(() => `${undoDuration.value}ms`)

    return {
      progress,
      undoDuration,
      undoButtonText,
      computedClasses,
      undoDurationStyle,
      deletedFileMessage,
    }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-file-upload-undo-progress-bar {
  --va-progress-bar-transition: width v-bind(undoDurationStyle) linear;
}

.va-file-upload-undo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: var(--va-file-upload-undo-padding);

  &__button {
    line-height: var(--va-file-upload-undo-button-line-height);
    margin-left: var(--va-file-upload-undo-margin-left);
    margin-top: var(--va-file-upload-undo-button-margin-top);
    margin-bottom: var(--va-file-upload-undo-button-margin-bottom);
  }

  &--vertical {
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: var(--va-file-upload-undo-padding);

    .va-file-upload-undo__text {
      margin: 1rem 0 0;
      text-align: center;
    }

    .va-file-upload-undo__button {
      margin: 1rem 0 0;
    }
  }
}
</style>
