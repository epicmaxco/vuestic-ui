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
        v-for="step, i in $props.steps"
        :key="i"
      >
        <slot
          v-if="i > 0"
          name="divider"
          v-bind="stepControls"
        >
          <span
            class="va-stepper__divider"
            :class="{ 'va-stepper__divider--vertical': $props.vertical }"
          />
        </slot>

        <slot
          :name="`step-${i}`"
          v-bind="{
            ...stepControls,
            step,
            isActive: $props.modelValue === i,
            isCompleted: $props.modelValue > i,
          }"
        >
          <li
            class="va-stepper__step"
            :class="{
              'va-stepper__step--active': $props.modelValue >= i,
              'va-stepper__step--disabled': step.disabled || isNextStepDisabled(i),
              'va-stepper__step--navigation-disabled': $props.navigationDisabled,
            }"
            @click="!$props.navigationDisabled && stepControls.setStep(i)"
          >

            <div class="va-stepper__step__icon">
              <va-icon
                v-if="step.icon"
                :name="step.icon"
                size="1.3rem"
              />
              <span v-else>
                {{ i + 1 }}
              </span>
            </div>

            <span>
              {{ step.label }}
            </span>
          </li>
        </slot>
      </template>
    </ol>
    <div
      class="va-stepper__content-wrapper"
      :class="{ 'va-stepper__content-wrapper--vertical': $props.vertical }"
    >
      <template
        v-for="step, i in $props.steps"
        :key="i"
      >
        <div
          class="va-stepper__content"
          v-if="$slots[`content-${i}`] && $props.modelValue === i"
        >
          <slot
            :name="`content-${i}`"
            v-bind="{ ...stepControls, step }"
          />
        </div>
      </template>
      <div class="va-stepper__controls">
        <template v-if="!noControls">
          <VaButton
            preset="primary"
            :disabled="$props.modelValue <= 0"
            @click="stepControls.prevStep()"
          >
            Back
          </VaButton>
          <VaButton
            v-if="isNextButtonVisible"
            @click="stepControls.nextStep()"
            :disabled="$props.nextDisabled"
          >
            Next
          </VaButton>
        </template>
        <slot
          name="controls"
          v-bind="stepControls"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { VaIcon } from '../va-icon'
import { VaButton } from '../va-button'
import { useColors } from '../../composables'

type Step = {
  label: string,
  icon?: string,
  disabled?: boolean,
}

export default defineComponent({
  name: 'VaStepper',
  components: { VaIcon, VaButton },
  props: {
    modelValue: { type: Number, required: true, default: 0 },
    steps: {
      type: Array as PropType<Step[]>,
      default: () => [],
      required: true,
    },
    color: { type: String, default: 'primary' },
    vertical: { type: Boolean, default: false },
    navigationDisabled: { type: Boolean, default: false },
    noControls: { type: Boolean, default: false },
    nextDisabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const { getColor } = useColors()
    const stepperColor = getColor(props.color)

    const isNextButtonVisible = computed(() => {
      const lastEnabledStepIndex = props.steps.length - 1 - [...props.steps].reverse().findIndex((step) => !step.disabled)
      return props.modelValue < lastEnabledStepIndex
    })

    const isNextStepDisabled = (index: number) => props.nextDisabled && index > props.modelValue

    const setStep = (index: number) => {
      if (props.steps[index].disabled) { return }
      emit('update:modelValue', index)
    }

    const nextStep = (stepsToSkip = 0) => {
      const targetIndex = props.modelValue + 1 + stepsToSkip

      if (!props.steps[targetIndex]) { return }
      if (props.steps[targetIndex].disabled) {
        nextStep(stepsToSkip + 1)
      }

      setStep(targetIndex)
    }

    const prevStep = (stepsToSkip = 0) => {
      const targetIndex = props.modelValue - 1 - stepsToSkip

      if (!props.steps[targetIndex]) { return }
      if (props.steps[targetIndex].disabled) {
        prevStep(stepsToSkip + 1)
      }

      setStep(targetIndex)
    }

    const stepControls = {
      setStep,
      nextStep,
      prevStep,
    }

    return {
      isNextButtonVisible,
      isNextStepDisabled,
      stepperColor,
      getColor,
      stepControls,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
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

    &--vertical {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  &__step {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
    padding: var(--va-stepper-step-padding);

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
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--va-stepper-icon-size);
      width: var(--va-stepper-icon-size);
      font-size: var(--va-stepper-step-number-size);
      color: white;
      background: var(--va-stepper-inactive-step-color);
      border-radius: 100%;
    }

    &--active {
      color: v-bind(stepperColor);

      .va-stepper__step__icon {
        background: v-bind(stepperColor);
      }
    }

    &--disabled {
      opacity: var(--va-stepper-step-disabled-opacity);
      pointer-events: none;
    }

    &:hover::after {
      opacity: var(--va-stepper-step-hover-highlight-opacity);
    }

    &--navigation-disabled::after {
      display: none;
    }
  }

  &__divider {
    height: 1px;
    width: var(--va-stepper-divider-size);
    min-width: var(--va-stepper-divider-min-size);
    margin: 0 0.5rem;
    background: var(--va-stepper-divider-color);

    &--vertical {
      min-height: var(--va-stepper-divider-min-size);
      height: 100%;
      width: 1px;
      min-width: 1px;
      margin: 0.5rem 0;
      margin-left: var(--va-stepper-vertical-divider-margin-left);
    }
  }

  &__content-wrapper {
    padding: 0.5rem 1rem;
  }

  &__content {
    margin: 0.8rem 0 2rem;
  }

  &__controls {
    display: flex;
    gap: 1rem;
  }
}
</style>
