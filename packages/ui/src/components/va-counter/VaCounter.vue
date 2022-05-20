<template>
  <VaInputWrapper
    class="va-counter"
    v-bind="{ ...fieldListeners, ...inputWrapperPropsComputed }"
    :class="classComputed"
    :style="styleComputed"
    :focused="isFocused"
    @click="focus()"
    @keydown.up.prevent="increaseCount()"
    @keydown.down.prevent="decreaseCount()"
  >
    <template v-if="$props.buttons" #prepend="slotScope">
      <div class="va-counter__prepend-wrapper"
        :style="{ marginRight: marginComputed }"
        @mousedown.prevent="focus()"
      >
        <slot name="decreaseAction" v-bind="{ ...slotScope, decreaseCount }">
          <va-button
            class="va-counter__button-decrease"
            v-bind="decreaseButtonProps"
            @click="decreaseCount()"
          />
        </slot>
      </div>
    </template>

    <template v-else #prependInner="slotScope">
      <div @mousedown.prevent="focus()">
        <slot name="decreaseAction" v-bind="{ ...slotScope, decreaseCount }">
          <va-icon
            class="va-counter__icon-decrease"
            v-bind="decreaseIconProps"
          />
        </slot>
      </div>
    </template>

    <template v-if="$props.buttons"  #append="slotScope">
      <div class="va-counter__append-wrapper"
        :style="{ marginLeft: marginComputed }"
        @mousedown.prevent="focus()"
      >
        <slot name="increaseAction" v-bind="{ ...slotScope, increaseCount }">
          <va-button
            class="va-counter__button-increase"
            v-bind="increaseButtonProps"
            @click="increaseCount()"
          />
        </slot>
      </div>
    </template>

    <template v-else #appendInner="slotScope">
      <div @mousedown.prevent="focus()">
        <slot name="increaseAction" v-bind="{ ...slotScope, increaseCount }">
          <va-icon
            class="va-counter__icon-increase"
            v-bind="increaseIconProps"
          />
        </slot>
      </div>
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
      inputmode="decimal"
      v-bind="{ ...inputAttributesComputed, ...inputListeners }"
      :value="valueComputed"
      @input="setCountInput"
      @change="setCountChange"
    >
  </VaInputWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes, ref, PropType, ComputedRef } from 'vue'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { useFormProps } from '../../composables/useForm'
