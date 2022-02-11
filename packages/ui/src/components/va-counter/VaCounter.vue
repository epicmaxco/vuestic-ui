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
  >
    <template v-if="$props.buttons" #prepend="slotScope">
      <div class="va-counter__prepend-wrapper" :style="{ marginRight: $props.margins }">
        <slot name="decreaseAction" v-bind="{ ...slotScope, decrease }">
          <va-button
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
      <div class="va-counter__append-wrapper" :style="{ marginLeft: $props.margins }">
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
        <slot name="content" v-bind="{ ...slotScope, value: $props.modelValue }" />
      </div>
    </template>

    <input
      v-if="!$slots.content"
      class="va-input__content__input"
      ref="input"
      type="number"
      v-bind="{ ...computedInputAttributes, ...inputListeners }"
      :value="$props.modelValue"
      @input="onManualInput($event.target.value)"
      @change="onManualChange($event.target.value)"
    >
  </VaInputWrapper>
</template>

<script lang="ts">
import { computed, defineComponent, InputHTMLAttributes, ref, PropType } from 'vue'
import { useFormProps } from '../../composables/useForm'
import { useEmitProxy } from '../../composables/useEmitProxy'
import { useFocus, useFocusEmits } from '../../composables/useFocus'
import { useSyncProp } from '../../composables/useSyncProp'
import { useColor } from '../../composables/useColor'
import VaInputWrapper from '../va-input/components/VaInputWrapper.vue'
import VaIcon from '../va-icon/VaIcon.vue'
import VaButton from '../va-button/VaButton.vue'
import { omit, pick } from 'lodash-es'

const { createEmits: createInputEmits, createListeners: createInputListeners } = useEmitProxy(
  ['change', 'keyup', 'keypress', 'keydown'],
)

const { createEmits: createFieldEmits, createListeners: createFieldListeners } = useEmitProxy([
  'click',
  'click-prepend',
  'click-append',
  'click-prepend-inner',
  'click-append-inner',
])

export default defineComponent({
  name: 'VaCounter',

  components: { VaInputWrapper, VaIcon, VaButton },

  props: {
    ...useFormProps,
    // input
    modelValue: { type: [String, Number], default: '' },
    manualInput: { type: Boolean, default: false },
    min: { type: Number, default: 1 },
    max: { type: Number, default: undefined },
    step: { type: Number, default: 1 },
    label: { type: String, default: '' },
    // hint
    messages: { type: [Array, String] as PropType<string[] | string>, default: () => [] },
    // style
    width: { type: String, default: '154px' },
    color: { type: String, default: 'primary' },
    outline: { type: Boolean, default: undefined },
    bordered: { type: Boolean, default: undefined },
    // icons & buttons
    increaseIcon: { type: String, default: 'add' },
    decreaseIcon: { type: String, default: 'remove' },
    buttons: { type: Boolean, default: false },
    margins: { type: [String, Number], default: '4px' },
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

    const { isFocused, onFocus, onBlur, focus, blur } = useFocus(input, emit)

    const [modelValueSync] = useSyncProp('modelValue', props, emit)

    const onManualInput = (counterValue: string) => {
      modelValueSync.value = counterValue
    }

    const getRoundDownWithStep = (value: number | string) => {
      return props.min + props.step * Math.floor((+value - props.min) / props.step)
    }

    const onManualChange = (counterValue: number | string) => {
      if (+counterValue < props.min) {
        modelValueSync.value = props.min
        return
      }

      if (props.max && (+counterValue > props.max)) {
        modelValueSync.value = getRoundDownWithStep(props.max)
        return
      }

      modelValueSync.value = getRoundDownWithStep(counterValue)
    }

    const isAvailableMin = computed(() => (
      +modelValueSync.value === props.min
    ))

    const isAvailableMax = computed(() => {
      if (!props.max) { return false }
      return +modelValueSync.value > (props.max - props.step)
    })

    const disabledDecreaseAction = computed(() => (
      isAvailableMin.value || props.readonly || props.disabled
    ))

    const disabledIncreaseAction = computed(() => (
      isAvailableMax.value || props.readonly || props.disabled
    ))

    const decrease = () => {
      if (disabledDecreaseAction.value) { return }
      onManualChange(+modelValueSync.value - props.step)
    }

    const increase = () => {
      if (disabledIncreaseAction.value) { return }
      onManualChange(+modelValueSync.value + props.step)
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
      width: props.width,
    }))

    return {
      input,
      isFocused,

      fieldListeners: createFieldListeners(emit),
      inputListeners: { ...createInputListeners(emit), onFocus, onBlur },
      computedInputAttributes,
      onManualInput,
      onManualChange,

      decrease,
      increase,

      decreaseIconProps,
      increaseIconProps,
      decreaseButtonProps,
      increaseButtonProps,

      colorComputed,
      computedClass,
      computedStyle,

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
      .va-button {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .va-button:not(.va-button--square) {
        width: unset;

        .va-button__content {
          padding-right: var(--va-counter-button-padding--inner);
          padding-left: var(--va-counter-button-padding--outer);
        }
      }
    }

    .va-counter__append-wrapper {
      .va-button {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .va-button:not(.va-button--square) {
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
      .va-button__content {
        padding: unset;
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
