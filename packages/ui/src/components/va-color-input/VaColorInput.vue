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
      v-model="valueComputed" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, shallowRef, computed } from 'vue'

import { useComponentPresetProp, useStateful, useStatefulProps, useStatefulEmits, useTranslation } from '../../composables'

import { VaColorIndicator } from '../va-color-indicator'
import { VaInput } from '../va-input'
import { extractComponentProps, filterComponentProps } from '../../utils/component-options'

const VaInputProps = extractComponentProps(VaInput)

export default defineComponent({
  name: 'VaColorInput',
  components: {
    VaInput,
    VaColorIndicator,
  },
  emits: [...useStatefulEmits],
  props: {
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
    ariaOpenColorPickerLabel: { type: String, default: '$t:openColorPicker' },
  },
  setup: (props, { emit }) => {
    const colorPicker = shallowRef<HTMLInputElement>()

    const { valueComputed } = useStateful(props, emit)

    const callPickerDialog = () => !props.disabled && colorPicker.value?.click()

    const tabIndexComputed = computed(() => props.disabled ? -1 : 0)

    return {
      ...useTranslation(),
      valueComputed,
      callPickerDialog,
      colorPicker,
      tabIndexComputed,
      vaInputProps: filterComponentProps(VaInputProps),
    }
  },
})
</script>

<style lang="scss">
.va-color-input {
  display: flex;
  align-items: center !important;

  .form-group {
    margin-bottom: 0;
  }

  &__input {
    margin-bottom: 0;
    min-width: 5.6rem;

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
  }
}
</style>
