<template>
  <VaMessageListWrapper
    class="va-switch"
    :class="computedClass"
    :style="styleComputed"
    :disabled="$props.disabled"
    :success="$props.success"
    :messages="$props.messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="$props.errorCount"
  >
    <div
      ref="container"
      class="va-switch__container"
      tabindex="-1"
      @blur="onBlur"
      @click="toggleSelection"
    >
      <div
        class="va-switch__inner"
      >
        <input
          ref="input"
          type="checkbox"
          class="va-switch__input"
          role="switch"
          v-bind="inputAttributesComputed"
          @focus="onFocus"
          @blur="onBlur"
          @keypress.enter="onEnterKeyPress"
        >
        <div
          class="va-switch__track"
          aria-hidden="true"
          :style="trackStyle"
        >
          <div
            v-if="computedInnerLabel || $slots.innerLabel"
            class="va-switch__track-label"
            :style="trackLabelStyle"
            >
            <slot name="innerLabel">
              {{ computedInnerLabel }}
            </slot>
          </div>
          <div class="va-switch__checker-wrapper">
            <div class="va-switch__checker">
              <slot name="checker" v-bind="{ value: isChecked }">
                <div class="va-switch__checker-circle">
                  <va-progress-circle
                    v-if="$props.loading"
                    indeterminate
                    :size="progressCircleSize"
                    :color="trackStyle.backgroundColor"
                  />
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="computedLabel || $slots.default"
        ref="label"
        class="va-switch__label"
        :style="labelStyle"
        :id="ariaLabelIdComputed"
        @blur="onBlur"
        @click="toggleSelection"
        @keydown.enter.stop="toggleSelection"
      >
        <slot>
          {{ computedLabel }}
        </slot>
      </div>
    </div>
  </VaMessageListWrapper>
</template>

<script lang="ts" setup>
import { PropType, computed, ref, shallowRef, useSlots } from 'vue'

import {
  useComponentPresetProp,
  useSelectable, useSelectableProps, useSelectableEmits,
  useColors, useElementTextColor,
  useBem, useTranslationProp,
  useComponentUuid,
  useElementFocusedKeyboard,
  ColorName,
} from '../../composables'
import { StringWithAutocomplete } from '../../utils/types/prop-type'

import { VaProgressCircle } from '../va-progress-circle'
import { VaMessageListWrapper } from '../va-message-list'
import { pick } from '../../utils/pick'

defineOptions({
  name: 'VaSwitch',
})

const props = defineProps({
  ...useSelectableProps,
  ...useComponentPresetProp,
  id: { type: String, default: '' },
  name: { type: String, default: '' },
  modelValue: {
    type: [Number, Boolean, Array, String, Object] as PropType<boolean | unknown[] | string | number | Record<string, unknown> | null>,
    default: false,
  },
  trueLabel: { type: String, default: null },
  falseLabel: { type: String, default: null },
  trueInnerLabel: { type: String, default: null },
  falseInnerLabel: { type: String, default: null },
  ariaLabel: useTranslationProp('$t:switch'),
  color: { type: String as PropType<StringWithAutocomplete<ColorName>>, default: 'primary' },
  offColor: { type: String, default: 'background-element' },
  size: {
    type: String as PropType<'medium' | 'small' | 'large'>,
    default: 'medium',
    validator: (value: string) => ['medium', 'small', 'large'].includes(value),
  },
})

const emit = defineEmits([
  ...useSelectableEmits,
  'focus', 'blur', 'update:modelValue',
])

const elements = {
  container: shallowRef<HTMLElement>(),
  input: shallowRef<HTMLElement>(),
  label: shallowRef<HTMLElement>(),
}

