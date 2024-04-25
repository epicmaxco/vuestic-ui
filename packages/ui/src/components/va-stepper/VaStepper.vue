<template>
  <div
    class="va-stepper"
    :class="{ 'va-stepper--vertical': $props.vertical }"
    v-bind="ariaAttributesComputed"
  >
    <ol
      class="va-stepper__navigation"
      ref="stepperNavigation"
      :class="{ 'va-stepper__navigation--vertical': $props.vertical }"
      @click="onValueChange"
      @keyup.enter="onValueChange"
      @keyup.space="onValueChange"
      @keyup.left="onArrowKeyPress('prev')"
      @keyup.right="onArrowKeyPress('next')"
      @focusout="resetFocus"
    >
      <template
        v-for="(step, i) in $props.steps"
        :key="i + step.label"
      >
        <slot
          v-if="i > 0"
          name="divider"
          v-bind="getIterableSlotData(step, i)"
        >
          <span
            class="va-stepper__divider"
            :class="{ 'va-stepper__divider--vertical': $props.vertical }"
            aria-hidden="true"
          />
        </slot>

        <slot
          :name="`step-button-${i}`"
          v-bind="getIterableSlotData(step, i)"
        >
          <va-stepper-step-button
            :stepIndex="i"
            :color="getStepperButtonColor(i)"
            :modelValue="modelValue"
            :nextDisabled="nextDisabled"
            :step="step"
            :stepControls="stepControls"
            :navigationDisabled="navigationDisabled"
            :focus="focusedStep"
          />
        </slot>
      </template>
    </ol>
    <div
      class="va-stepper__step-content-wrapper"
      :class="{ 'va-stepper__step-content-wrapper--vertical': $props.vertical }"
    >
      <div
        class="va-stepper__step-content"
      >
        <slot
          v-if="$props.steps?.[modelValue]"
          :name="`step-content-${modelValue}`"
          v-bind="getIterableSlotData($props.steps[modelValue], modelValue)"
        />
      </div>
      <div class="va-stepper__controls">
        <slot
          name="controls"
          v-bind="getIterableSlotData(steps[modelValue], modelValue)"
        >
          <va-stepper-controls
            v-if="!controlsHidden"
            :modelValue="modelValue"
            :nextDisabled="isNextStepDisabled(modelValue)"
            :steps="steps"
            :stepControls="stepControls"
            :finishButtonHidden="finishButtonHidden"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import VaStepperControls from './VaStepperControls.vue'
import VaStepperStepButton from './VaStepperStepButton.vue'
import { computed, PropType, ref, Ref, shallowRef, watch } from 'vue'
import { useColors, useStateful, useStatefulProps, useTranslation } from '../../composables'
import type { Step, StepControls } from './types'
import { isStepHasError } from './step'

defineOptions({
  name: 'VaStepper',
})

const props = defineProps({
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
  nextDisabledOnError: { type: Boolean, default: false },
  finishButtonHidden: { type: Boolean, default: false },
  ariaLabel: { type: String, default: '$t:progress' },
  linear: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'finish', 'update:steps'])

const stepperNavigation = shallowRef<HTMLElement>()
const { valueComputed: modelValue }: { valueComputed: Ref<number> } = useStateful(props, emit, 'modelValue')

const focusedStep = ref({ trigger: false, stepIndex: props.navigationDisabled ? -1 : props.modelValue })

const { getColor } = useColors()

const isNextStepDisabled = (index: number) => {
  if (props.nextDisabledOnError && isStepHasError(props.steps[index])) { return true }

  return props.nextDisabled
}

const findFirstNonDisabled = (from: number, direction: number) => {
  while (from >= 0 && from < props.steps.length) {
    from += direction
    const step = props.steps[from]
    if (!step) {
      return
    }
    if (!step.disabled) {
      return step
    }
  }
}

const findFirstWithErrorIndex = (from: number, direction: number) => {
  while (from >= 0 && from < props.steps.length) {
    from += direction
    const step = props.steps[from]
    if (!step) {
      return
    }
    if (isStepHasError(step) === true) {
      return from
    }
  }
}

