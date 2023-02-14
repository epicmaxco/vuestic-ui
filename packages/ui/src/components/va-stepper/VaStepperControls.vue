<template>
  <div class="va-stepper__default-controls">
    <va-button
      preset="primary"
      :disabled="$props.modelValue <= 0"
      @click="$props.stepControls.prevStep()"
    >
      Back
    </va-button>
    <va-button
      v-if="isNextButtonVisible"
      @click="$props.stepControls.nextStep()"
      :disabled="$props.nextDisabled"
    >
      Next
    </va-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
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
  },
  setup (props) {
    const isNextButtonVisible = computed(() => {
      const lastEnabledStepIndex = props.steps.length - 1 - [...props.steps].reverse().findIndex((step) => !step.disabled)
      return props.modelValue < lastEnabledStepIndex
    })

    return {
      isNextButtonVisible,
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