const { getColor } = useColors()
const input = elements.input
const hasKeyboardFocus = useElementFocusedKeyboard(input)
const {
  isChecked,
  computedError,
  isIndeterminate,
  computedErrorMessages,
  validationAriaAttributes,
  toggleSelection,
  onBlur,
  onFocus,
  reset,
  focus,
  isDirty,
  isTouched,
  isLoading,
  isError,
} = useSelectable(props, emit, elements)

const computedBackground = computed(() => getColor(isChecked.value ? props.color : props.offColor))
const textColorComputed = useElementTextColor(computedBackground)

const computedInnerLabel = computed(() => {
  if (props.trueInnerLabel && isChecked.value) {
    return props.trueInnerLabel
  }
  if (props.falseInnerLabel && !isChecked.value) {
    return props.falseInnerLabel
  }
  return ''
})

const computedLabel = computed(() => {
  if (props.trueLabel && isChecked.value) {
    return props.trueLabel
  }
  if (props.falseLabel && !isChecked.value) {
    return props.falseLabel
  }
  return props.label
})

const computedClass = useBem('va-switch', () => ({
  ...pick(props, ['readonly', 'disabled', 'leftLabel']),
  checked: isChecked.value,
  indeterminate: isIndeterminate.value,
  small: props.size === 'small',
  large: props.size === 'large',
  error: computedError.value,
  keyboardFocus: hasKeyboardFocus.value,
}))

const styleComputed = computed(() => ({
  lineHeight: computedErrorMessages.value.length ? 1 : 0,
}))

const progressCircleSize = computed(() => {
  const size = { small: '15px', medium: '20px', large: '25px' }

  return size[props.size]
})

const trackStyle = computed(() => ({
  borderColor: computedError.value ? getColor('danger') : '',
  backgroundColor: computedBackground.value,
}))

const labelStyle = computed(() => ({
  color: computedError.value ? getColor('danger') : '',
}))

const trackLabelStyle = computed(() => ({
  color: textColorComputed.value,
  'text-align': isChecked.value ? 'left' as const : 'right' as const,
}))

const slots = useSlots()

const componentId = useComponentUuid()
const ariaLabelIdComputed = computed(() => `aria-label-id-${componentId}`)
const inputAttributesComputed = computed(() => ({
  id: props.id || undefined,
  name: props.name || undefined,
  disabled: props.disabled,
  readonly: props.readonly,
  'aria-disabled': props.disabled,
  'aria-readonly': props.readonly,
  'aria-checked': !!props.modelValue,
  'aria-label': !slots.default ? props.ariaLabel : undefined,
  'aria-labelledby': computedLabel.value || slots.default ? ariaLabelIdComputed.value : undefined,
  tabindex: props.disabled ? -1 : 0,
  checked: isChecked.value,
  ...validationAriaAttributes.value,
}))

const onEnterKeyPress = () => {
  elements.input.value?.click()
}

defineExpose({
  focus,
  reset,
  isDirty,
  isTouched,
  isLoading,
  isError,
})
</script>

<style lang="scss">
@import "variables";
@import "../../styles/resources";

