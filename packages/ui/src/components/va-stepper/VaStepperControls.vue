<template>
  <div class="va-stepper__default-controls">
    <va-button
      preset="primary"
      :disabled="$props.modelValue <= 0"
      @click="$props.stepControls.prevStep()"
    >
      {{ t('back') }}
    </va-button>
    <va-button
      v-if="!isLastStep"
      @click="$props.stepControls.nextStep()"
      :disabled="$props.nextDisabled"
    >
      {{ t('next') }}
    </va-button>
    <va-button
      v-else-if="!$props.finishButtonHidden"
      @click="$emit('finish')"
    >
      {{ t('finish') }}
    </va-button>
  </div>
</template>
<script lang="ts" setup>
import { PropType, computed } from 'vue'
import { useTranslation } from '../../composables/useTranslation'
import { VaButton } from '../va-button'
import type { Step, StepControls } from './types'

const props = defineProps({
  modelValue: { type: Number, required: true },
  steps: {
    type: Array as PropType<Step[]>,
    required: true,
  },
  nextDisabled: { type: Boolean, required: true },
  stepControls: { type: Object as PropType<StepControls>, required: true },
  finishButtonHidden: { type: Boolean, default: false },
})

const { t } = useTranslation()

const isLastStep = computed(() => {
  const lastEnabledStepIndex = props.steps.length - 1
  return props.modelValue >= lastEnabledStepIndex
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-stepper {
  &__default-controls {
    display: flex;
    gap: var(--va-stepper-controls-gap);
  }
}
</style>
