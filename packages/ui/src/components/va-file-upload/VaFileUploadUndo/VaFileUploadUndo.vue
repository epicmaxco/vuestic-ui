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
      :aria-label="undoButtonText"
      size="small"
      outline
      @click="$emit('recover')"
    >
      {{ undoButtonText }}
    </va-button>
  </div>
</template>

<script lang="ts">
import { computed, ref, onMounted } from 'vue'

import { useBem } from '../../../composables'
import { VaFileUploadKey } from '../types'

import { VaButton } from '../../va-button'
import { VaProgressBar } from '../../va-progress-bar'
import { strictInject } from '../../../utils/strict-inject'

const INJECTION_ERROR_MESSAGE = 'The VaFileUploadUndo component should be used in the context of VaFileUpload component'
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaFileUploadUndo',
})

const props = defineProps({
  vertical: { type: Boolean, default: false },
})

const emit = defineEmits(['recover'])

const progress = ref(100)
const {
  undoDuration,
  undoButtonText,
  deletedFileMessage,
} = strictInject(VaFileUploadKey, INJECTION_ERROR_MESSAGE)

const computedClasses = useBem('va-file-upload-undo', () => ({
  vertical: props.vertical,
}))

const undoDurationStyle = computed(() => `${undoDuration.value ?? 0}ms`)

onMounted(() => {
  const timer = setTimeout(() => {
    progress.value = 0
    clearTimeout(timer)
  }, 0)
})
</script>

<style lang="scss">
@import 'variables';

.va-file-upload-undo-progress-bar {
  position: absolute;
  top: 0;
  left: 0;

  --va-progress-bar-transition: width v-bind(undoDurationStyle) linear;
}

.va-file-upload-undo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

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
