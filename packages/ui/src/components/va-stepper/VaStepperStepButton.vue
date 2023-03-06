<template>
  <li
    class="va-stepper__step-button"
    :class="computedClass"
    @click="!$props.navigationDisabled && $props.stepControls.setStep($props.stepIndex)"
  >
    <div class="va-stepper__step-button__icon">
      <va-icon
        v-if="step.icon"
        :name="step.icon"
        size="1.3rem"
      />
      <template v-else>
        {{ $props.stepIndex + 1 }}
      </template>
    </div>
    {{ step.label }}
  </li>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { VaIcon } from '../va-icon'
import { useBem, useColors } from '../../composables'
import type { Step, StepControls } from './types'

export default defineComponent({
  name: 'VaStepperStepButton',
  components: { VaIcon },
  props: {
    modelValue: { type: Number, required: true },
    step: {
      type: Object as PropType<Step>,
      required: true,
    },
    color: { type: String, required: true },
    stepIndex: { type: Number, required: true },
    navigationDisabled: { type: Boolean, required: true },
    nextDisabled: { type: Boolean, required: true },
    stepControls: { type: Object as PropType<StepControls>, required: true },
  },
  emits: ['update:modelValue'],
  setup (props) {
    const { getColor } = useColors()
    const stepperColor = getColor(props.color)

    const isNextStepDisabled = (index: number) => props.nextDisabled && index > props.modelValue

    const computedClass = useBem('va-stepper__step-button', () => ({
      active: props.modelValue >= props.stepIndex,
      disabled: props.step.disabled || isNextStepDisabled(props.stepIndex),
      'navigation-disabled': props.navigationDisabled,
    }))

    return {
      isNextStepDisabled,
      stepperColor,
      getColor,
      computedClass,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-stepper {
  &__step-button {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--va-stepper-step-button-gap);
    flex-shrink: 0;
    padding: var(--va-stepper-step-button-padding);

    &::after {
      content: "";
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: v-bind(stepperColor);
      transition: opacity 0.3s;
      opacity: 0;
      border-radius: var(--va-stepper-step-border-radius);
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--va-stepper-step-button-icon-size);
      width: var(--va-stepper-step-button-icon-size);
      font-size: var(--va-stepper-step-button-number-size);
      color: white;
      background: var(--va-stepper-step-button-inactive-color);
      border-radius: var(--va-stepper-step-button-icon-border-radius);
    }

    &--active {
      color: v-bind(stepperColor);

      .va-stepper__step-button__icon {
        background: v-bind(stepperColor);
      }
    }

    &--disabled {
      opacity: var(--va-stepper-step-button-disabled-opacity);
      pointer-events: none;
    }

    &:hover::after {
      opacity: var(--va-stepper-step-button-hover-highlight-opacity);
    }

    &--navigation-disabled::after {
      display: none;
    }
  }
}
</style>
