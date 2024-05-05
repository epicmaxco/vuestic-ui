<template>
  <div class="va-stepper__default-controls">
    <va-button
      preset="primary"
      :disabled="Number($props.modelValue) <= 0"
      :loading="isLoading"
      @click="$props.stepControls.prevStep()"
    >
      {{ t('back') }}
    </va-button>
    <va-button
      v-if="!isLastStep"
      @click="$props.stepControls.nextStep()"
      :disabled="$props.nextDisabled"
      :loading="isLoading"
    >
      {{ t('next') }}
    </va-button>
    <va-button
      v-else-if="!$props.finishButtonHidden"
      @click="$props.stepControls.finish()"
      :loading="isLoading"
    >
      {{ t('finish') }}
    </va-button>
  </div>
</template>
<script lang="ts" setup>
import { PropType, computed } from 'vue'
import { useTranslation } from '../../composables'
import { VaButton } from '../va-button'
import type { Step, StepControls } from './types'
import { unFunction } from '../../utils/un-function'

defineOptions({
  name: 'VaStepperControls',
})

const props = defineProps({
  modelValue: { type: [Number, String], required: true },
  steps: {
    type: Array as PropType<Step[]>,
    required: true,
  },
  nextDisabled: { type: Boolean, required: true },
  stepControls: { type: Object as PropType<StepControls>, required: true },
  finishButtonHidden: { type: Boolean, default: false },
})

const { t } = useTranslation()

const isLoading = computed<boolean>(() => {
  const currentStep = props.steps[Number(props.modelValue)]

  return unFunction(currentStep.isLoading) || false
})

const isLastStep = computed(() => {
  const lastEnabledStepIndex = props.steps.length - 1
  return Number(props.modelValue) >= lastEnabledStepIndex
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
