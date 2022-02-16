<template>
  <VaInputWrapper
    class="va-counter"
    v-bind="fieldListeners"
    :class="[$attrs.class, computedClass]"
    :style="{ ...$attrs.style, ...computedStyle }"
    :color="$props.color"
    :readonly="$props.readonly"
    :disabled="$props.disabled"
    :messages="$props.messages"
    :label="$props.label"
    :bordered="$props.bordered"
    :outline="$props.outline"
    :focused="isFocused"
    @mousedown.prevent="focus()"
    @keydown.up.prevent="increase()"
    @keydown.down.prevent="decrease()"
  >
    <template v-if="$props.buttons" #prepend="slotScope">
      <div class="va-counter__prepend-wrapper"
        :style="{ marginRight: computedMargins }"
      >
        <slot name="decreaseAction" v-bind="{ ...slotScope, decrease }">
          <va-button
            class="va-counter__button-decrease"
            v-bind="decreaseButtonProps"
            :icon="$props.decreaseIcon"
            @click="decrease()"
          />
        </slot>
      </div>
    </template>

    <template v-else #prependInner="slotScope">
      <slot name="decreaseAction" v-bind="{ ...slotScope, decrease }">
        <va-icon
          class="va-counter__icon-decrease"
          v-bind="decreaseIconProps"
        />
      </slot>
    </template>

    <template v-if="$props.buttons"  #append="slotScope">
      <div class="va-counter__append-wrapper"
        :style="{ marginLeft: computedMargins }"
      >
        <slot name="increaseAction" v-bind="{ ...slotScope, increase }">
          <va-button
            class="va-counter__button-increase"
            v-bind="increaseButtonProps"
            :icon="$props.increaseIcon"
            @click="increase()"
          />
        </slot>
      </div>
    </template>

    <template v-else #appendInner="slotScope">
      <slot name="increaseAction" v-bind="{ ...slotScope, increase }">
        <va-icon
          class="va-counter__icon-increase"
          v-bind="increaseIconProps"
        />
      </slot>
    </template>

    <template v-if="$slots.content" #content="slotScope">
      <div ref="input" tabindex="0">
        <slot name="content" v-bind="{ ...slotScope, value: Number(valueComputed) }" />
      </div>
    </template>

    <input
      v-if="!$slots.content"
      class="va-input__content__input"
      ref="input"
      type="number"
      v-bind="{ ...computedInputAttributes, ...inputListeners }"
      :value="valueComputed"
      @input="handleManualInput"
      @change="handleManualChange"
    >
  </VaInputWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes, ref, PropType } from 'vue'
import { useFormProps } from '../../composables/useForm'
import { useEmitProxy } from '../../composables/useEmitProxy'
import { useFocus, useFocusEmits } from '../../composables/useFocus'
import { useStatefulProps, useStateful } from '../../composables/useStateful'
import { useColor } from '../../composables/useColor'
import VaInputWrapper from '../va-input/components/VaInputWrapper.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import VaButton from '../va-button/VaButton.vue'
import { omit, pick } from 'lodash-es'

const { createEmits: createInputEmits, createListeners: createInputListeners } = useEmitProxy(
  ['change'],
)

const { createEmits: createFieldEmits, createListeners: createFieldListeners } = useEmitProxy([
  { listen: 'click-prepend', emit: 'click:decrease-button' },
  { listen: 'click-append', emit: 'click:increase-button' },
  { listen: 'click-prepend-inner', emit: 'click:decrease-icon' },
  { listen: 'click-append-inner', emit: 'click:increase-icon' },
])