.va-switch {
  line-height: 0;

  @at-root {
    .va-switch__container {
      display: inline-flex;
      align-items: center;
      width: 100%;
    }
  }

  display: var(--va-switch-display);

  &:focus {
    outline: none;
  }

  &__inner {
    cursor: var(--va-switch-inner-cursor);
    display: inline-block;
    position: relative;
    height: var(--va-switch-inner-height);
    width: var(--va-switch-inner-width);
    min-width: var(--va-switch-inner-min-width);
    border-radius: var(--va-switch-inner-border-radius);

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 0.3rem rgba(52, 144, 220, 0.5);
    }
  }

  &--small {
    .va-switch {
      &__inner {
        height: var(--va-switch-sm-inner-height);
        width: var(--va-switch-sm-inner-width);
        min-width: var(--va-switch-sm-inner-min-width);
      }

      &__checker-circle {
        height: 1.1rem;
        width: 1.1rem;
      }
    }
  }

  &--large {
    .va-switch {
      &__inner {
        height: var(--va-switch-lg-inner-height);
        width: var(--va-switch-lg-inner-width);
        min-width: var(--va-switch-lg-inner-min-width);
      }

      &__checker-circle {
        height: 1.8rem;
        width: 1.8rem;
      }
    }
  }

  &--disabled {
    @include va-disabled;
  }

  &--readonly {
    @include va-readonly;

    .va-switch__label {
      cursor: initial;
      pointer-events: auto;
    }
  }

  &--left-label {
    .va-switch__container {
      flex-direction: row-reverse;
      justify-content: start;
    }

    .va-switch__label {
      padding: 0 var(--va-switch-label-left-padding) 0 0;
    }
  }

  &--indeterminate {
    .va-switch {
      &__checker {
        margin: auto 0;
        transform: translateX(-50%);
      }

      &__checker-wrapper {
        transform: translateX(50%);
      }
    }
  }

  &--checked {
    .va-switch {
      &__checker {
        transform: translateX(calc(-100% - 0.3rem));
      }

      &__checker-circle {
        background-color: var(--va-switch-checker-active-background-color);
      }

      &__checker-wrapper {
        transform: translateX(100%);
      }
    }
  }

  &--error {
    .va-switch {
      &__track {
        border: 0.1rem solid;
      }
    }
  }

  &__label {
    cursor: pointer;
    text-align: left;
    padding: 0 0 0 var(--va-switch-label-right-padding);
  }

  #{&}__track {
    display: flex;
    overflow: hidden;
    border-radius: var(--va-switch-track-border-radius);
    height: var(--va-switch-track-height);
    width: var(--va-switch-track-width);
    background: var(--va-switch-track-background);
    box-shadow: var(--va-switch-track-box-shadow);
    transition: var(--va-switch-track-transition);

    @at-root {
      .va-switch--keyboard-focus#{&} {
        @include focus-outline('inherit');
      }

      .va-switch--small#{&} {
        border-radius: 0.75rem;
      }

      .va-switch--large#{&} {
        border-radius: 1.25rem;
      }
    }
  }

  #{&}__track-label {
    color: $white;
    margin: auto 0.5rem auto 2rem;
    user-select: none;
    width: 100%;

    @at-root {
      .va-switch--checked#{&} {
        margin: auto 2rem auto 0.5rem;
      }

      .va-switch--small#{&} {
        margin: auto 0.5rem auto 1.55rem;

        @at-root {
          .va-switch--checked#{&} {
            margin: auto 1.55rem auto 0.5rem;
          }
        }
      }

      .va-switch--large#{&} {
        margin: auto 0.5rem auto 2.3rem;

        @at-root {
          .va-switch--checked#{&} {
            margin: auto 2.3rem auto 0.5rem;
          }
        }
      }
    }
  }

  &__checker {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: var(--va-switch-checker-margin);
    transform: var(--va-switch-checker-transform);
    box-shadow: var(--va-switch-checker-box-shadow);
    transition: var(--va-switch-checker-transition);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__checker-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--va-switch-checker-height);
    width: var(--va-switch-checker-width);
    background-color: var(--va-switch-checker-background-color);
    border-radius: var(--va-switch-checker-border-radius);
  }

  &__checker-wrapper {
    position: absolute;
    margin: auto;
    transform: var(--va-switch-checker-wrapper-transform);
    top: var(--va-switch-checker-wrapper-top);
    left: var(--va-switch-checker-wrapper-left);
    bottom: var(--va-switch-checker-wrapper-bottom);
    right: var(--va-switch-checker-wrapper-right);
    width: var(--va-switch-checker-wrapper-width);
    height: var(--va-switch-checker-wrapper-height);
    transition: var(--va-switch-checker-wrapper-transition);
    pointer-events: var(--va-switch-checker-wrapper-pointer-events);
  }

  &__input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: inherit;
  }
}
</style>
