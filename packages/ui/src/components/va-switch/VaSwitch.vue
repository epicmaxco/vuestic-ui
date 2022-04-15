<template>
  <VaMessageListWrapper
    class="va-switch"
    :class="computedClass"
    :disabled="$props.disabled"
    :success="$props.success"
    :messages="$props.messages"
    :error="computedError"
    :error-messages="computedErrorMessages"
    :error-count="$props.errorCount"
  >
    <div
      class="va-switch__container"
      tabindex="-1"
      @blur="onBlur"
      ref="container"
    >
      <div
        class="va-switch__inner"
        @click="toggleSelection"
      >
        <input
          class="va-switch__input"
          ref="input"
          type="checkbox"
          role="switch"
          :aria-checked="isChecked"
          :id="String($props.id)"
          :name="String($props.name)"
          readonly
          :disabled="$props.disabled"
          v-on="keyboardFocusListeners"
          @focus="onFocus"
          @blur="onBlur"
          @keypress.prevent="toggleSelection"
        >
        <div
          class="va-switch__track"
          :style="trackStyle"
        >
          <div class="va-switch__track-label">
            <slot name="innerLabel">
              {{ computedInnerLabel }}
            </slot>
          </div>
          <div class="va-switch__checker-wrapper">
            <span class="va-switch__checker">
              <va-progress-circle
                v-if="$props.loading"
                indeterminate
                :size="progressCircleSize"
                :color="trackStyle.backgroundColor"
              />
            </span>
          </div>
        </div>
      </div>
      <div
        class="va-switch__label"
        ref="label"
        @blur="onBlur"
        :style="labelStyle"
        @click="toggleSelection()"
      >
        <slot>
          {{ computedLabel }}
        </slot>
      </div>
    </div>
  </VaMessageListWrapper>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'

import { VaProgressCircle } from '../va-progress-circle'
import { VaMessageListWrapper } from '../va-input'
import useKeyboardOnlyFocus from '../../composables/useKeyboardOnlyFocus'
import { useSelectable, useSelectableProps, useSelectableEmits } from '../../composables/useSelectable'
import { useColors } from '../../composables/useColor'

export default defineComponent({
  name: 'VaSwitch',
  components: { VaProgressCircle, VaMessageListWrapper },
  emits: [
    ...useSelectableEmits,
    'focus', 'blur', 'update:modelValue',
  ],
  props: {
    ...useSelectableProps,
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    modelValue: {
      type: [Boolean, Array, String, Object] as PropType<boolean | unknown[] | string | Record<string, unknown>>,
      default: false,
    },

    trueLabel: { type: String, default: null },
    falseLabel: { type: String, default: null },
    trueInnerLabel: { type: String, default: null },
    falseInnerLabel: { type: String, default: null },
    color: { type: String, default: 'primary' },
    size: {
      type: String as PropType<'medium' | 'small' | 'large'>,
      default: 'medium',
      validator: (modelValue: string) => ['medium', 'small', 'large'].includes(modelValue),
    },

  },
  setup (props, { emit }) {
    const elements = {
      container: ref(null),
      input: ref(null),
      label: ref(null),
    }

    const { getColor } = useColors()
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()
    const { isChecked, computedError, isIndeterminate, ...selectable } = useSelectable(props, emit, elements)

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

    const computedClass = computed(() => ({
      'va-switch--checked': isChecked.value,
      'va-switch--indeterminate': isIndeterminate.value,
      'va-switch--small': props.size === 'small',
      'va-switch--large': props.size === 'large',
      'va-switch--disabled': props.disabled,
      'va-switch--left-label': props.leftLabel,
      'va-switch--error': computedError.value,
      'va-switch--on-keyboard-focus': hasKeyboardFocus.value,
    }))

    const progressCircleSize = computed(() => {
      const size = { small: '15px', medium: '20px', large: '25px' }

      return size[props.size]
    })

    const trackStyle = computed(() => ({
      borderColor: props.error ? getColor('danger') : '',
      backgroundColor: isChecked.value ? getColor(props.color) : getColor('gray'),
    }))

    const labelStyle = computed(() => ({
      color: props.error ? getColor('danger') : '',
    }))

    return {
      ...selectable,
      isChecked,
      computedError,
      isIndeterminate,
      keyboardFocusListeners,
      computedInnerLabel,
      computedLabel,
      computedClass,
      progressCircleSize,
      trackStyle,
      labelStyle,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-switch {
  @at-root {
    .va-switch__container {
      display: var(--va-switch-container-display);
      align-items: var(--va-switch-container-align-items);
    }
  }

  display: var(--va-switch-display);

  &:focus {
    outline: none;
  }

  &__inner {
    cursor: var(--va-switch-inner-cursor);
    display: var(--va-switch-inner-display);
    position: var(--va-switch-inner-position);
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

      &__checker {
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

      &__checker {
        height: 1.8rem;
        width: 1.8rem;
      }
    }
  }

  &--disabled {
    @include va-disabled;
  }

  &--left-label {
    .va-switch__container {
      flex-direction: row-reverse;
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
        margin: auto -0.3rem;
        transform: translateX(-100%);
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
    display: var(--va-switch-track-display);
    overflow: var(--va-switch-track-overflow);
    border-radius: var(--va-switch-track-border-radius);
    height: var(--va-switch-track-height);
    width: var(--va-switch-track-width);
    background: var(--va-switch-track-background);
    box-shadow: var(--va-switch-track-box-shadow);
    transition: var(--va-switch-track-transition);

    @at-root {
      .va-switch--on-keyboard-focus#{&} {
        transition: all, 0.6s, ease-in;
        box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.3);
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
    position: var(--va-switch-checker-position);
    top: var(--va-switch-checker-top);
    bottom: var(--va-switch-checker-bottom);
    margin: var(--va-switch-checker-margin);
    transform: var(--va-switch-checker-transform);
    height: var(--va-switch-checker-height);
    width: var(--va-switch-checker-width);
    background-color: var(--va-switch-checker-background-color);
    border-radius: var(--va-switch-checker-border-radius);
    box-shadow: var(--va-switch-checker-box-shadow);
    transition: var(--va-switch-checker-transition);
    display: var(--va-switch-checker-display);
    justify-content: var(--va-switch-checker-justify-content);
    align-items: var(--va-switch-checker-align-items);
  }

  &__checker-wrapper {
    position: var(--va-switch-checker-wrapper-position);
    margin: var(--va-switch-checker-wrapper-margin);
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
    opacity: 0;
    height: 0;
    width: 0;
  }
}
</style>