const validateMovingToStep = async (stepIndex: number): Promise<boolean> => {
  const newStep = props.steps[stepIndex]
  const currentStep = props.steps[modelValue.value]
  const beforeNewStep = findFirstNonDisabled(stepIndex, -1)

  if (newStep.disabled) { return false }

  if (props.linear && stepIndex < modelValue.value) {
    return true
  }

  const nextNonError = findFirstWithErrorIndex(modelValue.value, 1)

  if (props.linear && nextNonError !== undefined && nextNonError < stepIndex) {
    return false
  }

  let currentStepBeforeLeaveResult
  try {
    currentStepBeforeLeaveResult = await currentStep.beforeLeave?.(currentStep, newStep)
  } catch (e) {
    throw new Error(`Error in beforeLeave function: ${e}`)
  }

  //  Checks if a save function was passed, if so it will be called and return boolean
  if (currentStepBeforeLeaveResult === false) {
    // Do not update the modelValue if the beforeLeave function returns false
    return false
  }

  // Mark current step as completed, if it is not marked manually by user
  if (currentStep.completed === undefined) {
    currentStep.completed = true
  }

  //  Do not do anything if user trying to just over few steps and last is not completed
  if (props.linear && beforeNewStep && !beforeNewStep.completed) {
    return false
  }

  // Check if currentStep has error after beforeLeave function
  if (props.linear && isStepHasError(currentStep)) { return false }

  return true
}

const setStep = async (index: number) => {
  if (!await validateMovingToStep(index)) { return }

  modelValue.value = index
}

const setFocus = (direction: 'prev' | 'next') => {
  if (props.navigationDisabled) { return }
  if (direction === 'next') {
    setFocusNextStep(1)
  } else {
    setFocusPrevStep(1)
  }
}
const setFocusNextStep = (idx: number) => {
  const newValue = focusedStep.value.stepIndex + idx

  if (isNextStepDisabled(newValue)) { return }

  if (newValue < props.steps.length) {
    if (props.steps[newValue].disabled) {
      setFocusNextStep(idx + 1)
      return
    }
    focusedStep.value.stepIndex = newValue
    focusedStep.value.trigger = true
  } else {
    for (let availableIdx = 0; availableIdx < props.steps.length; availableIdx++) {
      if (!props.steps[availableIdx].disabled) {
        focusedStep.value.stepIndex = availableIdx
        focusedStep.value.trigger = true
        break
      }
    }
  }
}
const setFocusPrevStep = (idx: number) => {
  const newValue = focusedStep.value.stepIndex - idx
  if (newValue >= 0) {
    if (props.steps[newValue].disabled) {
      setFocusPrevStep(idx + 1)
      return
    }
    focusedStep.value.stepIndex = newValue
    focusedStep.value.trigger = true
  } else {
    for (let availableIdx = props.steps.length - 1; availableIdx >= 0; availableIdx--) {
      if (!props.steps[availableIdx].disabled && !(isNextStepDisabled(availableIdx))) {
        focusedStep.value.stepIndex = availableIdx
        focusedStep.value.trigger = true
        break
      }
    }
  }
}

const resetFocus = () => {
  requestAnimationFrame(() => {
    if (!stepperNavigation.value?.contains(document.activeElement)) {
      focusedStep.value.stepIndex = props.modelValue
      focusedStep.value.trigger = false
    }
  })
}
watch(() => props.modelValue, () => {
  focusedStep.value.stepIndex = props.modelValue
  focusedStep.value.trigger = false
})

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

const finish = async () => {
  if (await validateMovingToStep(props.steps.length - 1)) {
    emit('finish')
  }
}

const stepControls: StepControls = { setStep, nextStep, prevStep, finish }
const getIterableSlotData = (step: Step, index: number) => ({
  ...stepControls,
  focus: focusedStep,
  isActive: props.modelValue === index,
  isCompleted: props.modelValue > index,
  isLastStep: props.steps.length - 1 === index,
  isNextStepDisabled: isNextStepDisabled(index),
  isPrevStepDisabled: index === 0,
  index,
  step,
  hasError: isStepHasError(step),
})

const { tp } = useTranslation()

const onArrowKeyPress = (direction: 'prev' | 'next') => {
  setFocus(direction)
}

const onValueChange = () => {
  focusedStep.value.stepIndex = props.modelValue
  focusedStep.value.trigger = true
}

const ariaAttributesComputed = computed(() => ({
  role: 'group',
  'aria-label': tp(props.ariaLabel),
  'aria-orientation': props.vertical ? 'vertical' as const : 'horizontal' as const,
}))

function getStepperButtonColor (index: number) {
  return isStepHasError(props.steps[index]) ? 'danger' : getColor(props.color)
}

const completeStep = (shouldCompleteStep?: boolean) => {
  const steps = { ...props.steps }
  if (shouldCompleteStep === true) {
    steps[props.modelValue].hasError = false
  }

  steps[props.modelValue].completed = shouldCompleteStep ?? true

  emit('update:steps', steps)
}

const setError = (shouldSetError?: boolean) => {
  const steps = { ...props.steps }
  steps[props.modelValue].hasError = shouldSetError ?? true
  steps[props.modelValue].completed = !shouldSetError

  emit('update:steps', steps)
}

defineExpose({
  modelValue,
  focusedStep,
  getIterableSlotData,
  stepControls,
  nextStep,
  prevStep,
  setStep,
  setFocus,
  completeStep,
  setError,
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