export default defineComponent({
  name: 'VaCounter',

  components: { VaInputWrapper, VaIcon, VaButton },

  props: {
    ...useFormProps,
    ...useStatefulProps,
    // input
    modelValue: { type: [String, Number] as PropType<string | number>, default: 0 },
    manualInput: { type: Boolean as PropType<boolean>, default: false },
    stateful: { type: Boolean as PropType<boolean>, default: false },
    min: { type: Number as PropType<number>, default: undefined },
    max: { type: Number as PropType<number>, default: undefined },
    step: { type: Number as PropType<number>, default: 1 },
    label: { type: String as PropType<string>, default: '' },
    // hint
    messages: { type: [Array, String] as PropType<string[] | string>, default: () => [] },
    // style
    width: { type: [String, Number] as PropType<string | number>, default: '160px' },
    color: { type: String as PropType<string>, default: 'primary' },
    outline: { type: Boolean as PropType<boolean> },
    bordered: { type: Boolean as PropType<boolean> },
    // icons & buttons
    increaseIcon: { type: String as PropType<string>, default: 'add' },
    decreaseIcon: { type: String as PropType<string>, default: 'remove' },
    buttons: { type: Boolean as PropType<boolean>, default: false },
    margins: { type: [String, Number] as PropType<string | number>, default: '4px' },
    flat: { type: Boolean as PropType<boolean>, default: true },
    rounded: { type: Boolean as PropType<boolean>, default: false },
    textColor: { type: String as PropType<string | undefined>, default: undefined },
  },

  emits: [
    'update:modelValue',
    ...createInputEmits(),
    ...createFieldEmits(),
    ...useFocusEmits,
  ],

  inheritAttrs: false,

  setup (props, { emit, attrs }) {
    const input = ref<HTMLInputElement | HTMLDivElement | undefined>()

    const {
      isFocused,
      // will be used when we resolve problem with 'withConfigTransport'
      focus,
      blur,
    } = useFocus(input, emit)

    const { valueComputed } = useStateful(props, emit)

    const handleManualInput = (event: Event) => {
      valueComputed.value = +(event.target as HTMLInputElement)?.value
    }

    const handleManualChange = (event: Event) => {
      const changed = +(event.target as HTMLInputElement)?.value
      calculateCounterValue(changed)
    }

    const getRoundDownWithStep = (value: number) => {
      if (!props.min) { return value }
      return props.min + props.step * Math.floor((value - props.min) / props.step)
    }

    const calculateCounterValue = (counterValue: number) => {
      if (props.min && counterValue < props.min) {
        valueComputed.value = props.min
        return
      }

      if (props.max && (counterValue > props.max)) {
        valueComputed.value = getRoundDownWithStep(props.max)
        return
      }

      valueComputed.value = getRoundDownWithStep(counterValue)
    }

    const isMinReached = computed(() => {
      if (!props.min) { return false }
      return +valueComputed.value === props.min
    })

    const isMaxReached = computed(() => {
      if (!props.max) { return false }
      return +valueComputed.value > (props.max - props.step)
    })

    const disabledDecreaseAction = computed(() => (
      isMinReached.value || props.readonly || props.disabled
    ))

    const disabledIncreaseAction = computed(() => (
      isMaxReached.value || props.readonly || props.disabled
    ))

    const decrease = () => {
      if (disabledDecreaseAction.value) { return }
      calculateCounterValue(+valueComputed.value - props.step)
    }

    const increase = () => {
      if (disabledIncreaseAction.value) { return }
      calculateCounterValue(+valueComputed.value + props.step)
    }

    const { colorComputed } = useColor(props)

    const decreaseIconProps = computed(() => ({
      class: { 'va-counter__icon--inactive': disabledDecreaseAction.value },
      color: colorComputed.value,
      name: props.decreaseIcon,
      onClick: !disabledDecreaseAction.value ? decrease : null,
    }))

    const increaseIconProps = computed(() => ({
      class: { 'va-counter__icon--inactive': disabledIncreaseAction.value },
      color: colorComputed.value,
      name: props.increaseIcon,
      onClick: !disabledIncreaseAction.value ? increase : null,
    }))

    const squareCorners = computed(() => (
      (typeof props.margins === 'string' ? parseFloat(props.margins) : props.margins) === 0
    ))

    const decreaseButtonProps = computed(() => ({
      ...pick(props, ['outline', 'rounded', 'color', 'textColor']),
      flat: props.flat && !props.outline,
      outline: props.flat && props.outline,
      disabled: disabledDecreaseAction.value,
    }))

    const increaseButtonProps = computed(() => ({
      ...pick(props, ['rounded', 'color', 'textColor']),
      flat: props.flat && !props.outline,
      outline: props.flat && props.outline,
      disabled: disabledIncreaseAction.value,
    }))

    const computedInputAttributes = computed(() => ({
      ariaLabel: props.label,
      ...omit(attrs, ['class', 'style']),
      ...pick(props, ['disabled', 'min', 'max', 'step']),
      readonly: props.readonly || !props.manualInput,
    }) as InputHTMLAttributes)

    const computedClass = computed(() => ({
      'va-counter--input-square': squareCorners.value,
    }))

    const computedStyle = computed(() => ({
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    }))

    const computedMargins = computed(() => (
      typeof props.margins === 'number' ? `${props.margins}px` : props.margins
    ))

    return {
      input,
      valueComputed,
      isFocused,

      fieldListeners: createFieldListeners(emit),
      inputListeners: createInputListeners(emit),
      computedInputAttributes,
      handleManualInput,
      handleManualChange,

      decrease,
      increase,

      decreaseIconProps,
      increaseIconProps,
      decreaseButtonProps,
      increaseButtonProps,

      colorComputed,
      computedClass,
      computedStyle,
      computedMargins,

      // while we have problem with 'withConfigTransport'
      // focus,
      // blur,
    }
  },

  // we will use this while we have problem with 'withConfigTransport'
  methods: {
    focus () { this.input?.focus() },
    blur () { this.input?.blur() },
  },
})
</script>

<style lang="scss">
@import "variables";

.va-counter {
  &.va-counter--input-square {
    .va-input__container {
      border-radius: 0;
      border-left: none;
      border-right: none;
    }

    .va-counter__prepend-wrapper {
      .va-counter__button-decrease {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .va-counter__button-decrease:not(.va-button--square) {
        width: unset;

        .va-button__content {
          padding-right: var(--va-counter-button-padding--inner);
          padding-left: var(--va-counter-button-padding--outer);
        }
      }
    }

    .va-counter__append-wrapper {
      .va-counter__button-increase {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .va-counter__button-increase:not(.va-button--square) {
        width: unset;

        .va-button__content {
          padding-left: var(--va-counter-button-padding--inner);
          padding-right: var(--va-counter-button-padding--outer);
        }
      }
    }
  }

  &:not(.va-counter--input-square) {
    .va-counter__prepend-wrapper,
    .va-counter__append-wrapper {
      .va-counter__button-decrease,
      .va-counter__button-increase {
        .va-button__content {
          padding: unset;
        }
      }
    }
  }

  .va-input__content__input {
    text-align: center;

    // Chrome, Safari, Edge, Opera
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    // Firefox
    [type=number] {
      -moz-appearance: textfield;
    }
  }

  .va-counter__icon--inactive {
    cursor: inherit;
    user-select: none;
    opacity: 0.4;
  }
}
</style>