import { useEmitProxy } from '../../composables/useEmitProxy'
import { useFocus, useFocusEmits } from '../../composables/useFocus'
import { useStatefulProps, useStateful } from '../../composables/useStateful'
import { useColor } from '../../composables/useColor'
import { safeCSSLength } from '../../utils/css-utils'
import VaInputWrapper from '../va-input/components/VaInputWrapper.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import VaButton from '../va-button/VaButton.vue'

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
    flat: { type: Boolean as PropType<boolean>, default: true },
    rounded: { type: Boolean as PropType<boolean>, default: false },
    margins: { type: [String, Number] as PropType<string | number>, default: '4px' },
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
      // will be useful when we resolve problem with 'withConfigTransport'
      focus,
      blur,
    } = useFocus(input, emit)

    const { valueComputed } = useStateful(props, emit)

    const setCountInput = ({ target }: Event) => {
      valueComputed.value = Number((target as HTMLInputElement | null)?.value)
    }

    const setCountChange = ({ target } : Event) => {
      calculateCounterValue(Number((target as HTMLInputElement | null)?.value))
    }

    const getRoundDownWithStep = (value: number) => {
      if (!props.min || !props.step) { return value }

      // If the user enters a value manually, then we must round it to the nearest valid value,
      // taking into account the initial value (`props.min`) and the step size (`props.step`)
      return props.min + props.step * Math.floor((value - props.min) / props.step)
    }

    const calculateCounterValue = (counterValue: number) => {
      if (props.min && counterValue < props.min) {
        valueComputed.value = props.min
        return
      }

      if (props.max && (counterValue > props.max)) {
        // since the `props.step` may not be a multiple of `(props.max - props.min)`,
        // we must round the result taking into account the allowable value
        valueComputed.value = getRoundDownWithStep(props.max)
        return
      }

      valueComputed.value = getRoundDownWithStep(counterValue)
    }

    const isMinReached = computed(() => {
      if (!props.min) { return false }
      return Number(valueComputed.value) <= props.min
    })

    const isMaxReached = computed(() => {
      if (!props.max) { return false }

      return props.step
        ? Number(valueComputed.value) > (props.max - props.step)
        : Number(valueComputed.value) >= props.max
    })

    const isDecreaseActionDisabled = computed(() => (
      isMinReached.value || props.readonly || props.disabled
    ))

    const isIncreaseActionDisabled = computed(() => (
      isMaxReached.value || props.readonly || props.disabled
    ))

    const decreaseCount = () => {
      if (isDecreaseActionDisabled.value) { return }
      calculateCounterValue(Number(valueComputed.value) - props.step)
    }

    const increaseCount = () => {
      if (isIncreaseActionDisabled.value) { return }
      calculateCounterValue(Number(valueComputed.value) + props.step)
    }

    const { colorComputed } = useColor(props)

    const decreaseIconProps = computed(() => ({
      class: { 'va-counter__icon--inactive': isDecreaseActionDisabled.value },
      color: colorComputed.value,
      name: props.decreaseIcon,
      ...(!isDecreaseActionDisabled.value && { onClick: decreaseCount }),
    }))

    const increaseIconProps = computed(() => ({
      class: { 'va-counter__icon--inactive': isIncreaseActionDisabled.value },
      color: colorComputed.value,
      name: props.increaseIcon,
      ...(!isIncreaseActionDisabled.value && { onClick: increaseCount }),
    }))

    const isSquareCorners = computed(() => (
      (typeof props.margins === 'string' ? parseFloat(props.margins) : props.margins) === 0
    ))

    const buttonProps = computed(() => ({
      ...pick(props, ['rounded', 'color', 'textColor']),
      flat: props.flat && !props.outline,
      outline: props.flat && props.outline,
    }))

    const decreaseButtonProps = computed(() => ({
      ...buttonProps.value,
      icon: props.decreaseIcon,
      disabled: isDecreaseActionDisabled.value,
    }))

    const increaseButtonProps = computed(() => ({
      ...buttonProps.value,
      icon: props.increaseIcon,
      disabled: isIncreaseActionDisabled.value,
    }))

    const inputAttributesComputed = computed(() => ({
      ariaLabel: props.label,
      ...omit(attrs, ['class', 'style']),
      ...pick(props, ['disabled', 'min', 'max', 'step']),
      readonly: props.readonly || !props.manualInput,
    }) as InputHTMLAttributes)

    const inputWrapperPropsComputed = computed(() => ({
      ...pick(props, ['color', 'readonly', 'disabled', 'messages', 'label', 'bordered', 'outline']),
    }))

    const classComputed = computed(() => ([
      attrs.class,
      { 'va-counter--input-square': isSquareCorners.value },
    ]))

    const styleComputed: ComputedRef<Partial<CSSStyleDeclaration>> = computed(() => ({
      width: safeCSSLength(props.width),
      ...((attrs.style as Partial<CSSStyleDeclaration>) || {}),
    }))

    const marginComputed = computed(() => safeCSSLength(props.margins))

    return {
      input,
      valueComputed,
      isFocused,

      fieldListeners: createFieldListeners(emit),
      inputListeners: createInputListeners(emit),
      inputAttributesComputed,
      inputWrapperPropsComputed,
      setCountInput,
      setCountChange,

      decreaseCount,
      increaseCount,

      decreaseIconProps,
      increaseIconProps,
      decreaseButtonProps,
      increaseButtonProps,

      colorComputed,
      classComputed,
      styleComputed,
      marginComputed,

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
    &[type=number] {
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
