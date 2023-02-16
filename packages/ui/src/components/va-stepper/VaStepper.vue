<template>
  <div
    class="va-stepper"
    :class="{ 'va-stepper--vertical': $props.vertical }"
  >
    <ol
      class="va-stepper__navigation"
      :class="{ 'va-stepper__navigation--vertical': $props.vertical }"
    >
      <template
        v-for="(step, i) in $props.steps"
        :key="i"
      >
        <slot
          v-if="i > 0"
          name="divider"
          v-bind="getIterableSlotData(step, i)"
        >
          <span
            class="va-stepper__divider"
            :class="{ 'va-stepper__divider--vertical': $props.vertical }"
          />
        </slot>

        <slot
          :name="`step-button-${i}`"
          v-bind="getIterableSlotData(step, i)"
        >
          <va-stepper-step-button
            v-bind="{...$props, step, stepControls }"
            :stepIndex="i"
          />
        </slot>
      </template>
    </ol>
    <div
      class="va-stepper__step-content-wrapper"
      :class="{ 'va-stepper__step-content-wrapper--vertical': $props.vertical }"
    >
      <template
        v-for="(step, i) in $props.steps"
        :key="i"
      >
        <div
          class="va-stepper__step-content"
          v-if="$slots[`step-content-${i}`] && modelValue === i"
        >
          <slot
            :name="`step-content-${i}`"
            v-bind="getIterableSlotData(step, i)"
          />
        </div>
      </template>
      <div class="va-stepper__controls">
        <va-stepper-controls
          v-if="!controlsHidden"
          v-bind="{ ...$props, stepControls }"
          @finish="$emit('finish')"
        />
        <slot
          name="controls"
          v-bind="stepControls"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref } from 'vue'
import { useColors, useStateful, useStatefulProps } from '../../composables'
import type { Step, StepControls } from './types'
import VaStepperControls from './VaStepperControls.vue'
import VaStepperStepButton from './VaStepperStepButton.vue'

export default defineComponent({
  name: 'VaStepper',
  components: { VaStepperControls, VaStepperStepButton },
  props: {
    ...useStatefulProps,
    modelValue: { type: Number, default: 0 },
    steps: {
      type: Array as PropType<Step[]>,
      default: () => [],
      required: true,
    },
    color: { type: String, default: 'primary' },
    vertical: { type: Boolean, default: false },
    navigationDisabled: { type: Boolean, default: false },
    controlsHidden: { type: Boolean, default: false },
    nextDisabled: { type: Boolean, default: false },
    finishButtonHidden: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'finish'],
  setup (props, { emit }) {
    const { valueComputed: modelValue }: { valueComputed: Ref<number> } = useStateful(props, emit, 'modelValue', { defaultValue: 0 })

    const { getColor } = useColors()
    const stepperColor = getColor(props.color)

    const isNextStepDisabled = (index: number) => props.nextDisabled && index > modelValue.value

    const setStep = (index: number) => {
      if (props.steps[index].disabled) { return }
      emit('update:modelValue', index)
    }

    const nextStep = (stepsToSkip = 0) => {
      const targetIndex = modelValue.value + 1 + stepsToSkip

      if (!props.steps[targetIndex]) { return }
      if (props.steps[targetIndex].disabled) {
        nextStep(stepsToSkip + 1)
      }

      setStep(targetIndex)
    }

    const prevStep = (stepsToSkip = 0) => {
      const targetIndex = modelValue.value - 1 - stepsToSkip

      if (!props.steps[targetIndex]) { return }
      if (props.steps[targetIndex].disabled) {
        prevStep(stepsToSkip + 1)
      }

      setStep(targetIndex)
    }

    const stepControls: StepControls = { setStep, nextStep, prevStep }
    const getIterableSlotData = (step: Step, index: number) => ({
      ...stepControls,
      step,
      isActive: props.modelValue === index,
      isCompleted: props.modelValue > index,
    })

    return {
      isNextStepDisabled,
      stepperColor,
      getColor,
      stepControls,
      getIterableSlotData,
    }
  },
})
</script>

<style lang="scss">
@import "variables";

.va-stepper {
  display: flex;
  flex-direction: column;

  &--vertical {
    flex-direction: row;
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    &--vertical {
      flex-direction: column;
      align-items: flex-start;
      flex-wrap: nowrap;
    }
  }

  &__divider {
    flex-grow: 1;
    height: var(--va-stepper-divider-thickness);
    width: var(--va-stepper-divider-length);
    min-width: var(--va-stepper-divider-min-length);
    margin: 0 var(--va-stepper-divider-spacing);
    background: var(--va-stepper-divider-color);

    &--vertical {
      min-height: var(--va-stepper-divider-min-length);
      height: var(--va-stepper-divider-length);
      width: var(--va-stepper-divider-thickness);
      min-width: var(--va-stepper-divider-thickness);
      margin: var(--va-stepper-divider-spacing) 0;
      margin-left: var(--va-stepper-divider-vertical-margin-left);
    }
  }

  &__step-content-wrapper {
    padding: var(--va-stepper-step-content-wrapper-padding);
  }

  &__step-content {
    margin: var(--va-stepper-step-content-margin);
  }

  &__controls {
    display: flex;
    gap: var(--va-stepper-controls-gap);
  }
}
</style>
