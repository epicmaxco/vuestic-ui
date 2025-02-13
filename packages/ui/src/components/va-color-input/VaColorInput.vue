<template>
  <div class="va-color-input">
    <va-input
      v-bind="vaInputProps"
      v-model="valueComputed"
      class="va-color-input__input"
      :tabindex="tabIndexComputed"
    >
      <template #appendInner>
        <va-color-indicator
          class="va-color-input__dot"
          role="button"
          :aria-label="tp($props.ariaOpenColorPickerLabel)"
          :aria-disabled="$props.disabled"
          :tabindex="tabIndexComputed"
          :color="valueComputed"
          :indicator="$props.indicator"
          size="16px"
          @click="callPickerDialog"
          @keydown.space="callPickerDialog"
          @keydown.enter="callPickerDialog"
        />
      </template>
    </va-input>
    <input
      ref="colorPicker"
      type="color"
      class="va-color-input__hidden-input"
      aria-hidden="true"
      tabindex="-1"
      v-model="inputValue"
    />
  </div>
</template>

<script lang="ts">
import { PropType, shallowRef, computed } from 'vue'

import { useComponentPresetProp, useStateful, useStatefulProps, useStatefulEmits, useTranslation, useTranslationProp } from '../../composables'

import { VaColorIndicator } from '../va-color-indicator'
import { VaInput } from '../va-input'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'
import { throttle } from '../../utils/throttle'

const VaInputProps = extractComponentProps(VaInput)
</script>

<script lang="ts" setup>

defineOptions({
  name: 'VaColorInput',
})

const props = defineProps({
  ...VaInputProps,
  ...useStatefulProps,
  ...useComponentPresetProp,
  modelValue: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  indicator: {
    type: String as PropType<'dot' | 'square'>,
    default: 'dot',
    validator: (value: string) => ['dot', 'square'].includes(value),
  },
  ariaOpenColorPickerLabel: useTranslationProp('$t:openColorPicker'),
})

const emit = defineEmits([...useStatefulEmits])

const colorPicker = shallowRef<HTMLInputElement>()

const valueComputed = useStateful(props, emit)

const callPickerDialog = () => !props.disabled && colorPicker.value?.click()

const tabIndexComputed = computed(() => props.disabled ? -1 : 0)

const inputValue = computed({
  get: () => props.modelValue,
  set: throttle((value) => emit('update:modelValue', value), 500),
})

const vaInputProps = filterComponentProps(VaInputProps)

const { tp } = useTranslation()
</script>

<style lang="scss">
.va-color-input {
  display: flex;
  align-items: center !important;
  position: relative;

  .form-group {
    margin-bottom: 0;
  }

  &__input {
    margin-bottom: 0;
    min-width: 5.6rem;
    width: 100%;

    &__pointer {
      cursor: pointer;
    }
  }

  &__hidden-input {
    visibility: hidden;
    width: 0;
    height: 0;
    overflow: hidden;
    position: absolute;
    pointer-events: none;
    bottom: 0;
  }

  // Currently I could only determine the width of the color modal on Edge and Chrome
  @supports (-ms-ime-align:auto) {
    /* Edge specific */
    &__hidden-input {
      right: 14.7rem; // For Edge and Chrome the color picker modal size is 14.7rem
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    /* Chrome specific */
    &__hidden-input {
      right: 14.7rem; // For Edge and Chrome the color picker modal size is 14.7rem
    }
  }
}
</style>
