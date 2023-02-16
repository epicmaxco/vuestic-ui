<template>
  <div class="va-stepper__default-controls">
    <va-button
      preset="primary"
      :disabled="$props.modelValue <= 0"
      @click="$props.stepControls.prevStep()"
    >
      {{ t('Back') }}
    </va-button>
    <va-button
      v-if="!isLastStep"
      @click="$props.stepControls.nextStep()"
      :disabled="$props.nextDisabled"
    >
      {{ t('Next') }}
    </va-button>
    <va-button
      v-else-if="!$props.finishButtonHidden"
      @click="$emit('finish')"
    >
      {{ t('Finish') }}
    </va-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { VaButton } from '../va-button'
import type { Step, StepControls } from './types'

export default defineComponent({
  name: 'VaStepperControls',
  components: { VaButton },
  props: {
    modelValue: { type: Number, required: true },
    steps: {
      type: Array as PropType<Step[]>,
      required: true,
    },
    nextDisabled: { type: Boolean, required: true },
    stepControls: { type: Object as PropType<StepControls>, required: true },
    finishButtonHidden: { type: Boolean, default: false },
  },
  setup (props) {
    const { t } = useI18n()

    const isLastStep = computed(() => {
      const lastEnabledStepIndex = props.steps.length - 1 - [...props.steps].reverse().findIndex((step) => !step.disabled)
      return props.modelValue >= lastEnabledStepIndex
    })

    return {
      t,
      isLastStep,
    }
  },
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
